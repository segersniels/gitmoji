import fetch from 'cross-fetch';
import Cache from './cache';
import { homedir } from 'os';
import moment from 'moment';
import Gitmoji from 'types/Gitmoji';
import fallback from 'data/gitmojis.json';

const cache = new Cache(`${homedir()}/.gitmoji/gitmojis.json`);

interface Response {
  gitmojis: Gitmoji[];
}

/**
 * Attempt to fetch JSON data from original package with a local fallback
 */
const fetchEmojis = async () => {
  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/src/data/gitmojis.json',
    );

    if (!response.ok) {
      return {
        gitmojis: [],
      };
    }

    // Parse the response data
    const gitmojis: Response = await response.json();

    // Write the JSON to cache
    await cache.write(gitmojis);

    return gitmojis;
  } catch (err) {
    /**
     * Something went wrong while trying to fetch from remote location
     * so fallback to local prepackaged copy.
     */
    return fallback;
  }
};

export const getEmojis = async () => {
  // No local cache detected so fetch from remote
  if (!(await cache.exists())) {
    return await fetchEmojis();
  }

  // Try to read from cache
  const cachedEmojis = await cache.read();

  // Return cached data if still valid
  if (
    moment(cachedEmojis.timestamp)
      .add(1, 'month')
      .isAfter(new Date())
  ) {
    return await cache.read();
  }

  return await fetchEmojis();
};
