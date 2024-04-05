require("dotenv").config();
import {
  Keypair,
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
const bs58 = require("bs58");

//Fund some SOL to another wallet
async function fundSol() {
  const connection = new Connection(process.env.RPC_URL, "confirmed");

  let secretKey = bs58.decode(process.env.BLUELINER_MASTER_WALLET_PRIVATE_KEY);

  const from = Keypair.fromSecretKey(new Uint8Array(secretKey));

  console.log("The FROM Details: ", from);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: process.env.RECEIVER_WALLET_ADDRESS,
      lamports: 6095857, // 1000000000 LAMPORTS == 1 SOL
    })
  );

  console.log("Created Transaction : ", transaction);

  // Sign transaction, broadcast, and confirm
  const signature = await sendAndConfirmTransaction(connection, transaction, [
    from,
  ]);
  console.log("SIGNATURE", signature);
}

fundSol();
