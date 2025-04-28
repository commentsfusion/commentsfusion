import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ScatterController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js'

ChartJS.register(
  ScatterController,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip
)

const rawData = [
  { month: 'Jan', value: 15 },
  { month: 'Feb', value: 25 },
  { month: 'Mar', value: 18 },
  { month: 'Apr', value: 30 },
  { month: 'May', value: 22 },
  { month: 'Jun', value: 35 },
]

const data = {
  datasets: [{
    data: rawData.map(d => ({ x: d.month, y: d.value })),
    backgroundColor: '#F6E05E',
    pointRadius: 4,
    pointHoverRadius: 6,
  }]
}

export default function CommentsDotPlot() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,

    layout: {
      padding: { top: 10, right: 10, bottom: 10, left: 10 }
    },

    scales: {
      x: {
        type: 'category',
        position: 'bottom',
        border: { display: true, color: '#444' },
        grid: { display: false },
        ticks: { display: false, padding: 0 }
      },
      y: {
        border: { display: true, color: '#444' },
        grid: { display: false },
        ticks: { display: false, padding: 0 }
      }
    },

    plugins: {
      tooltip: {
        enabled: true,
        backgroundColor: '#222',
        titleColor:      '#fff',
        bodyColor:       '#fff',
        padding:         6,
        position:        'nearest',
        intersect:       false
      }
    },

    animation: {
      duration: 1000,
      easing:   'easeInOutQuart'
    }
  }

  return (
    <div className="h-48 w-full flex items-center justify-center">
      <div className="relative w-[90%] h-[90%]">
        <Scatter data={data} options={options} />
      </div>
    </div>
  )
}
