pragma solidity ^0.4.24;

import "truffle/Assert.sol";
import { ECDSA } from "../contracts/cryptography/ECDSA.sol";

contract TestECDSA{
    
    function testSignatureRecovery() public{
        bytes32 hash = hex"ce25dc105e64bc83fc81e446ab65b73b31b33585e89468dc6a22d279ddf8cf8e";
        address recovered = ECDSA.recover(
          hash, 
          hex"6982a71ea85ab6638223e2f210444301f3bf8236e8e38831b790290812dd346c1c648e147678232ece9e6ba6ec7fde6c81607f0b067be9f24e0165c2242f559f1b"
        );
        Assert.equal(recovered, address(0xdc9ABB31Ee76D55d8722C610A658016E07577d30), "not recovered!");
    }
}
