"use client";

import "./styles.css";
import QuotesTableComponent from "@/app/quotes/components/quotes-table/quotes-table.component";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import FiltersPanelComponent from "@/app/quotes/components/filters-panel/filters-panel.component";
import { useEffect, useMemo, useState } from "react";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import LoadingComponent from "@/common/components/loading/loading.component";

export default function QuotesPage() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const data = await getWithAuth("/quote");
        setQuotes(data);
      } catch (error) {
        console.error("Error fetching quotes:", error);
      } finally {
        setLoading(false);
      }
    }

    return () => {
      fetchQuotes();
    };
  }, []);

  if (loading) {
    return (
      <div>
        <LoadingComponent />
      </div>
    );
  }

  return (
    <div className={"quotes-page page"}>
      <div className={"container page-header"}>
        <h4 className={"title"}>Quotes</h4>
      </div>

      <div className={"container"}>
        <FiltersPanelComponent />
      </div>

      <div className={"container"}>
        <QuotesTableComponent rows={quotes} />
      </div>
    </div>
  );
}
