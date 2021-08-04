import { promises as fs } from 'fs';
import Gitmoji from 'types/Gitmoji';

interface Data {
  gitmojis: Gitmoji[];
  timestamp: string;
}

export default class Cache {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public exists = async (path: string = this.path) => {
    try {
      await fs.access(path);
      return true;
    } catch (err) {
      return false;
    }
  };

  public read = async (): Promise<Data> => {
    return JSON.parse(await fs.readFile(this.path, 'utf8'));
  };

  public write = async (data: Pick<Data, 'gitmojis'>) => {
    // Create the directory if it doesn't exist yet
    const directory = this.path.substring(0, this.path.lastIndexOf('/'));
    if (!(await this.exists(directory))) {
      await fs.mkdir(directory);
    }

    await fs.writeFile(
      this.path,
      JSON.stringify({ ...data, timestamp: new Date().toISOString() }),
    );
  };
}
