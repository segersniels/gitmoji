import prompts from 'prompts';
import { spawn } from 'child_process';
import { getEmojis } from 'emoji';
import Config from 'config';
import ConfigType from 'enums/ConfigType';
import { ConfigOptions } from 'enums/Options';

const config = new Config(ConfigType.CONFIG);

export default {
  commit: async () => {
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
    const shouldUppercase = config.get(ConfigOptions.UPPERCASE_FIRST_CHARACTER);

    spawn('git', [
      'commit',
      '-m',
      `${emoji} ${
        shouldUppercase
          ? message.charAt(0).toUpperCase() + message.slice(1)
          : message
      }`,
    ]);
  },
};
