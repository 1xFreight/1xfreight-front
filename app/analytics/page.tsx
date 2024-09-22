"use client";

import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import "./styles.css";
import numberCommaFormat from "@/common/utils/number-comma.utils";

export default function AnalyticsPage() {
  const [userAnalytics, setUserAnalytics] = useState<any>(null);

  const getAnalyticsDebounced = useDebouncedCallback(() => {
    getWithAuth("/analytics").then((data) => setUserAnalytics(data));
  }, 500);

  useEffect(() => {
    getAnalyticsDebounced();
  }, []);

  if (!userAnalytics) return <Loading2Component />;

  return (
    <div className={"analytics-page page"}>
      <div className={"container"}>
        <div className={"analytic-tab"}>
          <div>
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

              <div>
                <div className={"subscription-status"}>Your plan is active</div>
              </div>
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

            <div
              className={"statistics"}
              style={{
                marginTop: "1rem",
              }}
            >
              <div>
                <div className={"title2"}>Total quotes cost:</div>
                <div
                  className={"big-number2 price"}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  {Object.keys(userAnalytics?.totalQuotesCost).map(
                    (currency, index) => (
                      <div key={"currency"}>
                        {numberCommaFormat(
                          userAnalytics?.totalQuotesCost[currency],
                        )}
                        <div>
                          <div>$</div>
                          <div className={"currency-1"}>{currency}</div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={"statistics"}>
            <div>
              <div className={"title2"}>Quotes this month</div>
              <div className={"big-number2"}>
                {userAnalytics?.totalQuotesLastMonth}
              </div>
            </div>

            <div>
              <div className={"title2"}>Total shipments:</div>
              <div className={"big-number2"}>
                {userAnalytics?.totalActiveQuotes}
              </div>
            </div>

            <div>
              <div className={"title2"}>Shipments delivered:</div>
              <div className={"big-number2"}>
                {userAnalytics?.totalQuotesDelivered}
              </div>
            </div>

            <div>
              <div className={"title2"}>Average quotes per shipment:</div>
              <div className={"big-number2"}>
                {userAnalytics?.averageOffersPerQuote}
              </div>
            </div>

            <div>
              <div className={"title2"}>Total quotes cost:</div>
              <div className={"big-number2 price"}>
                {Object.keys(userAnalytics?.totalQuotesCost).map(
                  (currency, index) => (
                    <div key={"currency"}>
                      {numberCommaFormat(
                        userAnalytics?.totalQuotesCost[currency],
                      )}
                      <div>
                        <div>$</div>
                        <div className={"currency-1"}>{currency}</div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div>
              <div className={"title2"}>Quotes cost current month:</div>
              <div className={"big-number2 price"}>
                {Object.keys(userAnalytics?.lastMonthQuotesCost).map(
                  (currency, index) => (
                    <div key={currency}>
                      {numberCommaFormat(
                        userAnalytics?.lastMonthQuotesCost[currency],
                      )}
                      <div>
                        <div>$</div>
                        <div className={"currency-1"}>{currency}</div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
