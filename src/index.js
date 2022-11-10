// ####### This is for NFT Metadata IMAGE url change by Arweave manifest URL
// ####### This is for NFT Metadata IMAGE url change by Arweave manifest URL
// ####### This is for NFT Metadata IMAGE url change by Arweave manifest URL

import fs from "fs";
import path from "path";

const manifestUrl =
  "https://bqggqpxom2tuy2455yobalblnym7u6dzzsinn7ruak6vg3aq53ca.arweave.net/DAxoPu5mp0xrne4cECwrbhn6eHnMkNb-NAK9U2wQ7sQ/";

const nftMetadatasDir = path.join(__dirname, "nftMetadatas");

fs.readdir(nftMetadatasDir, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    console.log("AAAAAAAA: ", file);
    const metadata = fs.readFileSync(
      path.join(__dirname, "nftMetadatas", file),
      "utf-8"
    );
    console.log("BBBBBBBB: ", file);
    let metadataObject = JSON.parse(metadata);
    metadataObject.image = manifestUrl + file.split(".")[0] + ".png";
    fs.writeFileSync(
      path.join(__dirname, "nftMetadatas", file),
      JSON.stringify(metadataObject)
    );
    console.log("CCCCCCCCC: ", file, metadataObject.image);
  });
});
