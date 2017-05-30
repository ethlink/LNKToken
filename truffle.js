require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    live: {
      host: "localhost",
      port: 8545,
      network_id: "1",
      from: "0x123456793b94455b0371f1e21b62c766f3a659d8",
      gas: 3000000
    },
  }
};
