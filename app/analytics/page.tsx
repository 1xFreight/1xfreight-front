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

export enum AnalyticsTypeEnum {
  carrier = "Carrier",
  lanes = "Lanes",
}

export enum SortAnalyticsByEnum {
  price = "$ Spent",
  loads = "# of Loads",
  weight = "Weight",
  cwt = "CWT",
}

export default function AnalyticsPage() {
  const [userAnalytics, setUserAnalytics] = useState<any>(null);
  const [type, setType] = useState("carrier");
  const [sort, setSort] = useState("price");
  const [searchText, setSearchText] = useState("");
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
            {toUsdCurrency.toFixed(2)}
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
            {toCadCurrency.toFixed(2)}
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
            {toMxnCurrency.toFixed(2)}
          </div>
        ) : (
          toMxnCurrency
        );
    }
  };

  const getAnalyticsDebounced = useDebouncedCallback(() => {
    getWithAuth("/analytics").then((data) => setUserAnalytics(data));
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
          <TypeSelectorComponent
            typeEnum={AnalyticsTypeEnum}
            setType={setType}
            type={type}
          />

          <TypeSelectorComponent
            typeEnum={SortAnalyticsByEnum}
            setType={setSort}
            type={sort}
          />

          <input
            type={"text"}
            placeholder={"Search..."}
            className={"search-analytics-input"}
            value={searchText}
            onChange={(ev) => setSearchText(ev.target.value)}
          />
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
                <div className={"big-number"}>{userAnalytics?.totalQuotes}</div>
              </div>

              <div></div>
            </div>

            <div className={"quotes-by-mode"}>
              {Object.values(QuoteTypeEnum).map((mode) => (
                <div key={mode} className={mode}>
                  <div>{mode}</div>
                  {userAnalytics[`${mode.toLowerCase()}Quotes`]}
                </div>
              ))}
            </div>

            <div className={"statistics smaller"}>
              <div>
                <div>
                  <div className={"title2"}>Team members:</div>
                  <div className={"big-number2"}>
                    {userAnalytics?.userTeamMembersNumber}
                  </div>
                </div>

                <div>
                  <div className={"title2"}>Carriers:</div>
                  <div className={"big-number2"}>
                    {userAnalytics?.userCarriersNumber}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={"statistics"}>
            <StatisticsTableComponent
              type={type}
              sort={sort}
              searchText={searchText}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
