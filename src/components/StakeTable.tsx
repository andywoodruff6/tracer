import React from "react";

interface StakeTableData {
  amount: string;
  epoch: number;
  pool_id: string;
}
interface StakeTableProps {
  stakeRewards?: StakeTableData[];
}

const StakeTable: React.FC<StakeTableProps> = (stakeRewards) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="tableHeader">Epoch</th>
          <th className="tableHeader">Date</th>
          <th className="tableHeader">Amount (Lovelace)</th>
          <th className="tableHeader">Price / Coin</th>
          <th className="tableHeader">Value (USD)</th>
          <th className="tableHeader">Pool Ticker</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default StakeTable;
