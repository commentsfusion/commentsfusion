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
      data: [200, 500, 300, 700, 600, 900],
      borderColor: "#9F7AEA",
      borderWidth: 2,
      fill: false,
      pointRadius: 0,
      pointHoverRadius: 6,
    },
  ],
};

export default function ConnectionsChart() {
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
        grid: { display: false },
        ticks: { display: true, padding: 0 },
      },
      y: {
        border: { display: true, color: "#444" },
        grid: { display: false },
        ticks: { display: false, padding: 0 },
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
