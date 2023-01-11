import fetch from 'cross-fetch';
import Cache from './Cache';
import moment from 'moment';
import Gitmoji from 'types/Gitmoji';
import fallback from 'fallback';

const ORIGIN_URL =
  'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/packages/gitmojis/src/gitmojis.json';

/**
 * Fetches and updates local cache to be in sync with remote
 */
export async function updateListFromRemote() {
  const response = await fetch(ORIGIN_URL);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Parse the response data
  const gitmojis: {
    gitmojis: Gitmoji[];
  } = await response.json();

  // Write the JSON to cache
  await Cache.write(gitmojis);

  return gitmojis;
}

/**
 * Get list of emojis from either cache or remote
 */
export async function getEmojis() {
  // Try to read from cache
  const cachedEmojis = await Cache.read();

  // Return cached data if still valid
  if (
    cachedEmojis &&
    moment(cachedEmojis.timestamp)
      .add(1, 'month')
      .isAfter(new Date())
  ) {
    return cachedEmojis;
  }

  try {
    return await updateListFromRemote();
  } catch (err) {
    return fallback;
  }
}
