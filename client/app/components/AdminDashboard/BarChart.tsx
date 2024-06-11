import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ chartData, chartTitle }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}></h2>
      <Bar
        data={chartData}
        options={{
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1, 
              },
            },
          },
        
        }}
      />
    </div>
  );
};

export default BarChart;
