"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import "@/app/get-quote/pages/team-members/styles.css";
import MembersTableComponent from "@/app/settings/components/members-table.component";
import "./styles.css";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import React, { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { formDataToJSON } from "@/common/utils/formData.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";
import InputMask from "react-input-mask";
import AddEditModalComponent from "@/app/settings/users/components/add-edit-modal.component";

export default function UsersSettingsPage() {
  const [open, setOpen] = useState<boolean>(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getMembersDebounced = useDebouncedCallback((ignoreCache = false) => {
    getWithAuth(
      `/users/members?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
      ignoreCache,
    ).then((data) => {
      setMembers(data);
      setLoading(false);
    });
  }, 350);

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearch(text),
    300,
  );

  useEffect(() => {
    setLoading(true);
    getMembersDebounced();
  }, [page, search]);

  return (
    <div className={"users-page"}>
      <h2>Users List</h2>

      <div className={"users-filters"}>
        <div>
          <SearchInputComponent
            setSearch={setSearchDebounced}
            placeholder={"Search members..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)} className={"variant2"}>
          <PlusCircle /> Add member
        </button>
      </div>

      <div className={"tm-wrapper"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <>
            <MembersTableComponent members={members?.members} />
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "end",
              }}
            >
              <PaginationComponent
                page={page}
                setPage={setPage}
                pages={members?.totalMembers}
              />
            </div>
          </>
        )}
      </div>

      <AddEditModalComponent
        open={open}
        setOpen={setOpen}
        getMembersDebounced={getMembersDebounced}
      />
    </div>
  );
}
