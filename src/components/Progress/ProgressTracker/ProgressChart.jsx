import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ProgressChart = () => {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      // title: {
      //   display: true,
      //   text: "Chart.js Line Chart",
      // },
    },
    maintainAspectRatio: true,
    layout: {
      padding: {
        top: 0, // Adjust padding as needed
        right: 0,
        bottom: 20,
        left: 0,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Analytics and Matrics",
        data: labels.map(() => getRandomNumber(-1000, 1000)),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Product Sense",
        data: labels.map(() => getRandomNumber(-1000, 1000)),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Behavioral",
        data: labels.map(() => getRandomNumber(-1000, 1000)),
        borderColor: "rgb(53, 62, 135)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="flex-1 h-full w-full p-2">
      <Line options={options} data={data} />
    </div>
  );
};
