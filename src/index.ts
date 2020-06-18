#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import packageJson from 'package';
import { spawn } from 'child_process';
import { getEmojis } from 'emoji';
import Config, { ConfigOptions } from 'config';

const program = new Command();
const config = new Config();

const commit = async () => {
  const { gitmojis } = await getEmojis();

  const { emoji } = await prompts({
    type: 'autocomplete',
    name: 'emoji',
    message: 'Choose a gitmoji',
    choices: gitmojis.map(gitmoji => ({
      title: `${gitmoji.emoji}  - ${gitmoji.description}`,
      value: gitmoji.code,
    })),
    suggest: (input, choices) => {
      return Promise.resolve(
        choices.filter(i =>
          i.title.toLowerCase().includes(input.toLowerCase()),
        ),
      );
    },
  });

  if (!emoji) {
    process.exit(0);
  }

  const { message } = await prompts({
    type: 'text',
    name: 'message',
    message: 'Enter the commit title',
  });

  if (!message) {
    process.exit(0);
  }

  spawn('git', [
    'commit',
    '-m',
    `${emoji} ${message.charAt(0).toUpperCase() + message.slice(1)}`,
  ]);
};

const run = async () => {
  if (program.commit) {
    await commit();
  }

  // Display usage when no command or option passed
  if (program.args.length === 0 && !program.commit) {
    program.help();
  }
};

const cacheHandler = {
  enable: () => {
    config.set(ConfigOptions.ENABLE_CACHE, true);
  },
  disable: () => {
    config.set(ConfigOptions.ENABLE_CACHE, false);
  },
  view: () => {
    console.log(JSON.stringify(config.view(), null, 2));
  },
  duration: (obj: { args: string[] }) => {
    const value = Number(obj.args[1]);

    // Check if valid number passed
    if (isNaN(value)) {
      return;
    }

    config.set(ConfigOptions.CACHE_DURATION, value);
  },
};

(async () => {
  program
    .name('gitmoji')
    .version(packageJson.version)
    .description('A gitmoji client for using emojis on commit messages.')
    .option('-c, --commit', 'Interactively commit using the prompts')
    .action(run);

  program
    .command('commit')
    .description('Interactively commit using the prompts')
    .action(commit);

  const cache = new Command('cache').description('Configure cache behaviour');
  cache
    .command('enable')
    .description(
      'This will prevent fetching the external emojis on every run (default: enabled)',
    )
    .action(cacheHandler.enable);
  cache
    .command('disable')
    .description(
      'This will cause gitmoji to fetch the emojis on every run (default: enabled)',
    )
    .action(cacheHandler.disable);
  cache
    .command('view')
    .description('View the current cache config')
    .action(cacheHandler.view);
  cache
    .command('duration')
    .description(
      'When the cache duration expires the external emoji data will be updated (default: -1 (cache never expires))',
    )
    .action(cacheHandler.duration);
  program.addCommand(cache);

  await program.parseAsync(process.argv);
})();
