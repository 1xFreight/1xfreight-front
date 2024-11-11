"use client";

import "./styles.css";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import CarriersTableComponent from "@/app/settings/components/carriers-table.component";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import React, { useEffect, useState } from "react";
import Import from "@/public/icons/24px/import.svg";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { formDataToJSON } from "@/common/utils/formData.util";
import useStore from "@/common/hooks/use-store.context";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import { paginationConfig } from "@/common/config/pagination.config";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import InputMask from "react-input-mask";
import numberCommaFormat, {
  formatCurrency,
} from "@/common/utils/number-comma.utils";
import AddEditModalComponent from "@/app/settings/carriers/components/add-edit-modal.component";

export default function CarriersSettingsPage() {
  const { showToast } = useStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearch(text),
    300,
  );

  const debouncedGetCarriers = useDebouncedCallback((ignoreCache = false) => {
    getWithAuth(
      `/carrier?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
      ignoreCache,
    ).then((data) => {
      setCarriers(data);
      setLoading(false);
    });
  }, 350);

  useEffect(() => {
    debouncedGetCarriers();
  }, [page, search]);

  return (
    <div className={"carriers-page"}>
      <h2>Carriers List</h2>

      <div className={"carriers-filters"}>
        <div>
          <SearchInputComponent
            setSearch={setSearchDebounced}
            placeholder={"Search partners..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)} className={"variant2"}>
          <PlusCircle /> Add Partner
        </button>
      </div>

      <div className={""}>
        {loading ? (
          <Loading2Component />
        ) : (
          <>
            {" "}
            <CarriersTableComponent partners={carriers?.carriers} />
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
                pages={carriers?.totalCarriers}
              />
            </div>
            <AddEditModalComponent
              open={open}
              setOpen={setOpen}
              debouncedGetCarriers={debouncedGetCarriers}
            />
          </>
        )}
      </div>
    </div>
  );
}
