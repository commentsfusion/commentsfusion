import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
)

const data = {
  labels: ['Jan','Feb','Mar','Apr','May','Jun'],
  datasets: [{
    data:       [400,800,600,1200,900,1400],
    borderColor:'#33C6F4',
    borderWidth:2,
    fill:       false,
    pointRadius:0,
    pointHoverRadius:6,
  }]
}

export default function FollowersChart() {
  const options = {
    responsive:        true,
    maintainAspectRatio:false,

    layout: {
      padding: { top:10, right:10, bottom:10, left:10 }
    },

    scales: {
      x: {
        border: { display: true, color: '#444' },
        ticks:  { display: false, padding: 0 },
        grid:   { display: false },
        position:'bottom'
      },
      y: {
        border: { display: true, color: '#444' },
        ticks:  { display: false, padding: 0 },
        grid:   { display: false }
      }
    },

    plugins: {
      tooltip: { 
        enabled: true,
        backgroundColor:'#222',
        titleColor:     '#fff',
        bodyColor:      '#fff',
        padding:        6,
        position:       'nearest',
        intersect:      false
      }
    },

    animation: {
      duration: 1000,
      easing:   'easeInOutQuart'
    }
  }

  return (
    <div className="h-44 w-full flex items-center justify-center">
      <div className="relative w-[90%] h-[90%]">
        <Line data={data} options={options} />
      </div>
    </div>
  )
}
