# EIP712 compliant Offchain workflow

2 types of proof signatures - 

- `Balance Sroof Signature`
- `Channel Close Signature`

## Balance proof signature

Structure for proofs of offchain m2m micropayments -

```
{
	message_id : "Sender balance proof signature",
	receiver: "0xjdsjfsf....",
	open_block_number: 423512385,
	balance: 100000,
	contract_address: "0xa57sdbsbd..."
}
```
 
## Closing Signature

Structure for a receiver's signature for closing a channel

```
{
	message_id : "Receiver closing signature",
	sender: "0xjdsjfsf....",
	open_block_number: 423512385,
	balance: 100000,
	contract_address: "0xa57sdbsbd..."
}
```