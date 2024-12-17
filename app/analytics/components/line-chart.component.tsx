import React, { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
);

const LineChart = ({ dataSet }) => {
  const chartRef = useRef(null);

  // Helper function to process data for the chart
  const processData = (carrierQuotes) => {
    const dates = carrierQuotes.map((quote) => new Date(quote.updatedAt));

    // Determine the granularity of the x-axis
    const allInSameMonth = dates.every(
      (date, _, arr) =>
        date.getFullYear() === arr[0].getFullYear() &&
        date.getMonth() === arr[0].getMonth(),
    );
    const acrossDifferentYears = dates.some(
      (date, _, arr) => date.getFullYear() !== arr[0].getFullYear(),
    );

    let labels = [];
    let groupedData = [];
    let groupBy = "months"; // Default grouping

    if (allInSameMonth) {
      // Group by days
      groupBy = "days";
      labels = dates.map((date) => date.getDate()); // Days of the month
      groupedData = labels.map((_, index) => index + 1); // Use index + 1 for number of loads
    } else if (acrossDifferentYears) {
      // Group by years
      groupBy = "years";
      const yearData = {};
      dates.forEach((date) => {
        const year = date.getFullYear();
        yearData[year] = (yearData[year] || 0) + 1;
      });
      labels = Object.keys(yearData); // Years as labels
      groupedData = Object.values(yearData); // Number of loads per year
    } else {
      // Group by months
      groupBy = "months";
      const monthData = {};
      dates.forEach((date) => {
        const month = date.toLocaleString("default", { month: "long" });
        monthData[month] = (monthData[month] || 0) + 1;
      });
      labels = Object.keys(monthData); // Months as labels
      groupedData = Object.values(monthData); // Number of loads per month
    }

    return { labels, groupedData, groupBy };
  };

  // Process the dataset
  const { labels, groupedData, groupBy } = processData(dataSet.carrier_quotes);

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top",
        labels: {
          usePointStyle: true,
        },
      },
    },
    responsive: true,
    scales: {
      x: {
        title: {
          display: false,
          text:
            groupBy === "days"
              ? "Days"
              : groupBy === "years"
                ? "Years"
                : "Months",
        },
        grid: {
          display: false, // Hide grid lines for x-axis
        },
      },
      y: {
        title: {
          display: false,
          text: "Number of Loads",
        },
        beginAtZero: true,
        grid: {
          display: false, // Hide grid lines for y-axis
        },
      },
    },
  };

  const data = {
    labels, // Dynamic x-axis labels
    datasets: [
      {
        label: "",
        data: groupedData, // Dynamic y-axis data
        borderColor: "#96AAFB", // Line color
        borderWidth: 2, // Line thickness
        tension: 0.4, // Smooth curve
        backgroundColor: "#3A56EA",
        fill: "start",
      },
    ],
  };

  return <Line ref={chartRef} data={data} options={options} />;
};

export default LineChart;
