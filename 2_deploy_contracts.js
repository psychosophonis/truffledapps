var greeter = artifacts.require("./greeter.sol");

module.exports = function(deployer) {
  deployer.deploy(greeter,"this is you chance to say something on the blockchain");

};
