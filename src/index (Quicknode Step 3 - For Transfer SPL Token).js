import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  ParsedAccountData,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
require("dotenv").config();

// Start Operation
const secret =
  process.env.BLUE_WHALE_ACCOUNT_SECRET_ARRAY.split(",").map(Number); // 👈 Replace with your secret

const FROM_KEYPAIR = Keypair.fromSecretKey(new Uint8Array(secret));

console.log(
  `BLUE WHALE Account public key found: ${FROM_KEYPAIR.publicKey.toString()}.`
);

const QUICKNODE_RPC = process.env.QUICKNODE_SOLANA_DEVNET_PROVIDER;
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);

const DESTINATION_WALLET = process.env.ANIS_MAIN_ACCOUNT_PUBLIC_KEY;
const MINT_ADDRESS = process.env.BLUE_WHALE_TOKEN_MINT_ADDRESS; //You must change this value!
const TRANSFER_AMOUNT = 50;

// Function to fetch decimal of BLUE WHALE TOKEN from BLUE WHALE TOKEN mint address
async function getNumberDecimals(mintAddress) {
  const info = await SOLANA_CONNECTION.getParsedAccountInfo(
    new PublicKey(MINT_ADDRESS)
  );
  const result = (info.value?.data).parsed.info.decimals;
  return result;
}

// Function to transfer BLUE WHALE token
// Function to transfer BLUE WHALE token
// Function to transfer BLUE WHALE token
async function sendTokens() {
  console.log(
    `
🚀 Sending ${TRANSFER_AMOUNT} WHALE TOKEN from ${FROM_KEYPAIR.publicKey.toString()} to ${DESTINATION_WALLET}.`
  );
  //Step 1
  console.log(`1 - Getting Source Token Account`);
  let sourceAccount = await getOrCreateAssociatedTokenAccount(
    SOLANA_CONNECTION,
    FROM_KEYPAIR,
    new PublicKey(MINT_ADDRESS),
    FROM_KEYPAIR.publicKey
  );
  console.log(`    Source Account: ${sourceAccount.address.toString()}`);

  //Step 2
  console.log(`2 - Getting Destination Token Account`);
  let destinationAccount = await getOrCreateAssociatedTokenAccount(
    SOLANA_CONNECTION,
    FROM_KEYPAIR,
    new PublicKey(MINT_ADDRESS),
    new PublicKey(DESTINATION_WALLET)
  );
  console.log(
    `    Destination Account: ${destinationAccount.address.toString()}`
  );

  //Step 3
  console.log(`3 - Fetching Number of Decimals for Mint: ${MINT_ADDRESS}`);
  const numberDecimals = await getNumberDecimals(MINT_ADDRESS);
  console.log(`    Number of Decimals: ${numberDecimals}`);

  //Step 4
  console.log(`4 - Creating and Sending Transaction`);
  const tx = new Transaction();
  tx.add(
    createTransferInstruction(
      sourceAccount.address,
      destinationAccount.address,
      FROM_KEYPAIR.publicKey,
      TRANSFER_AMOUNT * Math.pow(10, numberDecimals)
    )
  );

  const latestBlockHash = await SOLANA_CONNECTION.getLatestBlockhash(
    "confirmed"
  );
  tx.recentBlockhash = await latestBlockHash.blockhash;
  const signature = await sendAndConfirmTransaction(SOLANA_CONNECTION, tx, [
    FROM_KEYPAIR,
  ]);
  console.log(
    "\x1b[32m", //Green Text
    `   Transaction Success!🎉`,
    `\n    https://explorer.solana.com/tx/${signature}`
  );
}

sendTokens();
