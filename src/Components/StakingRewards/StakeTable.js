import { useEffect } from "react";
import { epochDatePrice } from "../../Assets/epoch-date-price";
export const StakeTable = ({ stakeRewards, value, pool, formattedDate }) => {
  const plotTable = Object.keys(stakeRewards).map((key) => (
    <tr key={key}>
      <td className="border border-black p-1 text-center">
        {stakeRewards[key].epoch}
      </td>
      <td className="border border-black p-1 text-center">
        {formattedDate[key]}
      </td>
      <td className="border border-black p-1 text-center">
        {stakeRewards[key].amount}
      </td>
      <td className="border border-black p-1 text-center">
        {epochDatePrice[key].value}
      </td>
      <td className="border border-black p-1 text-center">{value[key]}</td>
      <td className="border border-black p-1 text-center">{pool[key]}</td>
    </tr>
  ));
  return (
    <div className="border border-red-500">
      <table className="table-fixed border border-collapse">
        <thead>
          <tr>
            <th className="border border-black p-1">Epoch</th>
            <th className="border border-black p-1">Date</th>
            <th className="border border-black p-1 px-6">Amount (Lovelace)</th>
            <th className="border border-black p-1">Price / Coin</th>
            <th className="border border-black p-1">Value (USD)</th>
            <th className="border border-black p-1">Pool Ticker</th>
          </tr>
        </thead>
        <tbody>plotTable</tbody>
      </table>
    </div>
  );
};
