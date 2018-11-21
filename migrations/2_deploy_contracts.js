var M2MMicroPayments = artifacts.require('./M2MMicroPayments.sol');

module.exports = function(deployer) {
  deployer.deploy(M2MMicroPayments, 500, []);
};