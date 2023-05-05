/* eslint-disable @typescript-eslint/camelcase */
import prompts from 'prompts';
import { spawnSync, execSync } from 'child_process';
import { getEmojis } from 'helpers/Emoji';
import Config from 'helpers/Config';
import ConfigOptions from 'enums/ConfigOptions';
import { generateMessage } from 'helpers/OpenAI';
import { Warning } from 'helpers/Error';

interface Options {
  verify?: boolean;
  previous?: boolean;
  generate?: boolean;
  context?: boolean;
}

async function generate(
  diff: string,
  promptForContext?: boolean,
  useLatestOpenAIModel = false,
) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error(`Unable to locate OPENAI_API_KEY in environment`);
  }

  let context: string | undefined;
  if (promptForContext) {
    ({ context } = await prompts(
      {
        type: 'text',
        name: 'context',
        message: 'Provide additional context for the commit message',
      },
      {
        onCancel: () => process.exit(),
      },
    ));
  }

  const { gitmojis } = await getEmojis();
  const message = await generateMessage(
    diff,
    gitmojis,
    context,
    useLatestOpenAIModel,
  );

  return message;
}

export default {
  commit: async (options: Options) => {
    let emoji: string, message: string;
    const { verify = true } = options;
    const config = new Config();

    const diff = execSync('git diff --cached').toString();
    if (!diff.trim().length) {
      throw new Warning(`No changes to commit`);
    }

    const lastUsedMessage = config.get(ConfigOptions.LastUsedMessage);
    if (options.previous && !!lastUsedMessage) {
      // Use the last used message if available
      message = lastUsedMessage;
    } else if (options.generate) {
      // User requested to generate a message
      const generated = await generate(
        diff,
        options.context,
        config.get(ConfigOptions.UseLatestOpenAIModel),
      );

      if (!generated) {
        throw new Error('Unable to generate commit message');
      }

      message = generated;
    } else {
      // Construct the commit message manually
      const { gitmojis } = await getEmojis();

      do {
        const response: { emoji: string } = await prompts(
          {
            type: 'autocomplete',
            name: 'emoji',
            message: 'Choose a gitmoji',
            choices: gitmojis.map(gitmoji => ({
              title: `${gitmoji.emoji} - ${gitmoji.description}`,
              value: gitmoji.code,
            })),
            suggest: (input, choices) => {
              return Promise.resolve(
                choices.filter(i =>
                  i.title.toLowerCase().includes(input.toLowerCase()),
                ),
              );
            },
          },
          {
            onCancel: () => process.exit(),
          },
        );

        emoji = response.emoji;
      } while (!emoji);

      do {
        const response: { message: string } = await prompts(
          {
            type: 'text',
            name: 'message',
            message: 'Enter the commit title',
          },
          {
            onCancel: () => process.exit(),
          },
        );

        message = response.message.trim();
      } while (!message);

      // Construct the final commit message
      message = `${emoji} ${
        config.get(ConfigOptions.CapitalizeFirstLetter)
          ? message.charAt(0).toUpperCase() + message.slice(1)
          : message
      }`;
    }

    if (config.get(ConfigOptions.TrackLastUsedMessage)) {
      config.set(ConfigOptions.LastUsedMessage, message);
    }

    // Construct arguments
    const args = ['commit', '-m', `${message}`];
    if (!verify) {
      args.push('--no-verify');
    }

    spawnSync('git', args, {
      stdio: 'inherit',
    });
  },
};
