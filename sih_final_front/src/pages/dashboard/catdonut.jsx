import React, { useState } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";

export function CatDonut() {
  const [options] = useState({});
  const [series] = useState([44, 55, 41, 17, 15]);
  const [labels] = useState(["A", "B", "C", "D", "E"]);

  const series3 = [
    {
      data: [
        { x: 'New Delhi', y: 218 },
        { x: 'Kolkata', y: 149 },
        { x: 'Mumbai', y: 184 },
        { x: 'Ahmedabad', y: 55 },
        { x: 'Bangaluru', y: 84 },
        { x: 'Pune', y: 31 },
        { x: 'Chennai', y: 70 },
        { x: 'Jaipur', y: 30 },
        { x: 'Surat', y: 44 },
        { x: 'Hyderabad', y: 68 },
        { x: 'Lucknow', y: 28 },
        { x: 'Indore', y: 19 },
        { x: 'Kanpur', y: 29 },
      ],
    },
  ];
  const options3 = {
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: 'treemap',
    },
    title: {
      text: 'Basic Treemap',
    },
    colors: [
        '#3B93A5',
        '#F7B844',
        '#ADD8C7',
        '#EC3C65',
        '#CDD7B6',
        '#C1F666',
        '#D43F97',
        '#1E5D8C',
        '#421243',
        '#7F94B0',
        '#EF6537',
        '#C0ADDB'
      ],
      plotOptions: {
        treemap: {
          distributed: true,
          enableShades: false
        }
      },
  };

  const series4 = [
    {
      name: 'Q1 Budget',
      group: 'budget',
      data: [44000, 55000, 41000, 67000, 22000]
    },
    {
      name: 'Q1 Actual',
      group: 'actual',
      data: [48000, 50000, 40000, 65000, 25000]
    },
    {
      name: 'Q2 Budget',
      group: 'budget',
      data: [13000, 36000, 20000, 8000, 13000]
    },
    {
      name: 'Q2 Actual',
      group: 'actual',
      data: [20000, 40000, 25000, 10000, 12000]
    }
  ];

  const options4 = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    dataLabels: {
      formatter: (val) => {
        return val / 1000 + 'K';
      }
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    xaxis: {
      categories: [
        'Online advertising',
        'Sales Training',
        'Print advertising',
        'Catalogs',
        'Meetings'
      ],
      labels: {
        formatter: (val) => {
          return val / 1000 + 'K';
        }
      }
    },
    fill: {
      opacity: 1
    },
    colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    }
  };




  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="m-2 w-full p-4">
          <div className="donut">
            <Chart options={options} series={series} type="donut" width="380" />
          </div>
        </div>
        <div className="m-2 w-full p-4">
        <div id="chart">
      <ReactApexChart options={options} series={series} type="polarArea" width="380" />
    </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="m-2 w-full p-4">
        <div id="chart">
      <ReactApexChart options={options3} series={series3} type="treemap" height={350} />
    </div>
        </div>
        <div className="m-2 w-full p-4">
        <div id="chart">
      <ReactApexChart options={options4} series={series4} type="bar" height={350} />
    </div>
        </div>
      </div>
    </>
  );
}

export default CatDonut;
