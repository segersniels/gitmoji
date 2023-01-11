import Config from 'helpers/Config';
import prompts from 'prompts';
import ConfigOptions from 'enums/ConfigOptions';

const config = new Config();

enum SubCommand {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

const configure = async (type: SubCommand) => {
  const global = config.list();
  const keys = Object.keys(global).filter(key =>
    type === SubCommand.ENABLE
      ? !global[key as ConfigOptions]
      : global[key as ConfigOptions],
  );

  if (!keys || !keys.length) {
    process.exit(0);
  }

  const { option } = await prompts({
    type: 'autocomplete',
    name: 'option',
    message: `Choose an option to ${type}`,
    choices: keys.map(key => ({
      title: key,
      value: key,
    })),
    suggest: (input, choices) => {
      return Promise.resolve(
        choices.filter(i =>
          i.title.toLowerCase().includes(input.toLowerCase()),
        ),
      );
    },
  });

  if (!option) {
    process.exit(0);
  }

  config.set(option, type === SubCommand.ENABLE);
};

export default {
  enable: async () => {
    await configure(SubCommand.ENABLE);
  },
  disable: async () => {
    await configure(SubCommand.DISABLE);
  },
  list: () => {
    console.log(JSON.stringify(config.list(), null, 2));
  },
};
