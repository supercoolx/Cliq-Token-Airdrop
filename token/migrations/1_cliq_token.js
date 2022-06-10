const CliqToken = artifacts.require("CliqToken");

module.exports = function (deployer) {
  deployer.deploy(CliqToken);
};
