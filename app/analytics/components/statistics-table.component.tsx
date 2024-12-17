"use client";

import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { useCallback, useEffect, useMemo, useState } from "react";
import useStore from "@/common/hooks/use-store.context";
import { CurrencyEnum } from "@/common/enums/currency.enum";
import DoughnutChart from "@/app/analytics/components/doughnut-chart-currency.component";
import { SortAnalyticsByEnum } from "@/app/analytics/page";
import ArrowRight from "@/public/icons/40px/Arrow 1.svg";
import numberCommaFormat, {
  formatComma,
  formatCurrency,
} from "@/common/utils/number-comma.utils";
import Loading2Component from "@/common/components/loading/loading-as-page.component";

export default function StatisticsTableComponent({ type, sort, searchText }) {
  const [rows, setRows] = useState();
  const { currencies, session } = useStore();

  const getUserMainCurrency = (
    usd_total: number,
    mxn_total: number,
    cad_total: number,
    getValue = null,
  ) => {
    let userBaseCurrency = CurrencyEnum.USD;

    if (session?.currency) {
      userBaseCurrency = session.currency;
    }

    switch (userBaseCurrency) {
      case CurrencyEnum.USD:
        const toUsdCurrency =
          mxn_total * currencies.mxn_to_usd +
          cad_total * currencies.cad_to_usd +
          usd_total;
        return !getValue ? (
          <div className={"currency-main"}>
            {" "}
            <div className={"currency-symbol"}>$</div>
            {formatCurrency(toUsdCurrency)}
          </div>
        ) : (
          toUsdCurrency
        );

      case CurrencyEnum.CAD:
        const toCadCurrency =
          mxn_total * currencies.mxn_to_cad +
          usd_total * currencies.usd_to_cad +
          cad_total;
        return !getValue ? (
          <div className={"currency-main"}>
            {" "}
            <div className={"currency-symbol"}>C$</div>
            {formatCurrency(toCadCurrency)}
          </div>
        ) : (
          toCadCurrency
        );

      case CurrencyEnum.MXN:
        const toMxnCurrency =
          usd_total * currencies.usd_to_mxn +
          cad_total * currencies.cad_to_mxn +
          mxn_total;
        return !getValue ? (
          <div className={"currency-main"}>
            {" "}
            <div className={"currency-symbol"}>MX$</div>
            {formatCurrency(toMxnCurrency)}
          </div>
        ) : (
          toMxnCurrency
        );
    }
  };

  const getAnalyticsDebounced = useDebouncedCallback(() => {
    const endpoint = type === "lanes" ? "lanes" : "carrier";
    let sortText = "";

    switch (sort) {
      case "price":
        sortText = "total_in_usd";
        break;
      case "loads":
        sortText = "number_of_loads";
        break;
      case "weight":
        sortText = "total_weight_lb";
        break;
      case "cwt":
        sortText = "total_cwt";
        break;
    }

    getWithAuth(
      `/analytics/${endpoint}?sort=${sortText}&searchText=${searchText}`,
    ).then((data) => {
      setRows(data);
    });
  }, 350);

  useEffect(() => {
    getAnalyticsDebounced();
  }, [type, sort, searchText]);

  const getPercentColorClassname = (percent: number) => {
    if (!percent) return "red";

    switch (true) {
      case percent >= 80:
        return "green";
      case percent >= 40:
        return "yellow";
      case percent >= 0:
        return "red";
    }
  };

  if (!rows) return <Loading2Component />;

  return (
    <div className={"statistics-carrier-table"}>
      {rows?.map((row, index) => (
        <div key={index} className={"analytics-card-row"}>
          <div className={"card-header"}>
            {index + 1}.
            <div className={"card-carrier-title"}>
              {row.name}
              <div className={"lane-header"}>
                <span>{row?._id?.shortLaneStart}</span>
                <div className={"arrow-style"}>
                  {row?._id?.shortLaneStart && <ArrowRight />}
                </div>
                <span>{row?._id?.shortLaneEnd}</span>
              </div>
            </div>
          </div>

          <div className={"main-info-line"}>
            <div
              className={"weight-main"}
              style={{
                fontWeight: "600",
              }}
            >
              {" "}
              {row.number_of_loads} Loads
            </div>
            <div
              className={"weight-main"}
              style={{
                fontWeight: "600",
              }}
            >
              {" "}
              {row.total_cwt.toFixed(2)} CWT
            </div>
          </div>

          <div className={"analytics-card-container"}>
            <div className={"currencies-data"}>
              <div className={"title"}>Currency</div>

              {getUserMainCurrency(row.usd_total, row.mxn_total, row.cad_total)}

              <div className={"currencies-total"}>
                <div className={"currency-sub"}>
                  {" "}
                  <div
                    className={"currency-symbol"}
                    style={{
                      background: "#617BF4",
                    }}
                  ></div>
                  <span>$</span>
                  {formatComma(row.usd_total)}
                </div>
                <div className={"currency-sub"}>
                  {" "}
                  <div
                    className={"currency-symbol"}
                    style={{
                      background: "#96AAFB",
                    }}
                  ></div>
                  <span>C$</span>
                  {formatComma(row.cad_total) ?? "0"}
                </div>
                <div className={"currency-sub"}>
                  {" "}
                  <div
                    className={"currency-symbol"}
                    style={{
                      background: "#CAD5FD",
                    }}
                  ></div>
                  <span>MX$</span>
                  {formatComma(row.mxn_total)}
                </div>
              </div>

              <div className={"currency-chart"}>
                <DoughnutChart
                  usd_total={row.usd_total}
                  mxn_total={row.mxn_total}
                  cad_total={row.cad_total}
                />
              </div>
            </div>

            <div className={"weight-data"}>
              <div className={"title"}>Weight</div>
              <div className={"weight-main-wrapper"}>
                <div className={"weight-main"}>
                  {" "}
                  <div className={"currency-symbol"}>LB</div>
                  {formatComma(row.total_weight_lb)}
                </div>
                <div className={"approx-symbol"}>≈</div>
                <div className={"weight-main"}>
                  {" "}
                  <div className={"currency-symbol"}>KG</div>
                  {formatComma(row.total_weight_kg)}
                </div>
              </div>

              <div className={"analytics-data-box"}>
                {/*<div>*/}
                {/*  CWT: <span>{row.total_cwt.toFixed(2)} cwt</span>*/}
                {/*</div>*/}
                <div>
                  Average {session.currency} per LB:{" "}
                  <span>
                    $
                    {formatComma(
                      getUserMainCurrency(
                        row.usd_total,
                        row.mxn_total,
                        row.cad_total,
                        true,
                      ) / row.total_weight_lb,
                    )}{" "}
                    {session.currency}/lb
                  </span>
                </div>
                <div>
                  Average {session.currency} per KG:{" "}
                  <span>
                    $
                    {formatComma(
                      getUserMainCurrency(
                        row.usd_total,
                        row.mxn_total,
                        row.cad_total,
                        true,
                      ) / row.total_weight_kg,
                    )}{" "}
                    {session.currency}/kg
                  </span>
                </div>
                <div>
                  Average LB per load:{" "}
                  <span>
                    {formatComma(row.total_weight_lb / row.number_of_loads)}{" "}
                    lb/load
                  </span>
                </div>
                <div>
                  Average KG per load:{" "}
                  <span>
                    {formatComma(row.total_weight_kg / row.number_of_loads)}{" "}
                    kg/load
                  </span>
                </div>
              </div>

              <div className={"distance-tab"}>
                <div className={"title"}>Estimated Distance</div>

                <div className={"weight-main"}>
                  {" "}
                  <div className={"currency-symbol"}>Miles</div>
                  {formatComma(row.total_miles_est)}
                </div>

                <div className={"analytics-data-box"}>
                  <div>
                    Average {session?.currency} per mile:{" "}
                    <span>
                      $
                      {formatComma(
                        getUserMainCurrency(
                          row.usd_total,
                          row.mxn_total,
                          row.cad_total,
                          true,
                        ) / row.total_miles_est,
                      )}{" "}
                      {session.currency}/mile
                    </span>
                  </div>

                  <div>
                    Average miles per load:{" "}
                    <span>
                      {formatComma(row.total_miles_est / row.number_of_loads)}{" "}
                      mile/load
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"performance-tab"}>
            <div className={"title"}>Performance</div>

            <div className={"performance-container"}>
              <div className={"performance-item"}>
                On time pickup:
                <div
                  className={`percent-div ${getPercentColorClassname(
                    (row?.on_time_pickups ?? 0) /
                      ((row?.total_pickups ?? 0) / 100),
                  )}`}
                >
                  {(
                    (row?.on_time_pickups ?? 0) /
                    ((row?.total_pickups ?? 0) / 100)
                  ).toFixed(2)}
                  % <span>of {row?.total_pickups}</span>
                </div>
              </div>

              <div className={"performance-item"}>
                On time delivery:
                <div
                  className={`percent-div ${getPercentColorClassname(
                    (row?.on_time_drops ?? 0) / ((row?.total_drops ?? 0) / 100),
                  )}`}
                >
                  {(
                    (row?.on_time_drops ?? 0) /
                    ((row?.total_drops ?? 0) / 100)
                  ).toFixed(2)}
                  % <span>of {row?.total_pickups}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
