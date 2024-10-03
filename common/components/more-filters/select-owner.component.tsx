"use client";

import { memo, useEffect, useState } from "react";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import Checked from "@/public/icons/24px/checked-tick.svg";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { paginationConfig } from "@/common/config/pagination.config";

function SelectOwnerComponent({ owners, setOwners }: any) {
  const [searchOwner, setSearchOwner] = useState<string>();
  const [foundOwners, setFoundOwners] = useState([]);
  const [open, setOpen] = useState<boolean>(false);

  const isOwnerSelected = (key) => {
    return owners.find(({ name }) => name === key.name);
  };

  const toggleOwner = (key) => {
    if (isOwnerSelected(key)) {
      setOwners(owners.filter(({ name }) => name !== key.name));
    } else {
      setOwners([...owners, key]);
    }
  };

  const getMembersDebounced = useDebouncedCallback(() => {
    getWithAuth(`/users/members?limit=5&searchText=${searchOwner ?? ""}`).then(
      (data) => {
        setFoundOwners(data?.members);
      },
    );
  }, 300);

  useEffect(() => {
    getMembersDebounced();
  }, [searchOwner]);

  const setSearchOwnerDebounced = useDebouncedCallback(
    (text) => setSearchOwner(text),
    400,
  );

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
                  setSearch={setSearchOwnerDebounced}
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
                      {owner?.name}
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
