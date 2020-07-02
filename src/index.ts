#!/usr/bin/env node
import { Command } from 'commander';
import packageJson from 'package';
import cacheHandler from 'handlers/cache';
import commitHandler from 'handlers/commit';
import configHandler from 'handlers/config';

const program = new Command();

const run = async () => {
  if (program.commit) {
    await commitHandler.commit();
  }

  // Display usage when no command or option passed
  if (program.args.length === 0 && !program.commit) {
    program.help();
  }
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
    .action(commitHandler.commit);

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
    .aliases(['ls'])
    .description('View the current cache config')
    .action(cacheHandler.view);
  cache
    .command('duration <value>')
    .description(
      'When the cache duration expires the external emoji data will be updated (default: 0 (cache never expires))',
    )
    .action(cacheHandler.duration);
  program.addCommand(cache);

  const config = new Command('config').description(
    'Configure general gitmoji behaviour',
  );
  config
    .command('enable')
    .description('Enable behaviour')
    .action(configHandler.enable);
  config
    .command('disable')
    .description('Disable behaviour')
    .action(configHandler.disable);
  config
    .command('list')
    .aliases(['ls'])
    .description('View the current config')
    .action(configHandler.list);
  program.addCommand(config);

  await program.parseAsync(process.argv);
})();
