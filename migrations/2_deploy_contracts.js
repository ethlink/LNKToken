var Token = artifacts.require("./LinkToken.sol");
var ICO = artifacts.require("./LinkICOTest.sol");

module.exports = function(deployer, network, accounts) {
    deployer.deploy(Token).then(function() {
        return deployer.deploy(ICO, Token.address);
    });
}