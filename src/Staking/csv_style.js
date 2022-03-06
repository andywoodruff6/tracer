const Blockfrost = require("@blockfrost/blockfrost-js");
const { adaPriceFeed } = require("../Assets/ada-price-feed.js");
require("dotenv").config();
let value = 0;
const API = new Blockfrost.BlockFrostAPI({
  projectId: process.env.BLOCKFROST_API_KEY,
});

const main = async () => {
  console.log(
    "///////////////////////////////////////////////////////////////////////////////"
  );
  console.log("Andy's Wallet Reward History");
  console.log("");
  console.log("This is a csv style print out that allows you to easily");
  console.log("paste the results into an excel file.");
  console.log("");
  console.log("HEADER:");
  console.log("Date,Pool,Amount,Value");
  //VARIABLES
  const rewardHistory = await API.accountsRewards(
    process.env.ANDYS_STAKE_ADDRESS
  );

  for (let i = 0; i < adaPriceFeed.length; i++) {
    adaPriceFeed[i].time_open = new Date(adaPriceFeed[i].time_open);
    const month = adaPriceFeed[i].time_open.getMonth() + 1;
    const day = adaPriceFeed[i].time_open.getDate() + 1;
    const year = adaPriceFeed[i].time_open.getFullYear();
    const date = year + "/" + month + "/" + day;
    adaPriceFeed[i].time_open = date;
    // console.log("Price Feed Date: ", adaPriceFeed[i].time_open);
  }

  for (let i = 0; i < rewardHistory.length; i++) {
    const epoch = rewardHistory[i].epoch;
    const amount = Number(rewardHistory[i].amount);
    const amountInAda = amount / 10 ** 6;

    const poolFull = rewardHistory[i].pool_id;
    const pool = await API.poolMetadata(poolFull);
    const poolTicker = pool.ticker;

    let date = new Date((await API.epochs(epoch)).start_time * 1000);
    const month = date.getMonth() + 1;
    // console.log("month ", month);
    const day = date.getDate();
    // console.log("day", day);
    const year = date.getFullYear();
    date = year + "/" + month + "/" + day;
    // console.log("date: ", date);

    for (let j = 0; j < 365; j++) {
      if (date === adaPriceFeed[j].time_open) {
        value = amountInAda * adaPriceFeed[j].price_open;
        value = Math.round(value * 100) / 100;
        // console.log("value: ", value);
      }
    }

    console.log(date + "," + poolTicker + "," + amountInAda + "," + value);
  }
};
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
