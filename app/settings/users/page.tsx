"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import { partnersMock } from "@/app/get-quote/pages/partners/mock-data";
import "@/app/get-quote/pages/team-members/styles.css";
import MembersTableComponent from "@/app/settings/components/members-table.component";
import "./styles.css";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import { useState } from "react";

export default function UsersSettingsPage() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className={"users-page"}>
      <h2>Users List</h2>

      <div className={"users-filters"}>
        <div>
          <SearchInputComponent
            // setSearch={setSearch}
            placeholder={"Search members..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)}>
          <PlusCircle /> Add member
        </button>
      </div>

      <div className={"tm-wrapper"}>
        <MembersTableComponent members={partnersMock} />
      </div>

      <RightModalComponent open={open} setOpen={setOpen} title={"Add User"}>
        <form name={"newUserForm"} className={"new-user-form"}>
          <div>
            <div>
              <h3>
                Full Name <span>*</span>
              </h3>
              <input type={"text"} placeholder={"Type here..."} />
            </div>
            <div>
              <h3>
                Role <span>*</span>
              </h3>
              <input type={"text"} placeholder={"Type here..."} />
            </div>
          </div>

          <div>
            <div>
              <h3>
                Email <span>*</span>
              </h3>
              <input type={"text"} placeholder={"Type here..."} />
            </div>
            <div>
              <h3>
                Phone <span>*</span>
              </h3>
              <input type={"text"} placeholder={"Type here..."} />
            </div>
          </div>
        </form>
      </RightModalComponent>
    </div>
  );
}
