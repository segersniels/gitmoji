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
    .option('-l, --list', 'List all the available gitmojis')
    .option('--no-verify', 'Bypass pre-commit and commit-msg hooks')
    .action(async () => {
      // Handle individual option handlers
      if (program.commit) {
        return await commitHandler.commit(program.verify);
      } else if (program.list) {
        return await commitHandler.list();
      }

      // Show usage as last resort
      return program.help();
    });

  program
    .command('commit')
    .description('Interactively commit using the prompts')
    .option('--no-verify', 'Bypass pre-commit and commit-msg hooks')
    .action(async () => {
      await commitHandler.commit(program.verify);
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
