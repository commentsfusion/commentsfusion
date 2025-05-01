import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const rawData = [
  { month: "Jan", value: 15 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 18 },
  { month: "Apr", value: 30 },
  { month: "May", value: 22 },
  { month: "Jun", value: 35 },
];

export default function CommentsBarChart() {
  const data = {
    labels: rawData.map((d) => d.month),
    datasets: [
      {
        data: rawData.map((d) => d.value),

        // 1) Use a function so Chart.js will pass you the context,
        //    and you can create a gradient that spans the chartArea
        backgroundColor: (ctx) => {
          const chart = ctx.chart;
          const { ctx: c, chartArea } = chart;

          // chartArea might be undefined on initial render
          if (!chartArea) {
            return null;
          }

          // Create a vertical gradient from bottom → top
          const grad = c.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          grad.addColorStop(0, "#33C6F4"); // bottom color
          grad.addColorStop(1, "#2D578F"); // top color
          return grad;
        },

        // 2) Fix the bar width: you can also set these in options.scales.x
        barThickness: 20, // exact pixel width
        // OR (for relative sizing):
        // barPercentage: 0.5,      // each bar is 50% of the category width
        // categoryPercentage: 0.6, // each category gets 60% of the x-axis space
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: { top: 10, right: 10, bottom: 10, left: 10 },
    },

    scales: {
      x: {
        type: "category",
        offset: true,
        position: "bottom",
        border: { display: true, color: "#444" },
        grid: { display: false },
        ticks: { display: true, padding: 0 },

        categoryPercentage: 0.1,
        barPercentage: 0.9,
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
      <Bar
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
