import prompts from 'prompts';
import { spawnSync } from 'child_process';
import { getEmojis } from 'emoji';
import Config from 'config';
import ConfigOptions from 'enums/ConfigOptions';

const config = new Config();

export default {
  commit: async (uppercase?: boolean, verify = true) => {
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

    let { message }: { message: string } = await prompts({
      type: 'text',
      name: 'message',
      message: 'Enter the commit title',
    });

    if (!message) {
      process.exit(0);
    }

    // Strip leading and trailing whitespace
    message = message.trim();

    // Check if first letter should be uppercased
    const shouldUppercase =
      uppercase ?? config.get(ConfigOptions.UPPERCASE_FIRST_CHARACTER);

    // Construct the final commit message
    const messageToSend = `${emoji} ${
      shouldUppercase
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
