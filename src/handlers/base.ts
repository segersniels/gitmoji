import prompts from 'prompts';
import { spawnSync } from 'child_process';
import { getEmojis, updateListFromRemote } from 'helpers/Emoji';
import Config from 'helpers/Config';
import ConfigOptions from 'enums/ConfigOptions';

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
  update: async () => {
    try {
      await updateListFromRemote();
    } catch (err) {
      return console.error(
        'Failed to update, notify the author by creating an issue at: https://github.com/segersniels/gitmoji/issues',
      );
    }
  },
  commit: async (verify = true, previous = false) => {
    let emoji: string, message: string;
    const config = new Config();

    const lastUsedMessage = config.get(ConfigOptions.LastUsedMessage);
    if (previous && !!lastUsedMessage) {
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
