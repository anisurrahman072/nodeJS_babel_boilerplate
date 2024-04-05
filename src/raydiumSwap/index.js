// This file is the main file to start Raydium SWAP.
// To run this file, just move this inde.js file directly under /src directory
// Then just run yarn start

import RaydiumSwap from "./RaydiumSwap";
import { Transaction, VersionedTransaction } from "@solana/web3.js";
import "dotenv/config";
import { swapConfig } from "./swapConfig"; // Import the configuration

/**
 * Performs a token swap on the Raydium protocol.
 * Depending on the configuration, it can execute the swap or simulate it.
 */
const swap = async () => {
  /**
   * The RaydiumSwap instance for handling swaps.
   */
  const raydiumSwap = new RaydiumSwap(
    process.env.RPC_URL,
    process.env.WALLET_PRIVATE_KEY
  );
  console.log(`✅ Raydium swap initialized`);
  console.log(
    `✅ Swapping ${swapConfig.tokenAAmount} of ${swapConfig.tokenAAddress} for ${swapConfig.tokenBAddress}...`
  );

  /**
   * Load pool keys from the Raydium API to enable finding pool information.
   */
  await raydiumSwap.loadPoolKeys(swapConfig.liquidityFile);
  console.log(`✅ Loaded pool keys`);

  /**
   * Find pool information for the given token pair.
   */
  const poolInfo = raydiumSwap.findPoolInfoForTokens(
    swapConfig.tokenAAddress,
    swapConfig.tokenBAddress
  );
  console.log("✅ Found pool info");

  /**
   * Prepare the swap transaction with the given parameters.
   */
  const tx = await raydiumSwap.getSwapTransaction(
    swapConfig.tokenBAddress,
    swapConfig.tokenAAmount,
    poolInfo,
    swapConfig.maxLamports,
    swapConfig.useVersionedTransaction,
    swapConfig.direction
  );
  console.log("✅ Built Transaction : ", tx);

  /**
   * Depending on the configuration, execute or simulate the swap.
   */
  if (swapConfig.executeSwap) {
    /**
     * Send the transaction to the network and log the transaction ID.
     */
    const txid = swapConfig.useVersionedTransaction
      ? await raydiumSwap.sendVersionedTransaction(tx, swapConfig.maxRetries)
      : await raydiumSwap.sendLegacyTransaction(tx, swapConfig.maxRetries);

    console.log(
      `✅ SWAP Completed. Transaction ID: https://solscan.io/tx/${txid}`
    );
  } else {
    /**
     * Simulate the transaction and log the result.
     */
    const simRes = swapConfig.useVersionedTransaction
      ? await raydiumSwap.simulateVersionedTransaction(tx)
      : await raydiumSwap.simulateLegacyTransaction(tx);

    console.log("✅ SWAP Simulated. Response: ", simRes);
  }
};

swap();
