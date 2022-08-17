import fs from "fs";
import path from "path";

const dirFirst = path.join(__dirname, "images/first");
const dirSecond = path.join(__dirname, "images/second");

let variationString = "export const fields = [";

// First files
const filesFirst = fs.readdirSync(dirFirst);

if (filesFirst.length > 0) {
  variationString = variationString + "{variation: [";
}

let index = 0;
for (const file of filesFirst) {
  if (index != 0) {
    variationString = variationString + ",";
  }
  let variString = `{name:'${
    file.split(".")[0]
  }',icon:require('../assets/team_icons/crown/${file}')}`;
  variationString = variationString + variString;
  ++index;
}

if (filesFirst.length > 0) {
  variationString = variationString + "]}";
}

// Second files
const filesSecond = fs.readdirSync(dirSecond);

if (filesSecond.length > 0) {
  variationString = variationString + ",{variation: [";
}

index = 0;
for (const file of filesSecond) {
  if (index != 0) {
    variationString = variationString + ",";
  }
  let variString = `{name:'${
    file.split(".")[0]
  }',icon:require('../assets/another_icons/crown/${file}')}`;
  variationString = variationString + variString;
  ++index;
}

if (filesSecond.length > 0) {
  variationString = variationString + "]}";
}

variationString = variationString + "]";

fs.writeFileSync(path.join(__dirname, "output2.txt"), variationString);

// /Users/anis/projects/minimal-node-babel-boilerplate/src
