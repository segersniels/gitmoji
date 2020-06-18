import fetch from 'cross-fetch';
import Cache from 'cache';
import { homedir } from 'os';
import moment from 'moment';
import Config, { ConfigOptions } from 'config';

const cache = new Cache(`${homedir()}/.gitmoji/gitmojis.json`);
const config = new Config();

interface Gitmoji {
  emoji: string;
  code: string;
  name: string;
  description: string;
}

export const getEmojis = async (): Promise<{ gitmojis: Gitmoji[] }> => {
  const shouldCache = config.get(ConfigOptions.ENABLE_CACHE);
  if (shouldCache && (await cache.exists())) {
    const cached = await cache.read();
    const duration = config.get(ConfigOptions.CACHE_DURATION);

    if (
      duration === -1 ||
      moment(cached.timestamp)
        .add(config.get(ConfigOptions.CACHE_DURATION), 'seconds')
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
  if (shouldCache) {
    await cache.write(gitmojis);
  }

  return gitmojis;
};
