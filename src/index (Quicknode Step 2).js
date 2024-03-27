import {
  percentAmount,
  generateSigner,
  signerIdentity,
  createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createAndMint,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";
import "@solana/web3.js";
import secret from "../guideSecret.json";
require("dotenv").config();

try {
  const umi = createUmi(process.env.QUICKNODE_SOLANA_DEVNET_PROVIDER);

  const userWallet = umi.eddsa.createKeypairFromSecretKey(
    new Uint8Array(secret)
  );
  const userWalletSigner = createSignerFromKeypair(umi, userWallet);

  const metadata = {
    name: "WHALE_TEST_1",
    symbol: "WHALET1",
    uri: "https://bafkreibvc2f7lvnw2ghldzzqixxkrmfqsukkgnskvg2ioog7qn6ud2weuq.ipfs.nftstorage.link/",
  };

  console.log("SUCCESS 1: ", userWallet, userWalletSigner);

  const mint = generateSigner(umi);
  umi.use(signerIdentity(userWalletSigner));
  umi.use(mplCandyMachine());

  console.log("SUCCESS 2");

  createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 8,
    amount: 1000000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
  })
    .sendAndConfirm(umi)
    .then(() => {
      console.log(
        "Successfully minted 1 million tokens (",
        mint.publicKey,
        ")"
      );
    });

  console.log("SUCCESS 3");
} catch (error) {
  console.log("ERROR: ", error);
}
