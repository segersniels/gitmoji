import { name } from 'package';
import { homedir } from 'os';
import Configstore from 'configstore';

export enum ConfigOptions {
  CACHE_DURATION = 'cache-duration',
  ENABLE_CACHE = 'cache-enable',
}

type Config = Record<ConfigOptions, number | boolean>;

const defaultConfig = {
  [ConfigOptions.CACHE_DURATION]: -1,
  [ConfigOptions.ENABLE_CACHE]: true,
};

const configPath = `${homedir()}/.gitmoji/config.json`;

export default class {
  private initialConfig: Config;

  constructor(initialConfig: Config = defaultConfig) {
    this.initialConfig = initialConfig;
  }

  private get config(): Configstore {
    return new Configstore(name, this.initialConfig, {
      configPath,
    });
  }

  public view(): Config {
    return this.config.all;
  }

  public get = <T extends ConfigOptions>(
    key: T,
  ): T extends ConfigOptions.ENABLE_CACHE ? boolean : number => {
    // Get the value from the config
    const value = this.config.get(key);

    if (typeof value === 'undefined') {
      console.error(`Unable to retrieve ${key} from the config`);
      process.exit(1);
    }

    return value;
  };

  public set = (key: ConfigOptions, value: boolean | number) => {
    if (typeof (defaultConfig as any)[key] === 'undefined') {
      console.error(`Invalid config '${key}' detected`);
      process.exit(1);
    }

    this.config.set(key, value);
  };

  public list = () => {
    return this.config.all;
  };
}
