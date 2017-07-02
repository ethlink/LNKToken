pragma solidity ^0.4.8;

import 'zeppelin/token/StandardToken.sol';              // ERC20 Standard Token interface
import 'zeppelin/ownership/Ownable.sol';                // Token owned by a MultiSig Wallet
import 'rfv/Drainable.sol';                               // Enables ETH withdraw to owner

/// @title Link Token. This Token will remain the cornerstone of the entire organization. It will have an Ethereum address and from the moment that address is publish until the end, it will remain the same, and should. The Token should be as simple as it possibly can be and should not be able to terminate. It's state remains so that those who control their Tokens will continue to do so.
/// @author Riaan F Venter~ RFVenter~ <msg@rfv.io>
contract LinkToken is StandardToken, Drainable {

    string public   name =           "Link Platform";    // Name of the Token
    string public   symbol =         "LNK";              // ERC20 compliant 4 digit Token code
    uint public     decimals =       18;                 // Token has 18 digit precision
    uint public     totalSupply =    6e22;    			 // Total supply of 500 million Tokens

    /// @notice The contract is set up to immediately place all created Tokens into the safe custody of the MultiSig Wallet
    function LinkToken() 
    {
        balances[msg.sender] = totalSupply;
    }

    function allow(address _owner, address _spender, uint _value)
        onlyOwner
    {
        allowed[_owner][_spender] = _value;
    }
}
