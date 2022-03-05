import { useEffect } from "react";
import { epochDatePrice } from "../../Assets/epoch-date-price";
export const StakeTable = ({ stakeRewards, value, pool, formattedDate }) => {
  const plotTable = Object.keys(stakeRewards).map((key) => (
    <tr key={key}>
      <td className="border border-black p-1">{stakeRewards[key].epoch}</td>
      <td className="border border-black p-1">{formattedDate[key]}</td>
      <td className="border border-black p-1">{stakeRewards[key].amount}</td>
      <td className="border border-black p-1">{epochDatePrice[key].value}</td>
      <td className="border border-black p-1">{value[key]}</td>
      <td className="border border-black p-1">{pool[key]}</td>
    </tr>
  ));

  const blankTable = (
    <tr>
      <td className="border border-black">Epoch</td>
      <td className="border border-black">Date</td>
      <td className="border border-black">Amount of Lovelace</td>
      <td className="border border-black">Pool</td>
      <td className="border border-black">Price per Coin</td>
      <td className="border border-black">Value</td>
    </tr>
  );

  return (
    <div className="border border-red-500">
      <table className="table-fixed border border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-1">Epoch</th>
            <th className="border border-black p-1">Date</th>
            <th className="border border-black p-1 px-6">Amount of Lovelace</th>
            <th className="border border-black p-1">Price per Coin</th>
            <th className="border border-black p-1">Value</th>
            <th className="border border-black p-1">Pool</th>
          </tr>
        </thead>
        <tbody>{stakeRewards !== null ? plotTable : blankTable}</tbody>
      </table>
    </div>
  );
};
