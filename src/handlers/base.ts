import { getEmojis, updateListFromRemote } from 'helpers/Emoji';

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
      throw new Error(
        'Failed to update, notify the author by creating an issue at: https://github.com/segersniels/gitmoji/issues',
      );
    }
  },
};
