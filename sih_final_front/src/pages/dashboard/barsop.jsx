import React, { useState } from "react";
import Chart from "react-apexcharts";

export function BarsOP() {
  const [options] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  });

  const [series] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  return (
    <div className="flex flex-col lg:flex-row items-center">
      <div className="mixed-chart m-2 p-3">
        <Chart options={options} series={series} type="bar" width="500" />
      </div>
      <div className="mixed-chart m-2 p-3">
        <Chart options={options} series={series} type="line" width="500" />
      </div>
    </div>
  );
}

export default BarsOP;
