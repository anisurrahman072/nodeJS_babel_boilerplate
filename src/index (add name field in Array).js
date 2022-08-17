import fs from "fs";
import path from "path";

function readData(err, data) {
  if (eer) {
    console.log(err);
  }

  let dataArray = data.split("icon:");
  let newDataArray = [];

  dataArray.map((d1) => {
    if (d1.includes(".png")) {
      let allSubStitutes = d1.split("/");
      let filenameString = allSubStitutes[allSubStitutes.length - 1];
      let finalFileNameArray = filenameString.split(".");
      let finalFileName = finalFileNameArray[0];
      let stringToPush = `name: '${finalFileName}', \n\t\t\t\t icon: ${d1}`;
      newDataArray.push(stringToPush);
    } else {
      newDataArray.push(d1);
    }
  });
  fs.writeFileSync(path.join(__dirname, "output.txt"), newDataArray.join(""));
}

let pathName = path.join(__dirname, "JournalDEV.txt");
fs.readFile(pathName, "utf8", readData);
