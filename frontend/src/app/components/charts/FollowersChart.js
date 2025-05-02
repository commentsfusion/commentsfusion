import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [400, 800, 600, 1200, 900, 1400],
      borderColor: "#33C6F4",
      borderWidth: 2,
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
  ],
};

export default function FollowersChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
    },

    scales: {
      x: {
        type: "category",
        offset: false,
        position: "bottom",
        border: { display: true, color: "#444" },
        ticks: { display: true, padding: 0 },
        grid: { display: false },
      },
      y: {
        border: { display: true, color: "#444" },
        ticks: { display: false, padding: 0 },
        grid: { display: false },
      },
    },

    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 6,
        position: "nearest",
        intersect: false,
      },
    },

    animation: {
      duration: 1000,
      easing: "easeInOutQuart",
    },
  };

  return (
    <div className="h-48 w-full">
      <Line
        data={data}
        options={options}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
