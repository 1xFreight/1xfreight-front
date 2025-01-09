"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import "./styles.css";
import StatisticsTableComponent from "@/app/analytics/components/statistics-table.component";
import TypeSelectorComponent from "@/common/components/type-selector/type-selector.component";
import useStore from "@/common/hooks/use-store.context";
import { CurrencyEnum } from "@/common/enums/currency.enum";
import { Button, DatePicker } from "antd";
import DatePickRangeComponent from "@/app/analytics/components/date-pick-range.component";

export enum AnalyticsTypeEnum {
  carrier = "Carriers",
  lanes = "Lanes",
}

export enum SortAnalyticsByEnum {
  price = "$ Spent",
  loads = "# of Loads",
  weight = "Weight",
  cwt = "CWT",
  pickup = "On time Pickup",
  delivery = "On time Delivery",
}

export enum SortDirectionEnum {
  asc = "Ascended",
  desc = "Descended",
}

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

export default function AnalyticsPage() {
  const [userAnalytics, setUserAnalytics] = useState<any>(null);
  const [type, setType] = useState(AnalyticsTypeEnum.carrier);
  const [sort, setSort] = useState("price");
  const [limit, setLimit] = useState(5);
  const [sortDirection, setSortDirection] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchText, setSearchText] = useState("");

  const getAnalyticsDebounced = useDebouncedCallback(() => {
    getWithAuth("/analytics").then((data) => setUserAnalytics(data[0]));
  }, 350);

  useEffect(() => {
    getAnalyticsDebounced();
  }, []);

  if (!userAnalytics) return <Loading2Component />;

  return (
    <div className={"analytics-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Analytics</h4>
      </div>
      <div className={"container"}>
        <div className={"filter-box"}>
          <div className={"select-analytics-type"}>
            {Object.values(AnalyticsTypeEnum).map((typeEl) => (
              <div
                className={`select-analytics-type-item ${typeEl === type ? "active" : ""}`}
                key={typeEl}
                onClick={() => setType(typeEl as AnalyticsTypeEnum)}
              >
                {typeEl}
              </div>
            ))}
            <div></div>
          </div>
        </div>

        <div className={"filter-box"}>
          <DatePickRangeComponent
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>

        <div className={"filter-box"}>
          <TypeSelectorComponent
            typeEnum={SortAnalyticsByEnum}
            setType={setSort}
            type={sort}
          />

          <TypeSelectorComponent
            typeEnum={SortDirectionEnum}
            setType={setSortDirection}
            type={sortDirection}
          />

          <input
            type={"text"}
            placeholder={"Search..."}
            className={"search-analytics-input"}
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
          />

          <select value={limit} onChange={(ev) => setLimit(ev.target.value)}>
            <option value={"5"}>Show 5</option>
            <option value={"15"}>Show 15</option>
            <option value={"25"}>Show 25</option>
          </select>
        </div>

        <div className={"analytic-tab"}>
          <div className={"analytics-general-wrapper"}>
            <div className={"general-analytics"}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <div className={"title"}>Quotes</div>
                {/*<div className={"subtitle"}>*/}
                {/*  Based on data for the entire period of using the platform*/}
                {/*</div>*/}
                <div className={"big-number"}>
                  {userAnalytics?.quotes_number}
                </div>
              </div>

              <div></div>
            </div>

            <div className={"quotes-by-mode"}>
              {Object.values(QuoteTypeEnum).map((mode) => (
                <div key={mode} className={mode}>
                  <div>{mode}</div>
                  {userAnalytics[`${mode.toLowerCase()}`]}
                </div>
              ))}
            </div>

            <div className={"statistics smaller"}>
              <div>
                {userAnalytics?.team_members && (
                  <div>
                    <div className={"title2"}>Team members:</div>
                    <div className={"big-number2"}>
                      {userAnalytics?.team_members}
                    </div>
                  </div>
                )}

                <div>
                  <div className={"title2"}>Carriers:</div>
                  <div className={"big-number2"}>{userAnalytics?.carriers}</div>
                </div>
              </div>
            </div>
          </div>

          <div className={"statistics"}>
            <StatisticsTableComponent
              type={type}
              sort={sort}
              searchText={searchText}
              startDate={startDate}
              endDate={endDate}
              limit={limit}
              sortDirection={sortDirection}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
