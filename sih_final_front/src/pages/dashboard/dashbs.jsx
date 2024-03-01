import { Button } from "@material-tailwind/react";
import React from "react";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ReactApexChart from "react-apexcharts";
import html2pdf from "html2pdf.js";
import axios from "axios";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";

export function Dashbs() {


  const options = {
    labels: [
      "Plumbing fittings",
      "Wax seal",
      "E-Trasmission",
      "Gas mantels",
      "Valves Metallic",
    ],
    legend: {
      show: true,
    },
  };

  const options2 = {
    labels: ["Women_MSEs", "SC/ST", "General", "OBC_MSEs", "Others"],
    legend: {
      show: true,
    },
  };

  const [series] = useState([44, 55, 41, 17, 15]);

  const series3 = [
    {
      data: [
        { x: "Inculation renovation", y: 32 },
        { x: "Internal Electrification works", y: 44 },
        { x: "Repairing Pipelines", y: 50 },
        { x: "Gas Flooding System", y: 20 },
        { x: "Repairing of roads", y: 35 },
        { x: "Lube oil for GTG", y: 25 },
      ],
    },
  ];
  const options3 = {
    legend: {
      show: false,
    },
    chart: {
      height: 350,
      type: "treemap",
    },
    title: {
      text: "Basic Treemap",
    },
    colors: ["#3B93A5", "#F7B844", "#ADD8C7", "#EC3C65", "#CDD7B6", "#C1F666"],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false,
      },
    },
  };

  const series4 = [
    {
      name: "Q1 Budget",
      group: "budget",
      data: [44000, 55000, 41000, 67000, 22000],
    },
    {
      name: "Q1 Actual",
      group: "actual",
      data: [48000, 50000, 40000, 65000, 25000],
    },
    {
      name: "Q2 Budget",
      group: "budget",
      data: [13000, 36000, 20000, 8000, 13000],
    },
    {
      name: "Q2 Actual",
      group: "actual",
      data: [20000, 40000, 25000, 10000, 12000],
    },
  ];

  const options4 = {
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    dataLabels: {
      formatter: (val) => {
        return val / 1000 + "K";
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: [
        "Online advertising",
        "Sales Training",
        "Print advertising",
        "Catalogs",
        "Meetings",
      ],
      labels: {
        formatter: (val) => {
          return val / 1000 + "K";
        },
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ["#80c7fd", "#008FFB", "#80f1cb", "#00E396"],
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
  };

  const [growthBarOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [2018, 2019, 2020, 2021, 2022, 2023],
    },
  });

  const [supplyBarOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [2021, 2022, 2023],
    },
  });

  const [supplyLineSeries] = useState([
    {
      name: "no_of_procurements_transactions",
      data: [30, 40, 45, 50, 49, 60],
    },
  ]);

  const [growthLineSeries] = useState([
    {
      name: "no_of_procurements_transactions",
      data: [30, 40, 45, 50, 49, 60],
    },
  ]);

  const handleGeneratePDF = () => {
    // Configure the options for html2pdf
    const options = {
      filename: "my-document.pdf",
      margin: [0, 0, 0, 0],
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "A3", orientation: "portrait" },
    };

    const entirePageContent = document.getElementById("content").outerHTML;

    const currentDate = new Date().toLocaleString();

    // Create an instance of html2pdf, pass the HTML element, set the options, and save the PDF
    html2pdf()
      .set(options)
      .from(
        `
      <div style="font-family: Arial, sans-serif; color: #333;>
      <h1 style="color: navy;">
       Financial Analysis : ${currentDate}
    </h1>
        ${entirePageContent}
        </div>
    `
      )
      .save();
  };

  return (
    <div>
      <div className="flex justify-between">
        <Typography variant="h3" color="blue-gray">
          Dashboard
        </Typography>
        <div className="w-full p-1.5 md:w-auto">
          <button
            className="shadow-button flex w-full flex-wrap justify-center rounded-md border border-blue-gray-500 bg-[#379cf0] px-4 py-2 text-sm font-medium text-white hover:bg-[#2289df]"
            onClick={handleGeneratePDF}
          >
            <p>Export as PDF</p>
          </button>
        </div>
      </div>
      <div id="content">
        <div className="h-screen">
          <p>Catogory Analysis</p>
          <div className="flex flex-col p-4 lg:flex-row">
            <div className="m-2 w-full p-4">
              <div className="donut">
                <Chart
                  options={options}
                  series={series}
                  type="donut"
                  width="380"
                />
              </div>
            </div>
            <div className="m-2 w-full p-4">
              <div id="chart">
                <ReactApexChart
                  options={options2}
                  series={series}
                  type="polarArea"
                  width="380"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row">
            <div className="m-2 w-full p-4">
              <div id="chart">
                <ReactApexChart
                  options={options3}
                  series={series3}
                  type="treemap"
                  height={350}
                />
              </div>
            </div>
            <div className="m-2 w-full p-4">
              <div id="chart">
                <ReactApexChart
                  options={options4}
                  series={series4}
                  type="bar"
                  height={350}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="h-screen">
          <p className="p-4">Growth Analysis</p>
          <div className="flex flex-col items-center p-4 lg:flex-row">
            <div className="mixed-chart m-2 p-3">
              <Chart
                options={growthBarOptions}
                series={growthLineSeries}
                type="bar"
                width="500"
              />
            </div>
            <div className="mixed-chart m-2 p-3">
              <Chart
                options={growthBarOptions}
                series={growthLineSeries}
                type="line"
                width="500"
              />
            </div>
          </div>
          <p className="p-4">Supply Analysis</p>
          <div className="m-2 flex flex-col items-center lg:flex-row">
            <div className="donut">
              <Chart options={options} series={series} type="pie" width="380" />
            </div>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Dashbs;
