import Config from 'config';
import { CacheOptions } from 'enums/Options';
import ConfigType from 'enums/ConfigType';

const config = new Config(ConfigType.CACHE);

export default {
  enable: () => {
    config.set(CacheOptions.ENABLE_CACHE, true);
  },
  disable: () => {
    config.set(CacheOptions.ENABLE_CACHE, false);
  },
  view: () => {
    console.log(JSON.stringify(config.list(), null, 2));
  },
  duration: (value: string) => {
    const parsed = Number(value);

    // Check if valid number passed
    if (isNaN(parsed)) {
      return;
    }

    config.set(CacheOptions.CACHE_DURATION, parsed);
  },
};
