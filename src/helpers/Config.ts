import { name } from 'package';
import { homedir } from 'os';
import Configstore from 'configstore';
import ConfigOptions from 'enums/ConfigOptions';

interface Config {
  [ConfigOptions.CapitalizeFirstLetter]: boolean;
  [ConfigOptions.TrackLastUsedMessage]: boolean;
  [ConfigOptions.LastUsedMessage]: string | null;
}

export const defaults: Config = {
  [ConfigOptions.CapitalizeFirstLetter]: true,
  [ConfigOptions.TrackLastUsedMessage]: false,
  [ConfigOptions.LastUsedMessage]: null,
};

export default class {
  private get config(): Configstore {
    const config = new Configstore(name, defaults, {
      configPath: `${homedir()}/.gitmoji/config.json`,
    });

    // Clean up config values no longer in the default config
    for (const key of Object.keys(config.all as Config)) {
      if (typeof defaults[key as ConfigOptions] === 'undefined') {
        config.delete(key);
      }
    }

    return config;
  }

  public get<K extends keyof Config>(key: K): Config[K] {
    return this.config.get(key);
  }

  public set<K extends keyof Config>(key: K, value: Config[K]) {
    this.config.set(key, value);
  }

  public list(): Config {
    return this.config.all;
  }
}
