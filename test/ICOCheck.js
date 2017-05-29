var Token = artifacts.require("./LinkToken.sol");
var Purchase = artifacts.require("./LinkICOTest.sol");
const assertJump = require('./helpers/assertJump');


contract('Token Setup|', function(accounts) {
	const owner1  = accounts[0];
	const owner2  = accounts[1];
	const spender = accounts[2];
	const buyer1  = accounts[3];
	const buyer2  = accounts[4];
	const buyer3  = accounts[5];

	let token;
	let purchase;
	let number;

	before(async () => {
	  token = await Token.deployed();
	  purchase = await Purchase.deployed();
	});

	it('owner should be correct', async () => {
	  assert.equal(await token.totalSupply.call(), 60000000000000000000000, "supply should be 60000000000000000000000");
	  number = await token.balanceOf.call(owner1);
	  assert.equal(number.toNumber(), 60000000000000000000000, "owner1 should have 60000000000000000000000");
	  number = await token.balanceOf.call(owner1)
	  assert.equal(number.toNumber(), 60000000000000000000000, "owner1 should have 60000000000000000000000");

	  await token.allow(owner2, spender, 4200000000000000000000, {from: owner1});
	  await token.allow(owner2, purchase.address, 55000000000000000000000, {from: owner1});
	  await token.transfer(owner2, 60000000000000000000000, {from: owner1});
	  await token.transferOwnership(owner2, {from: owner1});
	  assert.equal(await token.owner.call(), owner2, "token owner should be owner2");
	  await purchase.transferOwnership(owner2, {from: owner1});
	  assert.equal(await purchase.owner.call(), owner2, "purchase owner should be owner2");

	  number = await token.balanceOf.call(owner2);
	  assert.equal(number.toNumber(), 60000000000000000000000, "owner2 should now have 60000000000000000000000");
	  number = await token.balanceOf.call(owner1);
	  assert.equal(number.toNumber(), 0, "owner1 should have nothing");
	  number = await token.allowance.call(owner2, spender);
	  assert.equal(number.toNumber(), 4200000000000000000000, "spender should have 4200000000000000000000");

	  await purchase.setNow(1496047594);
	  number = await purchase.getNow.call();
	  assert.equal(number.toNumber(), 1496047594);

	  number = await token.allowance.call(owner2, purchase.address);
	  assert.equal(number.toNumber(), 55000000000000000000000, "purchase should have 55000000000000000000000 availible");
	  

	  await web3.eth.sendTransaction( { from: buyer1, to: purchase.address, value: 1000000000000000000, gas: 2000000 });
	  number = await token.balanceOf.call(buyer1);
	  assert.equal(number.toNumber(), 4713739144582230375, "buyer1 should have 4713739144582230375");

	  await web3.eth.sendTransaction( { from: buyer2, to: purchase.address, value: 600000000000000000, gas: 2000000 });
	  number = await token.balanceOf.call(buyer2);
	  assert.equal(number.toNumber(), 2828243486749338225, "buyer2 should have 2828243486749338225");

	  await web3.eth.sendTransaction( { from: buyer3, to: purchase.address, value: 350000000000000000, gas: 2000000 });
	  number = await token.balanceOf.call(buyer3);
	  assert.equal(number.toNumber(), 1649808700603780631, "buyer3 should have 1649808700603780631");

	  await web3.eth.sendTransaction( { from: buyer1, to: purchase.address, value: 11100000000000000000, gas: 2000000 });
	  number = await token.balanceOf.call(buyer1);
	  assert.equal(number.toNumber(), 57036243649444987547, "buyer1 should have 57036243649444987547");
	  
	  number = await web3.eth.getBalance(purchase.address);
	  assert.equal(number.toNumber(), 13050000000000000000, "purchase should have 13050000000000000000");

	  var preBal = await web3.eth.getBalance(owner2);
	  await purchase.withdrawETH({from: owner2});
	  assert.isAbove(await web3.eth.getBalance(owner2), preBal + 13040000000000000000), 'should be slightly less then 113050000000000000000 because of gas'
	})	
})
