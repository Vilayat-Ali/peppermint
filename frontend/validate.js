const fs = require("node:fs");

function getEnvFileKeys(filePath) {
  try {
    const contents = fs.readFileSync(filePath, "utf8");
    const lines = contents.split("\n");
    return lines.map((line) => line.trim().split("=")[0]);
  } catch (err) {
    console.error(err);
  }
}

function validate() {
  try {
    const dotEnvKeys = getEnvFileKeys(".env");
    const dotEnvExampleKeys = getEnvFileKeys(".env.example");

    if (!dotEnvKeys) {
      console.error(".env file does not exists!");
      return;
    }

    if (!dotEnvExampleKeys) {
      console.error(".env.example file does not exists!");
      return;
    }

    const missing = [];

    for (const key of dotEnvKeys) {
      if (dotEnvExampleKeys.indexOf(key) === -1) {
        missing.push(key);
      }
    }

    if (missing.length > 0) {
      for (const missingKey of missing) {
        console.error(
          `[${missingKey}]: missing from .env.example but mentioned in .env`
        );
      }
      return;
    }

    console.log("No problems in envs found!");
  } catch (err) {
    console.error(err);
  }
}

validate();
