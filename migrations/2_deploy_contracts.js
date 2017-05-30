var Token = artifacts.require("./LinkToken.sol");
var ICOTest = artifacts.require("./LinkICOTest.sol");
var ICO = artifacts.require("./LinkICO.sol");

module.exports = function(deployer, network, accounts) {
	if (network == "live") {
		deployer.deploy(Token).then(function() {
        	return deployer.deploy(ICO, Token.address);
    	});
	} else {
		deployer.deploy(Token).then(function() {
        	return deployer.deploy(ICOTest, Token.address);
    	});
	}
}