const { 
	typedSignatureHash, 
	generateMsgHash, 
	concatSignature 
} = require('./generateTypedMsgHash.js');
const credentials = require('../../dummyCred.json');
const ethUtil = require('ethereumjs-util');

function generateBalanceProof(receiver, openBlockNumber, balance, contractAddr){
	let proof = [
		{
	      	type: 'string',
	      	name: 'msg_id',
	      	value: 'Sender balance proof signature'
	    },
	    {
	    	type: 'address',
	    	name: 'receiver',
	    	value: receiver
	    },
	    {
	    	type: 'uint256',
	    	name: 'openBlockNumber',
	    	value: openBlockNumber
	    },
	    {
	    	type: 'uint256',
	    	name: 'balance',
	    	value: balance
	    },
	    {
	    	type: 'address',
	    	name: 'contractAddress',
	    	value: contractAddr
	    }
	]

	const msgHashBuffer = typedSignatureHash(proof);
	const msgHash = generateMsgHash(proof);
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
	console.log(signature);

	return signature;
}

function generateClosingProof(){
	return '0xtODO';
}

module.exports = {
	generateBalanceProof,
	generateClosingProof
}