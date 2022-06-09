const WarpToken = artifacts.require("WarpToken");

module.exports = function (deployer) {
  deployer.deploy(WarpToken);
};
