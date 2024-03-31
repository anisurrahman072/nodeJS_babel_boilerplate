import { Connection, Keypair } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
const bs58 = require("bs58");
require("dotenv").config();

async function createToken() {
  try {
    // Connect to a Solana cluster
    const connection = new Connection(
      "https://api.testnet.solana.com",
      "confirmed"
    );

    // Your wallet private key
    const privateKey = process.env.ANIS_MAIN_ACCOUNT_PRIVATE_KEY;
    // Your wallet's keypair
    const walletKeypair = Keypair.fromSecretKey(
      new Uint8Array(bs58.decode(privateKey))
    );

    // Create a new spl-token
    const mint = await createMint(
      connection,
      walletKeypair, // payer
      walletKeypair.publicKey, // mint authority
      walletKeypair.publicKey, // freeze authority
      9 // Decimals for the token
    );

    console.log("SPL Token created successfully!");
    console.log("Token Public Key:", mint.toBase58());

    // Now set the token name, symbol & intial values
    // Now set the token name, symbol & intial values
    // Now set the token name, symbol & intial values
  } catch (error) {
    console.log("ERROR OCCURRED: ", error);
  }
}

createToken();
