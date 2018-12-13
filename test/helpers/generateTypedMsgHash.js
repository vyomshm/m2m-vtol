const ethAbi = require('ethereumjs-abi');
const ethUtil = require('ethereumjs-util');

function typedSignatureHash(typedData){
	const error = new Error("Expect argument to be a non-empty array");

	if(typeof typedData !== 'object' || !typedData.length) throw error;

	const data = typedData.map((e) => {
		return e.type === 'bytes' ? ethUtil.toBuffer(e.value) : e.value;
	});
	const types = typedData.map((e) => { return e.type });
	const schema = typedData.map((e)=>{
		if(!e.name) throw error;
		return e.type + ' ' + e.name;
	});

	return ethAbi.soliditySHA3(
		['bytes32', 'bytes32'],
		[
			ethAbi.soliditySHA3(new Array(typedData.length).fill('string'), schema),
			ethAbi.soliditySHA3(types, data)
		]
	);
}

// to-do - replace with EIP-712 implementation for signed data
function generateMsgHash(typedMessage){
	const msgHash = typedSignatureHash(typedMessage);
	return ethUtil.bufferToHex(msgHash);
}

function concatSignature(v, r, s) {
	const rSig = ethUtil.fromSigned(r);
	const sSig = ethUtil.fromSigned(s);
	const vSig = ethUtil.fromSigned(v);
	const rStr = padWithZeroes(ethUtil.toUnsigned(rSig).toString('hex'), 64);
	const sStr = padWithZeroes(ethUtil.toUnsigned(sSig).toString('hex'), 64);
	const vStr = ethUtil.stripHexPrefix(ethUtil.intToHex(vSig));
	return ethUtil.addHexPrefix(rStr.concat(sStr, vStr)).toString('hex');
}

function padWithZeroes(number, length) {
	let myString = '' + number;
	while(myString.length < length) {
		myString = '0' + myString;
	}
	return myString;
}

module.exports = {
	typedSignatureHash,
	generateMsgHash,
	concatSignature
}