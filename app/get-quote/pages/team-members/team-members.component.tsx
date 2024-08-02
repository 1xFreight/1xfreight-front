"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import { useEffect, useState } from "react";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import "./styles.css";
import { partnersMock } from "@/app/get-quote/pages/partners/mock-data";
import MembersTableComponent from "@/app/get-quote/pages/team-members/components/members-table.component";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";

export default function TeamMembersComponent() {
  const [searchText, setSearch] = useState<string>();
  const { addData, setCanChangePage, canChangePage } =
    useRegisterQuoteContext();

  const selectAll = (value: boolean) => {
    const checkboxes = document.querySelectorAll(
      'div.tm-wrapper input[type="checkbox"]',
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
      'div.tmn-wrapper input[type="checkbox"]',
    );

    checkboxes.forEach((checkbox) => {
      checkbox.checked ? emailList.push(checkbox.name) : "";
    });

    addData({ form: "members", data: emailList });
    setCanChangePage(PageStateEnum.CAN_CHANGE);
  };

  useEffect(() => {
    if (canChangePage !== PageStateEnum.CHECK) return;

    dataCollector();
  }, [canChangePage]);

  return (
    <div className={"members-page"}>
      <h2>Team Members</h2>

      <div className={"member-filters"}>
        <div>
          <SearchInputComponent
            setSearch={setSearch}
            placeholder={"Search members..."}
            width={"20rem"}
          />
        </div>

        <button>
          <PlusCircle /> Add member
        </button>
      </div>

      <div className={"select-all"}>
        <input
          type={"checkbox"}
          onClick={(ev) => selectAll(ev.target.checked)}
        />

        <h5>SELECT ALL</h5>
      </div>

      <div className={"tm-wrapper"}>
        <MembersTableComponent members={partnersMock} />
      </div>
    </div>
  );
}
