async function main() {
  require('dotenv').config();
  const path = require('path');
  const API_URL = process.env.API_URL;
  const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
  const web3 = createAlchemyWeb3(API_URL);
  const port = process.env.PORT || 3000;
  const publicPath = path.join(__dirname, '..', 'public');
  const blockNumber = await web3.eth.getBlockNumber();
  console.log("The latest block number is " + blockNumber);
}
main();
