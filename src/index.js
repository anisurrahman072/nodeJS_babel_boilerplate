// ####### This is for NFT Metadata IMAGE url change by Arweave manifest URL
// ####### This is for NFT Metadata IMAGE url change by Arweave manifest URL
// ####### This is for NFT Metadata IMAGE url change by Arweave manifest URL

import fs from "fs";
import path from "path";

const country = "newZealand";

const manifestUrl = `https://bafybeiclpws3xvwfnzmrnrtqe7g3eehis3j23dhhvvrv5idnq25midacje.ipfs.nftstorage.link/${country}/`;

const nftMetadatasDir = path.join(__dirname, "nftMetadatas", country);

fs.readdir(nftMetadatasDir, function (err, files) {
  //handling error
  if (err) {
    return console.log("Unable to scan directory: " + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    console.log("####################################################: ", file);
    const metadata = fs.readFileSync(
      path.join(__dirname, "nftMetadatas", country, file),
      "utf-8"
    );
    let metadataObject = JSON.parse(metadata);
    metadataObject.image = manifestUrl + file.split(".")[0] + ".png";
    fs.writeFileSync(
      path.join(__dirname, "nftMetadatas", country, file),
      JSON.stringify(metadataObject)
    );
    console.log("----------------------------------------------------------");
  });
});
