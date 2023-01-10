import prompts from 'prompts';
import { spawnSync } from 'child_process';
import { getEmojis } from 'emoji';
import Config from 'config';
import ConfigOptions from 'enums/ConfigOptions';

const config = new Config();

export default {
  list: async () => {
    const { gitmojis } = await getEmojis();

    console.log(
      gitmojis
        .map(
          gitmoji =>
            `${gitmoji.emoji} - ${gitmoji.code} - ${gitmoji.description}`,
        )
        .join('\n'),
    );
  },
  commit: async (verify = true) => {
    const { gitmojis } = await getEmojis();
    let emoji: string, message: string;

    do {
      const response: { emoji: string } = await prompts(
        {
          type: 'autocomplete',
          name: 'emoji',
          message: 'Choose a gitmoji',
          choices: gitmojis.map(gitmoji => ({
            title: `${gitmoji.emoji}  - ${gitmoji.description}`,
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
      config.get(ConfigOptions.CAPITALIZE_FIRST_LETTER)
        ? message.charAt(0).toUpperCase() + message.slice(1)
        : message
    }`;

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
