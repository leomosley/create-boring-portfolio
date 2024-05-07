#!/usr/bin/env node
import { Argument, Command, Option } from "commander";
import { intro, text, outro, isCancel, cancel } from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import { execSync } from "node:child_process";
import * as fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import install from './install.js';

const program = new Command()
  .name("create-boring-portoflio")
  .description("CLI tool to scaffold NextJS portfolio site with blog")
  .version('0.0.0')
  .addArgument(new Argument('[dir]', 'Directory name'))
  .addOption(new Option('-u [string], --username [string]', 'GitHub username'))
  .addOption(new Option('-t [string], --tag [string]', 'Repo topic tag'))
  .parse(process.argv);

const CURR_DIR = process.cwd();
const __dirname = dirname(fileURLToPath(import.meta.url));
const templatePath = `${__dirname}/template/boring-portfolio`;

async function main() {
	console.clear();
	await setTimeout(1000);

	intro(`${color.bgCyan(color.black(' create-boring-portfolio '))}`);

  const { u, t } = program.opts();

  let dir = program.args[0] ?? '';
  let username;
  let tag;

  if (!dir) {
    const tempDir  = await text({
      message: 'Enter portfolio name: ',
      placeholder: 'portfolio',
      defaultValue: 'portfolio',
    });
    dir = tempDir.toString();

    if (isCancel(tempDir)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  if (!u) {
    const tempUsername = await text({
      message: 'Enter GitHub username: ',
      validate: (value) => {
        if (!value) return 'Please enter a GitHub username.'
      }
    });
    username = tempUsername.toString();

    if (isCancel(tempUsername)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  if (!t) {
    const tempTag = await text({
      message: 'Choose a repo tag: ',
      placeholder: 'showcase',
      defaultValue: 'showcase',
    });
    tag = tempTag.toString();

    if (isCancel(tempTag)) {
      cancel('Operation cancelled.');
      process.exit(0);
    }
  }

  const runCommand = (command) => {
    try {
      execSync(command, {stdio: 'ignore'});
    } catch (e) {
      console.error(e);
    }
    return true;
  }

  fs.mkdirSync(`${CURR_DIR}/${dir}`);
  
  install(templatePath, dir, tag, username);

  outro('Portfolio created.');
}

main().catch(console.error);
