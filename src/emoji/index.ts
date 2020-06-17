import fetch from 'cross-fetch';
import Cache from 'cache';
import { homedir } from 'os';
import moment from 'moment';

const cache = new Cache(`${homedir()}/.gitmoji/gitmojis.json`);

interface Gitmoji {
  emoji: string;
  code: string;
  name: string;
  description: string;
}

export const getEmojis = async (): Promise<{ gitmojis: Gitmoji[] }> => {
  if (await cache.exists()) {
    const cached = await cache.read();

    // Invalidate the cache each month
    if (
      moment(cached.timestamp)
        .add(1, 'month')
        .isAfter(moment())
    ) {
      return cached;
    }
  }

  const response = await fetch(
    'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json',
  );

  if (!response.ok) {
    return { gitmojis: [] };
  }

  // Parse the response data
  const gitmojis = await response.json();

  // Write the JSON to cache
  await cache.write(gitmojis);

  return gitmojis;
};
