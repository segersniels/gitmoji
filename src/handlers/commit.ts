import prompts from 'prompts';
import { spawnSync } from 'child_process';
import { getEmojis } from 'emoji';
import Config from 'config';
import ConfigOptions from 'enums/ConfigOptions';

const config = new Config();

export default {
  commit: async (uppercase?: boolean) => {
    const { gitmojis } = await getEmojis();

    const { emoji } = await prompts({
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
    });

    if (!emoji) {
      process.exit(0);
    }

    const { message } = await prompts({
      type: 'text',
      name: 'message',
      message: 'Enter the commit title',
    });

    if (!message) {
      process.exit(0);
    }

    // Check if first letter should be uppercased
    const shouldUppercase =
      uppercase ?? config.get(ConfigOptions.UPPERCASE_FIRST_CHARACTER);

    // Construct the final commit message
    const messageToSend = `${emoji} ${
      shouldUppercase
        ? message.charAt(0).toUpperCase() + message.slice(1)
        : message
    }`;

    spawnSync('git', ['commit', '-m', `${messageToSend}`], {
      stdio: 'inherit',
    });
  },
};
