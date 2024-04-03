//////// BUY function (Swap "SOL" & get "WHALE")
// export const swapConfig = {
//   executeSwap: true, // Send tx when true, simulate tx when false
//   useVersionedTransaction: true,
//   tokenAAmount: 0.00001, // Swap 0.00001 SOL for WHALE in this example
//   tokenAAddress: "So11111111111111111111111111111111111111112", // Token to swap for the other, SOL in this case
//   tokenBAddress: "kub2QX17qMx6jLuyG5gR4kSmmbiRtvUHt4gxqNd4wZBx", // WHALE address (User will receive WHALE in his account)
//   maxLamports: 1500000, // Micro lamports for priority fee
//   direction: "in", // Swap direction: 'in' or 'out'
//   liquidityFile: "https://api.raydium.io/v2/sdk/liquidity/mainnet.json",
//   maxRetries: 20,
// };

///////// SELL function (SWAP "WHALE" & get "SOL")
export const swapConfig = {
  executeSwap: true, // Send tx when true, simulate tx when false
  useVersionedTransaction: true,
  tokenAAmount: 0.1, // Swap 0.1 WHALE for SOL in this example (User will receive SOL in his account)
  tokenAAddress: "kub2QX17qMx6jLuyG5gR4kSmmbiRtvUHt4gxqNd4wZBx", // Token to swap for the other, WHALE in this case
  tokenBAddress: "So11111111111111111111111111111111111111112", // SOL address (User will receive SOL in his account)
  maxLamports: 1500000, // Micro lamports for priority fee
  direction: "in", // Swap direction: 'in' or 'out'
  liquidityFile: "https://api.raydium.io/v2/sdk/liquidity/mainnet.json",
  maxRetries: 20,
};
