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

const filterData = function (data) {
  const out = [];

  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    //Si l'athlete a été disqualifié on ne compte pas la comp
    // On ne prend en compte que les compet SBD pour l'instant
    if (item.Place === "DQ" || item.Event !== "SBD") {
      continue;
    }

    if (!out[item.Name]) {
      out[item.Name] = item;
    } else {
      if (item.Date > out[item.Name].Date) {
        out[item.Name] = item;
      }
    }
  }

  return Object.values(out);
};

const ASBRMember = [
  "Gurvan Seveno",
  "Francois Biron",
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
  "Elise Garreau",
  "Jérémy Paris",
  "Louis Hitier",
  "Lenaïg Celle",
  "Alexandre Leray",
  "Benoît Brossaud",
  "Justin Jouanneau",
  "Hugo Chauvet",
  "Hélène Jarry",
  "Lorna Remy",
  "Yann Le Liboux",
  "Hugo Carle",
  "Ketty Milot",
  "Loic Agostini",
  "Mathys Moreau Menanteau",
  "Gabin Noe",
  "Paphop Poonkan",
  "Clemence Lucas",
  "Nathan Garreau"
];

const updateJsonFiles = async () => {
  console.log("Updating JSON file");
  const contentPath = path.join(workingDir, "content");

  const filePath = fg.sync(`**.csv`, {
    cwd: path.join(workingDir, "data"),
  });

  const fileContent = await fsPromise.readFile(`data/${filePath[0]}`, "utf8");

  const FrenchPath = path.join(contentPath, `french.json`);

  console.log("entry: data/openipf-2024-04-13-553d476b.csv");
  const input = papa.parse(fileContent, {
    delimiter: "",
    newline: "",
    quoteChar: '"',
    header: true,
    skipEmptyLines: true,
  });

  const FrenchDataOnly = input.data.filter((item) => {
    return item.Federation === "FFForce";
  });

  console.log(`writing ${FrenchPath}...`);
  await fsPromise.writeFile(
    FrenchPath,
    JSON.stringify(FrenchDataOnly, null, 2),
    "utf-8"
  );

  const ASBRDataOnly = FrenchDataOnly.filter((item) => {
    return ASBRMember.includes(item.Name);
  });

  console.log(`writing ASBR file...`);
  const index = filterData(ASBRDataOnly);
  await fsPromise.writeFile(
    path.join(contentPath, "index.json"),
    JSON.stringify(index, null, 2),
    "utf-8"
  );

  const userFiles = fg.sync([`**.json`], {
    cwd: path.join(workingDir, "content/user"),
  });

  await Promise.all(
    userFiles.map((l) => fsPromise.rm(`content/user/${l}`)),
  );

  console.log('Processing personnal files')
  for (let i =0; i < ASBRMember.length; i++) {
    const item = ASBRMember[i];
    const name = item.replace(' ', '-').toLowerCase();

    let data = ASBRDataOnly.filter((data) => {
      return data.Name === item;
    })

    const userFilePath = path.join(contentPath, `user/${name}.json`)

    await fsPromise.writeFile(
      userFilePath,
      JSON.stringify({comps: data}, null, 2),
      "utf-8"
    )
  }
};

updateJsonFiles();
