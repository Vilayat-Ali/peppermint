const fs = require("node:fs");

function getKeysFromDotEnvFiles(filePath) {
  fs.readFile(filePath, { encoding: "utf-8" }, function (err, contents) {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    const lines = contents.split("\n");
    return lines.map((line) => line.split("=")[0]);
  });
}

function runValidationTest() {
  const dotEnvKeys = getKeysFromDotEnvFiles(".env");
  const dotEnvExampleKeys = getKeysFromDotEnvFiles(".env.example");
  const missing = [];

  for (const key of dotEnvKeys) {
    if (dotEnvExampleKeys.indexOf(key) === -1) {
      missing.push(key);
    }
  }

  if (missing.length !== 0) {
    for (const key of missing) {
      console.error(
        `Env ['${key}']: missing from .env.example but present in .env`
      );
    }
    return;
  }

  console.log("Env files validated successfully!");
}

runValidationTest();
