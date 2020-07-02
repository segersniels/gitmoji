import { name } from 'package';
import { homedir } from 'os';
import Configstore from 'configstore';
import { CacheOptions, ConfigOptions } from 'enums/Options';
import ConfigType from 'enums/ConfigType';

export type CacheConfig = Record<CacheOptions, number | boolean>;
export type GlobalConfig = Record<ConfigOptions, boolean>;

export const defaultCache: CacheConfig = {
  [CacheOptions.CACHE_DURATION]: -1,
  [CacheOptions.ENABLE_CACHE]: true,
};
export const defaultConfig: GlobalConfig = {
  [ConfigOptions.UPPERCASE_FIRST_CHARACTER]: false,
};

type Config = GlobalConfig | CacheConfig;

const ConfigPaths: Record<ConfigType, string> = {
  CONFIG: `${homedir()}/.gitmoji/config.json`,
  CACHE: `${homedir()}/.gitmoji/cache.json`,
};

export default class {
  private initialConfig: Config;
  private configPath: string;

  constructor(type: ConfigType) {
    this.initialConfig =
      type === ConfigType.CONFIG ? defaultConfig : defaultCache;
    this.configPath = ConfigPaths[type];
  }

  private get config(): Configstore {
    return new Configstore(name, this.initialConfig, {
      configPath: this.configPath,
    });
  }

  public get<T extends CacheOptions | ConfigOptions>(
    key: T,
  ): T extends CacheOptions ? number | boolean : boolean {
    // Get the value from the config
    const value = this.config.get(key);

    if (typeof value === 'undefined') {
      console.error(`Unable to retrieve ${key} from the config`);
      process.exit(1);
    }

    return value;
  }

  public set<T extends CacheOptions | ConfigOptions>(
    key: T,
    value: T extends CacheOptions ? number | boolean : boolean,
  ) {
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
