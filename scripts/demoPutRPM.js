const request = require('request')

const { generateBalanceProof, generateClosingProof } = require('../test/helpers/proofGenerator.js');

let balanceProof = generateBalanceProof(
  "0xca35b7d915458ef540ade6068dfe2f44e8fa733c",
  1500045,
  200000000,
  "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c"
);
console.log("Generated Balance proof: ", balanceProof);

request.post('http://127.0.0.1:8080/pay', {
  json: {
    proof: balanceProof,
    rpm: 100
  }
}, (error, res, body) => {
  if (error) {
    console.error(error)
    return
  }
  console.log(`statusCode: ${res.statusCode}`)
  console.log(body)
})
