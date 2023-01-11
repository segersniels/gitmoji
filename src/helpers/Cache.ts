import { promises as fs } from 'fs';
import Gitmoji from 'types/Gitmoji';
import { homedir } from 'os';

interface Data {
  gitmojis: Gitmoji[];
  timestamp: string;
}

export const CACHE_FILE = `${homedir()}/.gitmoji/gitmojis.json`;

export default class Cache {
  public static async exists(path = CACHE_FILE) {
    try {
      await fs.access(path);
      return true;
    } catch (err) {
      return false;
    }
  }

  public static async read(): Promise<Data> {
    return JSON.parse(await fs.readFile(CACHE_FILE, 'utf8'));
  }

  public static async write(data: Pick<Data, 'gitmojis'>) {
    // Create the directory if it doesn't exist yet
    const directory = CACHE_FILE.substring(0, CACHE_FILE.lastIndexOf('/'));

    if (!(await Cache.exists(directory))) {
      await fs.mkdir(directory);
    }

    await fs.writeFile(
      CACHE_FILE,
      JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
    );
  }
}
