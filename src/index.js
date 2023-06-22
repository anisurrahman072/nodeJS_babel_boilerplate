// ####### This is for NFT Metadata NAME property change by Unique NAME
// ####### This is for NFT Metadata NAME property change by Unique NAME
// ####### This is for NFT Metadata NAME property change by Unique NAME

import fs from "fs";
import path from "path";

const NFT_COUNTRIES = {
  qatar: "Qatar",
  ecuador: "Ecuador",
  senegal: "Senegal",
  netherlands: "Netherlands",
  england: "England",
  iran: "Iran",
  usa: "USA",
  wales: "Wales",
  argentina: "Argentina",
  saudiArabia: "Saudi Arabia",
  mexico: "Mexico",
  poland: "Poland",
  france: "France",
  australia: "Australia",
  denmark: "Denmark",
  tunisia: "Tunisia",
  spain: "Spain",
  costaRica: "Costa Rica",
  germany: "Germany",
  japan: "Japan",
  belgium: "Belgium",
  canada: "Canada",
  portugal: "Portugal",
  uruguay: "Uruguay",
  brazil: "Brazil",
  cameroon: "Cameroon",
  croatia: "Croatia",
  ghana: "Ghana",
  morocco: "Morocco",
  serbia: "Serbia",
  southKorea: "South Korea",
  switzerland: "Switzerland",
};

const folderName = "wales";

const countryName = NFT_COUNTRIES[folderName];

const nftName = `${countryName} - Soccer Player #`;

const nftMetadatasDir = path.join(__dirname, "nftMetadatas", folderName);

fs.readdir(nftMetadatasDir, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    console.log("AAAAAAAAB: ", file);
    const metadata = fs.readFileSync(
      path.join(__dirname, "nftMetadatas", folderName, file),
      "utf-8"
    );
    let metadataObject = JSON.parse(metadata);
    metadataObject.name = nftName + file.split(".")[0];
    metadataObject.description =
      "A Mixed Reality Gaming company with a multi-sport scorekeeping app, sports equipment product line and a collection of player and team NfTs that unlock special features within the app.";
    console.log("New Name: ", metadataObject.name);
    fs.writeFileSync(
      path.join(__dirname, "nftMetadatas", folderName, file),
      JSON.stringify(metadataObject)
    );
    console.log("End: ------------------------------------------------", file);
  });
});
