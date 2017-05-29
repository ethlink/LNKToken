pragma solidity ^0.4.8;

import 'zeppelin/ownership/Ownable.sol';        // Set specific functions for owners only
import 'zeppelin/token/ERC20.sol';              // ERC20 interface
import 'zeppelin/lifecycle/Destructible.sol';   // Used only if absolutely necessary
import 'zeppelin/lifecycle/Pausable.sol';       // This contract has Pausable functions, and may be paused
import 'rfv/Drainable.sol';                     // This contract can withdraw its ETH

/// @title Link ICO Purchase Smart Contract
/// @author Riaan F Venter~ RFVenter~ <msg@rfv.io>
contract LinkICOTest is Ownable, Destructible, Drainable {

    // test functionality ////////////////////////// ugly but works //
    //// BE VERY CAREFUL~ FOLLOW THESE STEPS EXACTLY                //
    //// 1. rename block_number to block.number                     //
    //// 2. rename now_ to now                                      //
    //// 3. remove "Test" from contract name and constructor        //
    //// 4. remove entire section                                   //
    uint public now_;                                               //
                                                                    //
    function setNow(uint _time) {                                   //
        now_ = _time;                                               //
    }                                                               //
                                                                    //
    function getNow() external constant returns (uint) {            //
        return now_;                                                //
    }                                                               //
                                                                    //
    uint block_number = 1;                                          //
                                                                    //
    function setBlockNum(uint _bn) {                                //
        block_number = _bn;                                         //
    }                                                               //
                                                                    //
    function getBlockNum() external constant returns (uint) {       //
        return block_number;                                        //
    }                                                               //
    //////////////////////////////////////////////////////////////////

    uint public endTime = 1497096000;                               // calculated closer to the start of the ICO
    uint public price = 2121458081e8;                               // wei price for one LNK Token 0.2121458081

    ERC20 private token;                                            // the LNK Token
    address public tokenAddress;                                    // the address of the LNK Token

    event NewTokenPurchase(address _contributor, uint _amountETH, uint _amountTokens);

    /// @notice Initial setup of the ICO Contract.
    /// @param _token The address of the LNK Token
    function LinkICOTest(
        address _token) 
    {
        
        token = ERC20(_token);
        tokenAddress = _token;
    }

    /// @notice When sending ETH to this Smart Contract, automatically invoke purchaseTokens()
    function () payable { depositETH(); }

    /// @notice Used to buy LNK Tokens with ETH
    function depositETH() 
        payable
    {

        if (now_ >= endTime) throw;                             // the ICO contract only works until the ICO end time

        var tokenAmount = msg.value * 1e18 / price;             // calculate how many tokens to allocate

        token.transferFrom(owner, msg.sender, tokenAmount);     // allocate thos tokens
        NewTokenPurchase(msg.sender, msg.value, tokenAmount);   // send a public message out on the network
    }
}

