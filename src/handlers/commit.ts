/* eslint-disable @typescript-eslint/camelcase */
import prompts from 'prompts';
import { spawnSync, execSync } from 'child_process';
import { getEmojis } from 'helpers/Emoji';
import Config from 'helpers/Config';
import ConfigOptions from 'enums/ConfigOptions';
import { openai, generatePrompt } from 'helpers/OpenAI';

interface Options {
  verify?: boolean;
  previous?: boolean;
  generate?: boolean;
}

async function generate(verify?: boolean) {
  if (!process.env.OPENAI_API_KEY) {
    console.error(`Unable to locate OPENAI_API_KEY in environment`);
    process.exit();
  }

  const diff = execSync('git diff --cached').toString();
  if (!diff.trim().length) {
    return console.error(`No changes to commit`);
  }

  const prompt = await generatePrompt(diff);

  let message;
  while (true) {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    const { confirmation }: { confirmation: boolean } = await prompts(
      {
        type: 'confirm',
        name: 'confirmation',
        message: response.data.choices[0].message?.content,
        initial: true,
      },
      {
        onCancel: () => process.exit(),
      },
    );

    if (!!confirmation) {
      message = response.data.choices[0].message?.content.replace(/\.$/g, '');
      break;
    }
  }

  // Construct arguments
  const args = ['commit', '-m', `${message}`];
  if (verify === false) {
    args.push('--no-verify');
  }

  spawnSync('git', args, {
    stdio: 'inherit',
  });
}

export default {
  commit: async (options: Options) => {
    const { verify = true } = options;

    let emoji: string, message: string;
    const config = new Config();

    if (options.generate) {
      return await generate();
    }

    const lastUsedMessage = config.get(ConfigOptions.LastUsedMessage);
    if (options.previous && !!lastUsedMessage) {
      const args = ['commit', '-m', `${lastUsedMessage}`];
      if (!verify) {
        args.push('--no-verify');
      }

      spawnSync('git', args, {
        stdio: 'inherit',
      });

      return;
    }

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

      message = response.message;
    } while (!message);

    // Strip leading and trailing whitespace
    message = message.trim();

    // Construct the final commit message
    const messageToSend = `${emoji} ${
      config.get(ConfigOptions.CapitalizeFirstLetter)
        ? message.charAt(0).toUpperCase() + message.slice(1)
        : message
    }`;

    if (config.get(ConfigOptions.TrackLastUsedMessage)) {
      config.set(ConfigOptions.LastUsedMessage, messageToSend);
    }

    // Construct arguments
    const args = ['commit', '-m', `${messageToSend}`];
    if (!verify) {
      args.push('--no-verify');
    }

    spawnSync('git', args, {
      stdio: 'inherit',
    });
  },
};
