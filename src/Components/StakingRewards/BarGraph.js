import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export const BarGraph = ({ ada, epoch }) => {
  const data = {
    labels: epoch,
    datasets: [
      {
        label: "Staking Rewards per Epoch in 2021",
        backgroundColor: "rgba(255,99,0,0.8)",
        borderColor: "rgba(255,99,0,1)",
        data: ada,
      },
    ],
  };
  return (
    <div className="w-[600px]">
      {epoch.length >= 1 ? (
        <Bar data={data} />
      ) : (
        <div className="text-center pt-20 ">
          Bar Chart Displays After an Address is Selected
        </div>
      )}
    </div>
  );
};
