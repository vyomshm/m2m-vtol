const Web3 = require('web3');
const ganache = require('ganache-cli');
const credentials = require('../dummyCred.json');
const ethUtil = require('ethereumjs-util');
const { typedSignatureHash, generateMsgHash, concatSignature } = require(
  '../test/helpers/generateTypedMsgHash'
);

console.log('finished imports!....');

// const provider = new Web3.providers.HttpProvider("http://localhost:8545/");
const web3 = new Web3(ganache.provider());

console.log('finished setting up web3 with ganache....', web3.version);

console.log(`signing account : ${credentials.signer}`);

let typedMessage = [
    {
      type: 'string',
      name: 'salutation',
      value: 'Hello World!'
    },
    {
      type: 'string',
      name: 'message',
      value: 'The answer to everything!'
    },
    {
      type: 'uint256',
      name: 'value',
      value: 42
    },
]

console.log('Msg to sign => ', typedMessage);

const msgHashBuffer = typedSignatureHash(typedMessage);
const msgHash = generateMsgHash(typedMessage);
console.log(`generated message hash : ${msgHash}`);

let signature = ethUtil.ecsign(
  msgHashBuffer, 
  new Buffer(credentials.key, 'hex')
);

signature = ethUtil.bufferToHex(
  concatSignature(
    signature.v, 
    signature.r, 
    signature.s
  )
);

console.log('signature generated: ', signature);
