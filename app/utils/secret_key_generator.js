const crypto = require('crypto');
const key = crypto.randomBytes(32).toString("hex").toUpperCase();
console.log(key);

// 69AC5255C61C22ECCC5E79CD88AFA496774B7282839CEC9F2EFB958A3B1EC5AD
// D2FC16EC37A0F91E48AE2BF1398B92BDCAF0C6F62D23B1CDF52BEADEB001B522
