//Imports go up here
import {} from "dotenv";
import { useState } from "react";
import axios from "axios";
import StakeTable from "../components/StakeTable";

// Everything else goes down there \/
const Cardano = () => {
  // State Variables -----------------------------
  const [inputAddress, setInputAddress] = useState("");
  const [error, setError] = useState("");
  const [stakeRewards, setStakeRewards] = useState([]);
  // Functions -------------------------------------
  // -----------------------------------------------
  const cleanAndCheckRewards = (a: string) => {
    // Clean the input string
    const cleanedAddress = clean(a);

    //Evaluate which blockchain the input string is from.
    if (cleanedAddress.charAt(0) === "a") {
      // Standard Cardano Address
      getStakeAddress(cleanedAddress);
    } else if (cleanedAddress.charAt(0) === "s") {
      // Staking Cardano Address
      getStakeRewards(cleanedAddress);
    } else {
      // Incorrect Cardano Address
      setError("Invalid Cardano Address");
      console.error("Invalid Cardano Address");
    }
  };
  const clean = (a: string) => {
    return a.toLowerCase();
  };
  const getStakeAddress = async (cleanedAddress: string) => {
    try {
      const url =
        "https://cardano-mainnet.blockfrost.io/api/v0/addresses/" +
        cleanedAddress.toString();
      const response = await axios({
        method: "get",
        url: url,
        headers: {
          project_id: import.meta.env.VITE_BLOCKFROST_API_KEY,
        },
      });
      const stakeAddress: string = response.data.stake_address;
      getStakeRewards(stakeAddress);
      // console.log("Stake address:", stakeAddress);
      // getStakeRewards(stakeAddress);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("getStakeAddress error: ", err);
      } else {
        console.log("Unexpected Error:", err);
      }
    }
  };
  const getStakeRewards = async (stakeAddress: string) => {
    console.log("getStakeRewards:", stakeAddress);
    // build url
    const url =
      "https://cardano-mainnet.blockfrost.io/api/v0/accounts/" +
      `${stakeAddress}` +
      "/rewards";
    // try catch the api call
    try {
      const results = await axios({
        method: "get",
        url: url,
        headers: {
          project_id: import.meta.env.VITE_BLOCKFROST_API_KEY,
        },
      });
      console.log("stakeRewards: ", results.data);
      setStakeRewards(results.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("getStakeAddress error: ", err);
      } else {
        console.log("Unexpected Error:", err);
      }
    }
  };

  //-----------------------------------------------
  return (
    <div className="cardano">
      {/* Add Error Ternary Here */}
      <div>{error !== "" ? <div className="error">{error}</div> : null}</div>
      <p>Cardano</p>
      <input
        type="text"
        className="cardanoAddress"
        placeholder="Address or Staking Address"
        onChange={(e) => setInputAddress(e.target.value)}
      />
      <button
        className="button"
        onClick={() => cleanAndCheckRewards(inputAddress)}
      >
        Enter
      </button>
      <StakeTable stakeRewards={stakeRewards} />
    </div>
  );
};
export default Cardano;
