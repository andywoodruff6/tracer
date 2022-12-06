//Imports go up here
import {} from "dotenv";
import { useState } from "react";
import axios from "axios";

// Everything else goes down there \/
const Cardano = () => {
  // State Variables -----------------------------
  const [inputAddress, setInputAddress] = useState("");
  const [error, setError] = useState("");
  const [stakeAddress, setStakeAddress] = useState("");
  // Functions -------------------------------------
  // -----------------------------------------------
  const cleanAndCheckRewards = (a: string) => {
    // Clean the input string
    const cleanedAddress = clean(a);

    //Evaluate which blockchain the input string is from.
    if (cleanedAddress.charAt(0) === "a") {
      // Standard Cardano Address
      getStakeAddress(cleanedAddress);
      // getStakeRewards();
    } else if (cleanedAddress.charAt(0) === "s") {
      // Staking Cardano Address
      // getStakeRewards();
    } else {
      // Incorrect Cardano Address
      setError("Invalid Cardano Address");
      console.error("Invalid Cardano Address");
    }

    console.log(cleanedAddress, "Hello form clean and check");
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
          project_id: process.env.BLOCKFROST_API_KEY,
        },
      });
      const stakeAddress = response.data.stake_address;
      setStakeAddress(stakeAddress);
      console.log("Stake address:", stakeAddress);
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
    </div>
  );
};
export default Cardano;
