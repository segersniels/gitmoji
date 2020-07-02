import { name } from 'package';
import { homedir } from 'os';
import Configstore from 'configstore';
import ConfigOptions from 'enums/ConfigOptions';

type Config = Record<ConfigOptions, number | boolean>;

export const defaultConfig: Config = {
  [ConfigOptions.UPPERCASE_FIRST_CHARACTER]: false,
};

export default class {
  private initialConfig: Config;

  constructor() {
    this.initialConfig = defaultConfig;
  }

  private get config(): Configstore {
    return new Configstore(name, this.initialConfig, {
      configPath: `${homedir()}/.gitmoji/config.json`,
    });
  }

  public get(key: ConfigOptions): boolean {
    // Get the value from the config
    const value = this.config.get(key);

    if (typeof value === 'undefined') {
      console.error(`Unable to retrieve ${key} from the config`);
      process.exit(1);
    }

    return value;
  }

  public set(key: ConfigOptions, value: boolean) {
    if (typeof (defaultConfig as any)[key] === 'undefined') {
      console.error(`Invalid config '${key}' detected`);
      process.exit(1);
    }

    this.config.set(key as string, value);
  }

  public list(): Config {
    return this.config.all;
  }
}
