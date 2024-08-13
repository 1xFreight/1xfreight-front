"use client";

import { memo, useState } from "react";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import Checked from "@/public/icons/24px/checked-tick.svg";

function SelectOwnerComponent({ owners, setOwners }: any) {
  const [searchOwner, setSearchOwner] = useState<string>();
  const [foundOwners, setFoundOwners] = useState([
    "test@test.com",
    "sygdaw@dsad.com",
  ]);
  const [open, setOpen] = useState<boolean>(false);

  const isOwnerSelected = (key) => {
    return owners.find((st) => st === key);
  };

  const toggleOwner = (key) => {
    if (isOwnerSelected(key)) {
      setOwners(owners.filter((st) => st !== key));
    } else {
      setOwners([...owners, key]);
    }
  };

  return (
    <>
      <div className={"select-owner"}>
        <button className={"owner-input"} onClick={() => setOpen(true)}>
          {!owners.length ? "Select owner" : `${owners.length} owners selected`}
        </button>

        {open && (
          <>
            <div
              className={"owner-search-backdrop"}
              onClick={() => setOpen(false)}
            ></div>

            <div className={"owner-list"}>
              <div className={"owner-search"}>
                <SearchInputComponent
                  placeholder={"Search owner"}
                  setSearch={setSearchOwner}
                />
              </div>

              <div className={"list"}>
                {!!foundOwners.length &&
                  foundOwners.map((owner, index) => (
                    <div
                      className={`owner-item ${isOwnerSelected(owner) ? "active" : ""}`}
                      key={index}
                      onClick={() => toggleOwner(owner)}
                    >
                      {owner}
                      <Checked />
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default memo(SelectOwnerComponent);
