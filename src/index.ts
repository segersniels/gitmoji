#!/usr/bin/env node
import { Command } from 'commander';
import packageJson from 'package';
import handlers from 'handlers';

const program = new Command();

(async () => {
  program
    .name('gitmoji')
    .version(packageJson.version)
    .description('A gitmoji client for using emojis on commit messages.');

  program
    .command('commit')
    .description('Interactively commit using the prompts')
    .option('--no-verify', 'Bypass pre-commit and commit-msg hooks')
    .option('-p, --previous', 'Commit using the last used commit message')
    .option(
      '--generate',
      'Generate a commit message from your current staged changes',
    )
    .option('--context', 'Add additional context to commit generation')
    .action(async options => {
      if (options.context && !options.generate) {
        return console.error(
          'You must provide the --generate flag to provide additional context with the --context flag',
        );
      }

      await handlers.commit.commit(options);
    });

  program
    .command('update')
    .description('Sync emoji list with the repo')
    .action(async () => {
      await handlers.base.update();
    });

  program
    .command('list')
    .description('List all the available gitmojis')
    .action(async () => {
      await handlers.base.list();
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
