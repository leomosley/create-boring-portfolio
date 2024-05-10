#!/usr/bin/env node
import { text, cancel, group } from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';
import * as fs from 'fs';
import { execSync } from "node:child_process";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ora from "ora";

const CURR_DIR = process.cwd();
const __DIRNAME = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_PATH = `${__DIRNAME}/template/boring-portfolio`;
const DEFAULT_APP_NAME = 'portfolio';
const DEFAULT_REPO_TAG = 'showcase';

const logger = {
  error(...args) {
    console.log(color.red(...args));
  },
  warn(...args) {
    console.log(color.yellow(...args));
  },
  info(...args) {
    console.log(color.cyan(...args));
  },
  success(...args) {
    console.log(color.green(...args));
  },
};

const runCommand = (command) => {
  try {
    execSync(command, {stdio: 'pipe'});
  } catch (e) {
    console.error(e);
  }
  return true;
}

const removeTrailingSlash = (string) => {
  if (string.length > 1 && string.endsWith("/")) {
    string = string.slice(0, -1);
  }
  return string;
};

const validateAppName = (string) => {
  const validationRegExp = /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/;
  const input = removeTrailingSlash(string);
  const paths = input.split("/");

  // If the first part is a @, it's a scoped package
  const indexOfDelimiter = paths.findIndex((p) => p.startsWith("@"));

  let appName = paths[paths.length - 1];
  if (paths.findIndex((p) => p.startsWith("@")) !== -1) {
    appName = paths.slice(indexOfDelimiter).join("/");
  }

  if (input === "." || validationRegExp.test(appName ?? "")) {
    return true;
  }
};

const validateGithubUsername = (username) => {
  const validationRegExp = /^(?!-)[a-zA-Z0-9-]{3,38}$/;
  return validationRegExp.test(username ?? "");
}

const validateRepoTag = (tag) => {
  const validationRegExp = /^(?!-)[a-zA-Z0-9-]{3,38}$/;
  return validationRegExp.test(tag ?? "");
}

const runInstallBoilerPlate = (templatePath, newProjectPath, tag, username) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, 'utf8');

      if (file === '.npmignore') file = '.gitignore';

      if (file === '.env') {
        contents = `GITHUB_USERNAME=${username}\nREPO_TAG=${tag}`;
      }

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      runInstallBoilerPlate(`${templatePath}/${file}`, `${newProjectPath}/${file}`, tag, username);
    }
  });
};

const installBoilerPlate = async (templatePath, dir, tag, username) => {
  logger.info("\nInstalling boilerplate...");
  const loadingSpinner = ora('Installing...').start();
  try {
    runInstallBoilerPlate(templatePath, dir, tag, username);
  
    loadingSpinner.succeed(
      color.green("Successfully installed boilerplate!\n")
    );
  } catch (error) {
    loadingSpinner.fail(
      color.red(error)
    );
  }
  
};

const installDependencies = async (dir) => {
  logger.info("Installing dependencies...");
  const loadingSpinner = ora('Installing...').start();
  const installed = runCommand(`cd ${dir} && npm install --save-dev next@14.0.4`)

  if (installed) {
    loadingSpinner.succeed(
      color.green("Successfully installed dependencies!\n")
    );
  } else {
    loadingSpinner.fail(
      color.red("Error installing dependencies!\n")
    );
    process.exit(-1);
  }
};

async function main() {
  console.clear();
	await setTimeout(500);
  console.log(color.bgCyan(color.black('create-boring-portfolio')));

  const options = await group(
    {
      dir: () =>
        text({
          message: 'What should we name your portfolio?',
          placeholder: DEFAULT_APP_NAME,
          defaultValue: DEFAULT_APP_NAME,
          validate: (value) => {
            if (value) if (!validateAppName(value)) return "App name must consist of only lowercase alphanumeric characters, '-', and '_'";
          },
        }),
    username: () =>
      text({
        message: "What's GitHub username?",
        validate: (value) => {
          if (!validateGithubUsername(value)) return "Not a valid github username";
        }
      }),
    tag: () =>
      text({
        message: "What topic tag should we give the Repos you want to showcase?",
        placeholder: DEFAULT_REPO_TAG,
        defaultValue: DEFAULT_REPO_TAG,
        validate: (value) => {
          if (value) if (!validateRepoTag(value)) return "Not a valid topic tag";
        }
      })
    },
    {
      onCancel: () => {
        cancel('Operation cancelled.');
        process.exit(0);
      }
    }
  );

  fs.mkdirSync(`${CURR_DIR}/${options.dir}`);
  
  await installBoilerPlate(TEMPLATE_PATH, options.dir, options.tag, options.username);

  await installDependencies(options.dir);

  logger.info(`Next steps:\n  cd ${options.dir}\n  npm run dev\n  git init\n  git commit -m "initial commit"`);
}

main().catch(console.error);