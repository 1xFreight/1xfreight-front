"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import useStore from "@/common/hooks/use-store.context";
import { CurrencyEnum } from "@/common/enums/currency.enum";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);
const DoughnutChart = ({ usd_total, mxn_total, cad_total }) => {
  const { session, currencies } = useStore();

  const getCurrencyPercents = () => {
    const userBaseCurrency = session?.currency ?? CurrencyEnum.USD;
    let usd, mxn, cad, base;

    switch (userBaseCurrency) {
      case CurrencyEnum.USD:
        usd = usd_total;
        mxn = mxn_total * currencies.mxn_to_usd;
        cad = cad_total * currencies.cad_to_usd;
        base = usd_total + mxn + cad;
        break;

      case CurrencyEnum.CAD:
        usd = usd_total * currencies.usd_to_cad;
        mxn = mxn_total * currencies.mxn_to_cad;
        cad = cad_total;
        base = cad_total + usd + mxn;
        break;

      case CurrencyEnum.MXN:
        usd = usd_total * currencies.usd_to_mxn;
        mxn = mxn_total;
        cad = cad_total * currencies.cad_to_usd;
        base = mxn_total + usd + cad;
    }

    const baseOnePercent = base / 100;

    return [usd, cad, mxn].map((currency) =>
      (currency / baseOnePercent).toFixed(2),
    );
  };

  const data = {
    labels: ["USD %", "CAD %", "MXN %"],
    datasets: [
      {
        data: getCurrencyPercents(), // Your data values
        backgroundColor: [
          "#617BF4", // Blue Shade 1
          "#96AAFB", // Blue Shade 2
          "#CAD5FD", // Blue Shade 3
        ],
        borderColor: [
          "#617BF4", // Blue Shade 1
          "#96AAFB", // Blue Shade 2
          "#CAD5FD", // Blue Shade 3
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default DoughnutChart;
