#!/usr/bin/env node
import { Command } from 'commander';
import prompts from 'prompts';
import packageJson from 'package';
import { spawn } from 'child_process';
import { getEmojis } from 'emoji';

const program = new Command();

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

  await program.parseAsync(process.argv);
})();
