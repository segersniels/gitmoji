/* eslint-disable @typescript-eslint/camelcase */
import { Configuration, OpenAIApi } from 'openai';
import Gitmoji from 'types/Gitmoji';
import prompts from 'prompts';
import { encoding_for_model } from '@dqbd/tiktoken';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const FILES_TO_IGNORE = [
  'package-lock.json',
  'yarn.lock',
  'npm-debug.log',
  'yarn-debug.log',
  'yarn-error.log',
  '.pnpm-debug.log',
  'Cargo.lock',
  'Gemfile.lock',
  'mix.lock',
  'Pipfile.lock',
  'composer.lock',
  'glide.lock',
];

/**
 * Removes lines from the diff that don't start with a special character
 */
function removeExcessiveLinesFromChunk(diff: string) {
  return diff
    .split('\n')
    .filter(line => /^\W/.test(line))
    .join('\n');
}

/**
 * Prepare a diff for use in the prompt by removing stuff like
 * the lockfile changes and removing some of the whitespace.
 */
function prepareDiff(diff: string, minify = false) {
  if (!minify) {
    return diff;
  }

  const chunks = Array.from(
    diff.matchAll(/diff --git[\s\S]*?(?=diff --git|$)/g),
    match => match[0],
  ).map(chunk => chunk.replace(/ {2,}/g, ''));

  return chunks
    .filter(chunk => {
      const firstLine = chunk.split('\n')[0];

      for (const file of FILES_TO_IGNORE) {
        if (firstLine.includes(file)) {
          return false;
        }
      }

      return true;
    })
    .map(removeExcessiveLinesFromChunk)
    .join('\n');
}

function generatePrompt(
  diff: string,
  gitmojis: Gitmoji[],
  context?: string,
  minify = false,
) {
  const list = gitmojis.map(
    gitmoji => `${gitmoji.code} - ${gitmoji.description}`,
  );

  return `
    Refer to the provided git diff or code snippet and provide a suitable commit message.

    When reviewing the diff or code, focus on identifying the main purpose of the changes.
    Are they fixing a bug, adding a new feature, improving performance or readability, or something else?
    Use this information to craft a concise and detailed gitmoji commit message that clearly describes what the provided code or diff does.

    Describe the change to the best of your capabilities in one short sentence. Don't go into too much detail.

    When reviewing a diff, pay attention to the changed filenames and extract the context of the changes.
    This will help you create a more relevant and informative commit message.
    Here are some examples of how you can interpret some changed filenames:
      - Files or filepaths that reference testing are usually related to tests.
      - Markdown files are usually related to documentation.
      - Config file adjustments are usually related to configuration changes.

    Here is a list of gitmoji codes and their descriptions of what they mean when they are used: """
    ${list}
    """

    Try to match the generated message to a fitting emoji using its description from the provided list above.
    So go look in the descriptions and find the one that best matches the description.

    Always start your commit message with a gitmoji followed by the message starting with a capital letter.
    Never mention filenames or function names in the message.

    Don't do this:
      - :bug: Fix issue in calculateTotalPrice function
      - :zap: Improve performance of calculateTopProducts function
      - :lipstick: Refactor styling for calculateCartTotal function
      - :memo: Update documentation for getProductById function

    Do this:
      - :bug: Fix issue with shopping cart checkout process
      - :zap: Improve performance of search functionality
      - :lipstick: Refactor styling for product details page
      - :memo: Update documentation for API endpoints

    ${
      context
        ? `
          Refer to the provided additional context to assist you with choosing a correct gitmoji
          and constructing a good message: """
          ${context}
          """
        `
        : ''
    }

    Here is the provided git diff or code snippet: """
    ${prepareDiff(diff, minify)}
    """
  `;
}

/**
 * Do some additional post processing on the received answer
 */
function parseMessage(message: string | undefined, gitmojis: Gitmoji[]) {
  if (!message) {
    return;
  }

  // Replace emojis with codes
  for (const gitmoji of gitmojis) {
    message = message.replace(gitmoji.emoji, gitmoji.code);
  }

  // Force only one sentence if for some reason multiple are returned
  message = message.split('\n')[0];

  // Remove trailing punctuation
  return message.replace(/\.$/g, '');
}

export async function generateMessage(
  diff: string,
  gitmojis: Gitmoji[],
  context?: string,
  useLatestOpenAIModel = false,
) {
  const model = useLatestOpenAIModel ? 'gpt-4' : 'gpt-3.5-turbo';
  const encoding = encoding_for_model(model);
  let prompt = generatePrompt(diff, gitmojis, context);

  // Check if exceeding model max token length and minify accordingly
  if (encoding.encode(prompt).length > 4096) {
    prompt = generatePrompt(diff, gitmojis, context, true);

    // Check if minified prompt is still too long
    if (encoding.encode(prompt).length > 4096) {
      console.error(
        'The diff is too large, try reducing the number of staged changes.',
      );

      process.exit();
    }
  }

  let message;
  while (true) {
    const response = await openai.createChatCompletion({
      model,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    message = parseMessage(response.data.choices[0].message?.content, gitmojis);
    const { confirmation }: { confirmation: boolean } = await prompts(
      {
        type: 'confirm',
        name: 'confirmation',
        message,
        initial: true,
      },
      {
        onCancel: () => process.exit(),
      },
    );

    if (!!confirmation) {
      break;
    }
  }

  // Free the encoding to prevent memory leaks
  encoding.free();

  return message;
}
