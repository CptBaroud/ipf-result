import path from "node:path";
import fs from "node:fs";
import fsPromise from "node:fs/promises";
import fg from "fast-glob";
import papa from "papaparse";

const workingDir = process.cwd();

const csvToJson = (obj, key, value) => {
  if (key.length > 1) {
    if (!obj[key[0]]) {
      obj[key[0]] = {};
    }
    return csvToJson(obj[key[0]], key.slice(1), value);
  }
  obj[key[0]] = value;
};

function cleanText(text) {
  // Remove characters outside A-Za-z range and replace them with similar characters
  return text
    .toLowerCase()
    .replace(' #1', '')
    .replace(/[^A-Za-z\s']/g, function (match) {
      // Map special characters to similar ones
      const similarChars = {
        é: "e",
        â: "a",
        ê: "e",
        î: "i",
        ô: "o",
        û: "u",
        á: "a",
        à: "a",
        ä: "a",
        ó: "o",
        ò: "o",
        ö: "o",
        ú: "u",
        ù: "u",
        ü: "u",
        í: "i",
        ì: "i",
        ï: "i",
        é: "e",
        è: "e",
        ë: "e",
        // Add more mappings if needed
      };
      // Return similar character if mapping exists, otherwise, remove the character
      return similarChars[match] || "";
    })
    .replace(/\d+/g, "") // Remove any numbers
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Remove consecutive hyphens
}

const filterData = (data) => {
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

const max = (a, b) => {
  if (a && b) return Math.max(a, b);
  if (a) return a;
  if (b) return b;
  return 0;
};

const createRanking = (data, item) => {
  let log = false;

  if (data.length > 1) {
    const info = data[0]
    const d = data.reduce((a, b) => {
      return {
        Best3SquatKg: max(a.Best3SquatKg, b.Best3SquatKg),
        Best3BenchKg: max(a.Best3BenchKg, b.Best3BenchKg),
        Best3DeadliftKg: max(a.Best3DeadliftKg, b.Best3DeadliftKg),
        TotalKg: max(a.TotalKg, b.TotalKg),
        Goodlift: max(a.Goodlift, b.Goodlift),
      };
    });

    if (log) console.log(d)

    return {
      name: info.Name,
      division: info.Division,
      weightClas: info.WeightClassKg,
      sex: info.Sex,
      squat: parseFloat(d.Best3SquatKg),
      bench: parseFloat(d.Best3BenchKg),
      deadlft: parseFloat(d.Best3DeadliftKg),
      total: parseFloat(d.TotalKg),
      ipfPoint: parseFloat(d.Goodlift),
    };
  }

  if (data.length === 1) {
    const d = data[0];

    return {
      name: d.Name,
      division: d.Division,
      weightClas: d.WeightClassKg,
      sex: d.Sex,
      squat: parseFloat(d.Best3SquatKg),
      bench: parseFloat(d.Best3BenchKg),
      deadlft: parseFloat(d.Best3DeadliftKg),
      total: parseFloat(d.TotalKg),
      ipfPoint: parseFloat(d.Goodlift),
    };
  }

  return {
    name: item,
    division: "",
    weightClas: "",
    sex: "",
    squat: 0,
    bench: 0,
    deadlft: 0,
    total: 0,
    ipfPoint: 0,
  };
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
  "Antoine Martin #1",
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
  "Nathan Garreau",
];  

const updateJsonFiles = async () => {
  console.log("Updating JSON file");

  const contentPath = path.join(workingDir, "content");
  const fileContent = await fsPromise.readFile("data/latest.csv", "utf8");
  const FrenchPath = path.join(contentPath, "french.json");

  console.log("entry: data/latest.csv");
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

  console.log("writing ASBR file...");
  const index = filterData(ASBRDataOnly).map((item) => {
    return {
      uid: cleanText(item.Name),
      ...item
    }
  });
  
  await fsPromise.writeFile(
    path.join(contentPath, "index.json"),
    JSON.stringify(index, null, 2),
    "utf-8"
  );

  const userFiles = fg.sync(["**.json"], {
    cwd: path.join(workingDir, "content/user"),
  });

  await Promise.all(userFiles.map((l) => fsPromise.rm(`content/user/${l}`)));

  const ranking = [];

  console.log("Processing personnal files");
  for (let i = 0; i < ASBRMember.length; i++) {
    const item = ASBRMember[i]; // Nom de la personne
    const name = cleanText(item);

    const data = ASBRDataOnly.filter((data) => {
      return data.Name === item;
    })
      .map((item) => {

        const bestSquat = item.Best3SquatKg === '' ? 0 : Number.parseFloat(item.Best3SquatKg);
        const bestBench =item.Best3BenchKg === '' ? 0 : Number.parseFloat(item.Best3BenchKg);
        const bestTerre = item.Best3DeadliftKg === '' ? 0 : Number.parseFloat(item.Best3DeadliftKg);
        
        return {
          ...item,
          Best3SquatKg: bestSquat,
          Best3BenchKg: bestBench,
          Best3DeadliftKg: bestTerre,
        };
      })
      .sort((a, b) => new Date(b.Date) - new Date(a.Date));

    const d = createRanking(data, item);
    ranking.push(d);

    const userFilePath = path.join(contentPath, `user/${name}.json`);

    await fsPromise.writeFile(
      userFilePath,
      JSON.stringify(
        {
          name,
          division: data[0]?.Division,
          weightClas: data[0]?.WeightClassKg,
          comps: data,
        },
        null,
        2
      ),
      "utf-8"
    );
  }

  await fsPromise.writeFile(
    path.join(contentPath, "ranking.json"),
    JSON.stringify({ ranking: ranking }, null, 2),
    "utf-8"
  );
};

updateJsonFiles();
