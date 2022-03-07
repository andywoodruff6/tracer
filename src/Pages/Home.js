import { useState, useEffect } from "react";
import { StakeTable } from "../Components/StakingRewards/StakeTable";
import { BarGraph } from "../Components/StakingRewards/BarGraph";
import { epochDatePrice } from "../Assets/epoch-date-price";

export const Home = () => {
  const axios = require("axios");
  const baseURL = "https://cardano-mainnet.blockfrost.io/api/v0/";
  const [address, setAddress] = useState();
  const [stakeAddress, setStakeAddress] = useState();
  const [stakeRewards, setStakeRewards] = useState('');
  const [value, setValue] = useState([]);
  const [pool, setPool] = useState([]);
  const [ada, setAda] = useState([]);
  const [formattedDate, setFormattedDate] = useState([]);
  const [epoch, setEpoch] = useState([]);

  const getStakeAddress = async (address) => {
    try {
      const levelOne = "addresses/";
      const url = baseURL + levelOne + address.toString();
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          project_id: process.env.REACT_APP_BLOCKFROST_API_KEY,
        },
      });
      const stakeAddress = response.data.stake_address;
      setStakeAddress(stakeAddress);
      getStakeRewards(stakeAddress);
    } catch (error) {
      console.log("getStakeAddress error: ", error);
    }
  };
  const getStakeRewards = async (stakingAddress) => {
    const levelOne = "accounts/";
    const address = stakingAddress;
    const levelThree = "/rewards";
    const url = baseURL + levelOne + address + levelThree;
    try {
      const results = await axios({
        method: "get",
        url: url,
        headers: {
          project_id: process.env.REACT_APP_BLOCKFROST_API_KEY,
        },
      });
      setStakeRewards(results.data);
    } catch (error) {
      console.log("getStakeRewards error: ", error);
    }
  };
  const data = async () => {
    for (let i = 0; i < stakeRewards.length; i++) {
      const amount = stakeRewards[i].amount;
      const amountInAda = amount / 10 ** 6;
      setAda((prevState) => [...prevState, amountInAda]);
      const date = new Date(epochDatePrice[i].unixDate * 1000);
      let formattedDate = date.toString().slice(0, 10);
      setFormattedDate((prevState) => [...prevState, formattedDate]);
      let priceOnDateI = epochDatePrice[i].value;
      let valueAda = Math.round(amountInAda * priceOnDateI * 100) / 100;
      setValue((prevState) => [...prevState, valueAda]);
    }
  };
  const getPoolTicker = async () => {
    let poolResults;
    let poolTicker;
    for (let i = 1; i < stakeRewards.length; i++) {
      if (i === 1 || stakeRewards[i].pool !== stakeRewards[i - 1].pool) {
        const poolFull = stakeRewards[i - 1].pool_id;
        let url = baseURL + "pools/" + poolFull.toString() + "/metadata";
        try {
          poolResults = await axios({
            method: "get",
            url: url,
            headers: {
              project_id: process.env.REACT_APP_BLOCKFROST_API_KEY,
            },
          });
          poolTicker = poolResults.data.ticker;
          setPool((pool) => [...pool, poolTicker]);
        } catch (e) {
          console.log("poolResults error: ", e);
        }
      } else {
        setPool((pool) => [...pool, poolTicker]);
      }
    }
  };
  const getEpoch = async () => {
    for (let i = 0; i < stakeRewards.length; i++) {
      const a = stakeRewards[i].epoch;
      setEpoch((prevState) => [...prevState, a]);
    }
  };

  useEffect(() => {
    data();
    getPoolTicker();
    getEpoch();
  }, [stakeRewards]);

  return (
    <div className="block justify-center">
      <div className="text-xl mt-10 border border-red-500 flex justify-center">
        ADA - TRACER
      </div>
      <div className="block lg:flex lg:justify-between">
        {/* Inputs */}
        <div className="border border-red-500 p-6 mx-6 my-2">
          <div className="text-center">Address</div>
          <div className="flex justify-center">
            <input
              type="text"
              className="border border-sky-900 mr-4"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={() => getStakeAddress(address)}>Enter</button>
          </div>
          <div className="text-center">or</div>
          <div className="text-center">Stake Address</div>
          <div className="flex justify-center">
            <input
              type="text"
              className="border border-sky-900 mr-4"
              placeholder="Stake Address"
              onChange={(e) => setStakeAddress(e.target.value)}
            />
            <button onClick={() => getStakeRewards(stakeAddress)}>Enter</button>
          </div>
        </div>
        {/* Bar Graph */}
        <BarGraph ada={ada} epoch={epoch} />
      </div>
      {/* Viewing Panels */}
      <div className="block justify-center text-center max-w-4xl ">
        <p>Viewing information for:</p>
        <div className="bg-white border border-black">
          {address !== undefined ? address : "Address"}
        </div>
        <div className="bg-white border border-black">
          {stakeAddress !== undefined ? stakeAddress : "Stake Address"}
        </div>
      </div>
      {/* Display Table */}
      <div className="flex justify-center pt-4">
        <StakeTable
          stakeRewards={stakeRewards}
          value={value}
          pool={pool}
          formattedDate={formattedDate}
        />
      </div>
    </div>
  );
};
