#!/usr/bin/env node
import { Command } from 'commander';
import packageJson from 'package';
import handlers from 'handlers';

const program = new Command();

(async () => {
  program
    .name('gitmoji')
    .version(packageJson.version)
    .description('A gitmoji client for using emojis on commit messages.')
    .option('-c, --commit', 'Interactively commit using the prompts')
    .option('-l, --list', 'List all the available gitmojis')
    .option('-u, --update', 'Sync emoji list with the repo')
    .option('--no-verify', 'Bypass pre-commit and commit-msg hooks')
    .action(async () => {
      // Handle individual option handlers
      if (program.commit) {
        return await handlers.base.commit(program.verify);
      } else if (program.list) {
        return await handlers.base.list();
      } else if (program.update) {
        return await handlers.base.update();
      }

      // Show usage as last resort
      return program.help();
    });

  program
    .command('commit')
    .description('Interactively commit using the prompts')
    .option('--no-verify', 'Bypass pre-commit and commit-msg hooks')
    .action(async () => {
      await handlers.base.commit(program.verify);
    });

  const config = new Command('config').description(
    'Configure general gitmoji behaviour',
  );

  config
    .command('enable')
    .description('Enable behaviour')
    .action(handlers.config.enable);
  config
    .command('disable')
    .description('Disable behaviour')
    .action(handlers.config.disable);
  config
    .command('list')
    .aliases(['ls'])
    .description('View the current config')
    .action(handlers.config.list);

  program.addCommand(config);

  await program.parseAsync(process.argv);
})();
