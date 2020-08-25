#!/usr/bin/env node
import { Command } from 'commander';
import packageJson from 'package';
import commitHandler from 'handlers/commit';
import configHandler from 'handlers/config';

const program = new Command();

(async () => {
  program
    .name('gitmoji')
    .version(packageJson.version)
    .description('A gitmoji client for using emojis on commit messages.')
    .option('-c, --commit', 'Interactively commit using the prompts')
    .option(
      '--no-uppercase',
      'Disable automatic upper casing of the first letter',
    )
    .action(async () => {
      if (program.commit) {
        await commitHandler.commit(program.uppercase);
      }

      // Display usage when no command or option passed
      if (program.args.length === 0 && !program.commit) {
        program.help();
      }
    });

  program
    .command('commit')
    .description('Interactively commit using the prompts')
    .option(
      '--no-uppercase',
      'Disable automatic upper casing of the first letter',
    )
    .action(async () => {
      await commitHandler.commit(program.uppercase);
    });

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
