"use client";

import "./styles.css";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import { partnersMock } from "@/app/get-quote/pages/partners/mock-data";
import CarriersTableComponent from "@/app/settings/components/carriers-table.component";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import { useState } from "react";
import Import from "@/public/icons/24px/import.svg";

export default function CarriersSettingsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className={"carriers-page"}>
      <h2>Carriers List</h2>

      <div className={"carriers-filters"}>
        <div>
          <SearchInputComponent
            // setSearch={setSearch}
            placeholder={"Search partners..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)}>
          <PlusCircle /> Add Partner
        </button>
      </div>

      <div className={"pt-wrapper"}>
        <CarriersTableComponent partners={partnersMock} />
      </div>

      <RightModalComponent open={open} setOpen={setOpen} title={"Add Carrier"}>
        <form name={"newCarrierForm"} className={"new-carrier-form"}>
          <div className={"column1"}>
            <div className={"row1"}>
              <div>
                <h3>
                  Carrier Name<span>*</span>
                </h3>
                <input type={"text"} placeholder={"Type here..."} />
              </div>
            </div>

            <div className={"row1"}>
              <div>
                <h3>
                  MC#<span>*</span>
                </h3>
                <input type={"text"} placeholder={"Type here..."} />
              </div>

              <div>
                <h3>
                  DOT#<span>*</span>
                </h3>
                <input type={"text"} placeholder={"Type here..."} />
              </div>
            </div>

            <div className={"row1"}>
              <button type={"button"} onClick={() => {}}>
                <Import /> FMCSA Import
              </button>
            </div>

            <div className={"row1"}>
              <div>
                <h3>
                  Email<span>*</span>
                </h3>
                <input type={"text"} placeholder={"Type here..."} />
              </div>
            </div>

            <div className={"row1"}>
              <div>
                <h3>
                  Phone<span>*</span>
                </h3>
                <input type={"text"} placeholder={"Type here..."} />
              </div>
            </div>

            <div className={"row1"}>
              <div>
                <h3>
                  Insurance<span>*</span>
                </h3>
                <input type={"text"} placeholder={"Type here..."} />
                <input type={"text"} placeholder={"Type here..."} />
                <input type={"text"} placeholder={"Type here..."} />
              </div>
            </div>
          </div>
        </form>
      </RightModalComponent>
    </div>
  );
}
