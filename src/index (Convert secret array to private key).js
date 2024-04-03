const bs58 = require("bs58");
let privkey = new Uint8Array([114, 208, 45, 879, 234]); // Replace the secret array here
console.log(bs58.encode(privkey));
