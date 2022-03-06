const Blockfrost = require("@blockfrost/blockfrost-js");
const { adaPriceFeed } = require("../Assets/ada-price-feed.js");
require("dotenv").config();
let dateIndex = 4;
let value = 0;
const API = new Blockfrost.BlockFrostAPI({
  projectId: process.env.BLOCKFROST_API_KEY,
});

const main = async () => {
  console.log("Andy's Wallet Reward History");
  console.log("");

  //VARIABLES
  const rewardHistory = await API.accountsRewards(
    process.env.ANDYS_STAKE_ADDRESS
  );

  for (let i = 0; i < adaPriceFeed.length; i++) {
    adaPriceFeed[i].time_open = new Date(adaPriceFeed[i].time_open);
    adaPriceFeed[i].time_open = adaPriceFeed[i].time_open
      .toString()
      .slice(0, 10);
  }

  for (let i = 0; i < rewardHistory.length; i++) {
    const epoch = rewardHistory[i].epoch;
    const amount = Number(rewardHistory[i].amount);
    const amountInAda = amount / 10 ** 6;

    const poolFull = rewardHistory[i].pool_id;
    const pool = await API.poolMetadata(poolFull);
    const poolTicker = pool.ticker;

    const date = new Date((await API.epochs(epoch)).start_time * 1000);
    let formattedDate = date.toString().slice(0, 10);

    for (let j = 0; j < 365; j++) {
      if (formattedDate === adaPriceFeed[j].time_open) {
        value = amountInAda * adaPriceFeed[j].price_open;
        value = Math.round(value * 100) / 100;
      }
    }

    console.log(
      "Rewarded: " +
        amountInAda +
        " Ada on " +
        formattedDate +
        " from pool: " +
        poolTicker +
        " valued at: " +
        value
    );
  }
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
