import { Bar } from "react-chartjs-2";
// import { Chart } from "chart.js/";
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
  const options = {
    plugins: {
      title: { display: true, text: "Cool" },
    },
  };

  // const barChart = new Chart("barChart", {
  //   type: "bar",
  //   data: data,
  //   options: options,
  // });

  //   useEffect(() => {
  //     setTimeout(update, 1000);
  //     console.log("ada: ", ada);
  //   }, [ada]);
  return (
    <div className="w-[600px] border border-red-500">
      {epoch.length >= 1 ? (
        <Bar data={data} options={options} redraw={true} />
      ) : (
        // <canvas id="barChart" width="500" height="400"></canvas>
        <div className="text-center pt-20 ">
          Bar Chart Displays After an Address is Selected
        </div>
      )}
    </div>
  );
};
