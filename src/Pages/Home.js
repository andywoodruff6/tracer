import { useState, useEffect } from "react";
import { StakeTable } from "../Components/StakingRewards/StakeTable";
import { BarGraph } from "../Components/StakingRewards/BarGraph";
import { epochDatePrice } from "../Assets/epoch-date-price";

export const Home = () => {
  const axios = require("axios");
  const baseURL = "https://cardano-mainnet.blockfrost.io/api/v0/";
  const [address, setAddress] = useState();
  const [stakeAddress, setStakeAddress] = useState();
  const [stakeRewards, setStakeRewards] = useState("");
  const [value, setValue] = useState([]);
  const [pool, setPool] = useState([]);
  const [ada, setAda] = useState([]);
  const [formattedDate, setFormattedDate] = useState([]);
  const [epoch, setEpoch] = useState([]);
  const [price, setPrice] = useState([]);
  const [error, setError] = useState();

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
      setError(error.message + " - Invalid Address");
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
      console.log("stakeRewards: ", results.data);
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
    }
  };
  const getFormattedDate = () => {
    for (let i = 0; i < stakeRewards.length; i++) {
      const firstRewardEpoch = stakeRewards[0].epoch - 1;
      if (i + firstRewardEpoch < epochDatePrice.length) {
        const date = new Date(
          epochDatePrice[i + firstRewardEpoch].unixDate * 1000
        );
        let formattedDate = date.toString().slice(0, 15);
        // console.log("formattedDate: ", formattedDate);
        setFormattedDate((prevState) => [...prevState, formattedDate]);
      }
    }
  };
  const getValue = () => {
    for (let i = 0; i < stakeRewards.length; i++) {
      const firstRewardEpoch = stakeRewards[0].epoch - 1;
      if (i + firstRewardEpoch < epochDatePrice.length) {
        let priceOnDateI = epochDatePrice[i + firstRewardEpoch].value;
        setPrice((prevState) => [...prevState, priceOnDateI]);
        const amount = stakeRewards[i].amount;
        const amountInAda = amount / 10 ** 6;
        let valueAda = Math.round(amountInAda * priceOnDateI * 100) / 100;
        setValue((prevState) => [...prevState, valueAda]);
      }
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
    getFormattedDate();
    getValue();
    getPoolTicker();
    getEpoch();
  }, [stakeRewards]);

  return (
    <div className="block justify-center">
      <div className="text-xl mt-20 md:mt-10 flex justify-center">
        ADA - TRACER
      </div>
      <div className="block lg:flex lg:justify-between">
        {/* Inputs */}
        <div className="p-6 md:mx-6 my-2">
          <div className="text-center">Address</div>
          <div className="flex justify-center">
            <input
              type="text"
              className="border border-sky-900 mr-4"
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <button
              className="bg-green-400 py-1 px-2 rounded"
              onClick={() => getStakeAddress(address)}
            >
              Enter
            </button>
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
            <button
              className="bg-green-400 py-1 px-2 rounded"
              onClick={() => getStakeRewards(stakeAddress)}
            >
              Enter
            </button>
          </div>
        </div>
        {/* Bar Graph */}
        <div className="pt-7">
          <BarGraph ada={ada} epoch={epoch} />
        </div>
      </div>
      {/* Error Panels */}
      {/* <div> */}
      {error === undefined ? null : (
        <div className="p-1 border-2 border-red-500 rounded-lg text-center bg-red-300 font-bold text-lg">
          {error}
        </div>
      )}
      {/* </div> */}
      {/* Viewing Panels */}
      <div className="my-4 block justify-center text-center  max-w-4xl">
        <p>Viewing information for:</p>
        <div className="bg-white border border-black max-w-lg md:max-w-4xl">
          {address !== undefined ? address : "Address"}
        </div>
        <div className="bg-white border border-black max-w-lg md:max-w-4xl">
          {stakeAddress !== undefined ? stakeAddress : "Stake Address"}
        </div>
      </div>
      {/* Display Table */}
      <div className="flex justify-center pt-4 text-xs md:text-base">
        <StakeTable
          stakeRewards={stakeRewards}
          value={value}
          price={price}
          pool={pool}
          formattedDate={formattedDate}
        />
      </div>
    </div>
  );
};
