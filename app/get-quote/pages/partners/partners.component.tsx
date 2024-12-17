"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import { useEffect, useState } from "react";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import "./styles.css";
import PartnersTableComponent from "@/app/get-quote/pages/partners/components/partners-table.component";
import { partnersMock } from "@/app/get-quote/pages/partners/mock-data";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import CarriersTableComponent from "@/app/settings/carriers/components/carriers-table.component";

export default function PartnersComponent() {
  const [searchText, setSearch] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState();
  const { addData, setCanChangePage, canChangePage } =
    useRegisterQuoteContext();

  const debouncedGetCarriers = useDebouncedCallback(() => {
    const ignoreCache = true;
    setLoading(true);
    getWithAuth("/carrier?status=active", ignoreCache).then((data) => {
      setCarriers(data);
      setLoading(false);
    });
  }, 300);

  useEffect(() => {
    debouncedGetCarriers();
  }, []);

  const selectAll = (value: boolean) => {
    const checkboxes = document.querySelectorAll(
      'div.pt-wrapper input[type="checkbox"]',
    );

    if (value) {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = true;
      });
    } else {
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    }
  };

  const dataCollector = () => {
    const emailList = [];

    const checkboxes = document.querySelectorAll(
      'div.pt-wrapper input[type="checkbox"]',
    );

    checkboxes.forEach((checkbox) => {
      checkbox.checked ? emailList.push(checkbox.name) : "";
    });

    if (!emailList.length) return setCanChangePage(PageStateEnum.INVALID);

    addData({ form: "partners", data: emailList });
    setCanChangePage(PageStateEnum.CAN_CHANGE);
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  return (
    <div className={"partners-page"}>
      <h2>Select Partners</h2>

      <div className={"partner-filters"}>
        <div>
          <SearchInputComponent
            setSearch={setSearch}
            placeholder={"Search partners..."}
            width={"20rem"}
          />

          <select defaultValue={"0"}>
            <option value={"0"} disabled>
              Filter by tags
            </option>
            <option>Unknown</option>
            <option>Unknown</option>
            <option>Unknown</option>
            <option>Unknown</option>
          </select>
        </div>

        {/*<button>*/}
        {/*  <PlusCircle /> Add Partner*/}
        {/*</button>*/}
      </div>

      <div className={"select-all"}>
        <input
          type={"checkbox"}
          onClick={(ev) => selectAll(ev.target.checked)}
        />

        <h5>SELECT ALL</h5>
      </div>

      <div className={"pt-wrapper"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <PartnersTableComponent partners={carriers?.carriers} />
        )}
      </div>
    </div>
  );
}
