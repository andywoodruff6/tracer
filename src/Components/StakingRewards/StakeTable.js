// import { epochDatePrice } from "../../Assets/epoch-date-price";
export const StakeTable = ({
  stakeRewards,
  value,
  pool,
  formattedDate,
  price,
}) => {
  //  const firstRewardEpoch = stakeRewards[0].epoch - 1;
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
      <td className="border border-black p-1 text-center">{price[key]}</td>
      <td className="border border-black p-1 text-center">{value[key]}</td>
      <td className="border border-black p-1 text-center">{pool[key]}</td>
    </tr>
  ));
  return (
    <table className="table-fixed border border-collapse max-w-lg md:max-w-4xl">
      <thead>
        <tr>
          <th className="border border-black p-1">Epoch</th>
          <th className="border border-black p-1">Date</th>
          <th className="border border-black p-1 md:px-6">Amount (Lovelace)</th>
          <th className="border border-black p-1">Price / Coin</th>
          <th className="border border-black p-1">Value (USD)</th>
          <th className="border border-black p-1">Pool Ticker</th>
        </tr>
      </thead>
      <tbody>{plotTable}</tbody>
    </table>
  );
};
