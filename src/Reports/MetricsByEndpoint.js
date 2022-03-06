const Blockfrost = require("@blockfrost/blockfrost-js");
require("dotenv").config();

const API = new Blockfrost.BlockFrostAPI({
  projectId: process.env.BLOCKFROST_API_KEY,
});

const usage = async () => {
  let metrics = await API.metricsEndpoints();
  /////////////////////////////////////////////////////////////////////
  for (let i = 0; i < metrics.length; i++) {
    const a = new Date(metrics[i].time * 1000).toString();
    const formatted = a.split("T")[0];

    const calls = metrics[i].calls;
    const endpoint = metrics[i].endpoint;
    console.log("---------------------------------------");
    console.log("Date: ", formatted);
    console.log("Number of Calls: ", calls);
    console.log("Endpoint: ", endpoint);
  }
};

usage();
