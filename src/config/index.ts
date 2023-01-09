import { name } from 'package';
import { homedir } from 'os';
import Configstore from 'configstore';
import ConfigOptions from 'enums/ConfigOptions';

type Config = Record<ConfigOptions, number | boolean>;

export const defaults: Config = {
  [ConfigOptions.CAPITALIZE_FIRST_LETTER]: true,
};

export default class {
  private get config(): Configstore {
    const config = new Configstore(name, defaults, {
      configPath: `${homedir()}/.gitmoji/config.json`,
    });

    // Clean up config values no longer in the default config
    for (const key of Object.keys(config.all as Config)) {
      if (!defaults[key as ConfigOptions]) {
        config.delete(key);
      }
    }

    return config;
  }

  public get(key: ConfigOptions): boolean {
    return this.config.get(key);
  }

  public set(key: ConfigOptions, value: boolean) {
    this.config.set(key, value);
  }

  public list(): Config {
    return this.config.all;
  }
}
