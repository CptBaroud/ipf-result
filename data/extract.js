import path from "path";
import fs from "fs";
import fsPromise from "fs/promises";
import fg from "fast-glob";
import papa from "papaparse";

const workingDir = process.cwd();

const csvToJson = function (obj, key, value) {
  if (key.length > 1) {
    if (!obj[key[0]]) {
      obj[key[0]] = {};
    }
    return csvToJson(obj[key[0]], key.slice(1), value);
  }
  obj[key[0]] = value;
};

const checkFileExists = async function (file) {
  return fs.promises
    .access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

const updateLocales = async () => {
  console.log("Updating JSON file");
  const localesPath = path.join(workingDir, "content");

  const filePath = fg.sync(`**.csv`, {
    cwd: path.join(workingDir, "data"),
  });

  const fileContent = await fsPromise.readFile(
    `data/${filePath[0]}`,
    "utf8"
  );

  const FrenchPath = path.join(
    localesPath,
    `data.json`
  );

  const ASBRPath = path.join(
    localesPath,
    "asbr.json"
  )

  console.log("entry: data/openipf-2024-04-13-553d476b.csv");

  const input = papa.parse(fileContent, {
    delimiter: "",
    newline: "",
    quoteChar: '"',
    header: true,
    skipEmptyLines: true
  });

  const FrenchDataOnly = input.data.filter((item) => {
    return item.Federation === "FFForce"
  })
  
  console.log(`writing ${FrenchPath}...`);
  await fsPromise.writeFile(
    FrenchPath,
    JSON.stringify(FrenchDataOnly, null, 2),
    "utf-8"
  );

  const ASBRMember = [
    'Gurvan Seveno',
    'François Biron',
    "Corentin Piard",
    "Eva Gentilhomme",
    "Clara Lucas",
    "Clémence Lucas",
    "Kyllian Sicot",
    "Jocelyn Cheruel",
    "Emma Poulailleau",
    "Julien Abot",
    "Mickael Texier",
    "Raphael Martin",
    "Antoine Martin",
    "Xavier Piard",
    "Raphael Tenaud",
    "Elise Garreau"
  ]

  const ASBRDataOnly = FrenchDataOnly.filter((item) => {
    return ASBRMember.includes(item.Name)
  })

  console.log(`writing ${ASBRPath}...`);
  await fsPromise.writeFile(
    ASBRPath,
    JSON.stringify(ASBRDataOnly, null, 2),
    "utf-8"
  );
};

updateLocales();
