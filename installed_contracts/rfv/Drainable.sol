pragma solidity ^0.4.8;

import 'zeppelin/ownership/Ownable.sol';        // set specific function for owner only

/*
 * WhiteStar - The opposite of a black hole
 * Enables a contract to transfer ETH to owner
 */
contract Drainable is Ownable {

  /// @notice A contract MAY not be meant to receive ETH, but in the case where it does receive ETH, this function will enable transfer of all ETH to owner
  /// @return True if successful
  function withdrawETH() payable onlyOwner returns (bool) {
      return owner.send(this.balance);
  }

}