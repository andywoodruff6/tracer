const Blockfrost = require("@blockfrost/blockfrost-js");
require("dotenv").config();

const API = new Blockfrost.BlockFrostAPI({
  projectId: process.env.BLOCKFROST_API_KEY,
});

const main = async () => {
  console.log("Andy's Wallet Reward History");
  console.log("");

  //VARIABLES
  let rewardTotal = 0;
  const rewardHistory = await API.accountsRewards(
    process.env.ANDYS_STAKE_ADDRESS
  );
  // console.log(rewardHistory);
  const firstRewardEpoch = rewardHistory[0].epoch;
  const lastRewardEpoch = rewardHistory[rewardHistory.length - 1].epoch;

  let poolId = rewardHistory[0].pool_id;
  const firstRewardPool = await API.poolMetadata(poolId);
  const firstPoolTicker = firstRewardPool.ticker;

  poolId = rewardHistory[rewardHistory.length - 1].pool_id;
  const lastRewardPool = await API.poolMetadata(poolId);
  const lastPoolTicker = lastRewardPool.ticker;

  console.log(
    "FirstRewardEpoch was " + firstRewardEpoch + " with " + firstPoolTicker
  );
  console.log(
    "LastRewardEpoch is " + lastRewardEpoch + " with " + lastPoolTicker
  );
  console.log("----------------------------------------------------");
  console.log("");

  for (let i = 0; i < rewardHistory.length; i++) {
    const amount = Number(rewardHistory[i].amount);
    rewardTotal += amount;
  }
  rewardTotal = rewardTotal / 10 ** 6;
  console.log("Total Rewards Earned: " + rewardTotal + " Ada");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
