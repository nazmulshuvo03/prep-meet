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
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { convertISOUTCDayTimeToLocalDayTime } from "../../../utils/timeDate";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const ProgressChart = ({ data }) => {
  const [chartData, setChartData] = useState();

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

  const borderColors = [
    "rgb(255, 99, 132)",
    "rgb(53, 162, 235)",
    "rgb(53, 62, 135)",
    "rgb(53, 162, 135)",
  ];

  const backgroundColors = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(53, 162, 235, 0.5)",
    "rgba(53, 62, 135, 0.5)",
    "rgba(53, 162, 135, 0.5)",
  ];

  useEffect(() => {
    if (data && data.length) {
      let labels = [];
      let datasets = [];
      for (let i = 0; i < data.length; i++) {
        let dataObj = {
          label: data[i].name,
          data: [],
          borderColor: borderColors[i],
          backgroundColor: backgroundColors[i],
        };
        for (let note of data[i].notes) {
          if (!labels.includes(note.meeting.dayHourUTC)) {
            labels.push(
              convertISOUTCDayTimeToLocalDayTime(note.meeting.dayHourUTC)
                .dateMonthView
            );
          }
          dataObj.data.push(note.points);
        }
        datasets.push(dataObj);
      }
      setChartData({
        labels,
        datasets,
      });
    }
  }, [data]);

  return (
    <div className="flex-1 h-96 md:h-full w-full p-2">
      {chartData && <Line options={options} data={chartData} />}
    </div>
  );
};
