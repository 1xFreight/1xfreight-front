"use client";

import "./styles.css";
import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import { formDataToJSON } from "@/common/utils/formData.util";
import LocationFormComponent from "@/app/get-quote/components/location-ftl-ltl-form/location-form.component";
import SavedLocationsTable from "@/app/settings/components/saved-locations-table.component";
import { formatAddressObj } from "@/common/utils/data-convert.utils";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import { paginationConfig } from "@/common/config/pagination.config";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import AddEditModalComponent from "@/app/settings/locations/components/add-edit-modal.component";

export default function SavedLocationsPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedGetLocations = useDebouncedCallback((ignoreCache = false) => {
    setLoading(true);
    getWithAuth(
      `/address?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
      ignoreCache,
    ).then((data) => {
      setLocations(data);
      setLoading(false);
    });
  }, 350);

  useEffect(() => {
    setLoading(true);
    debouncedGetLocations();
  }, [page, search]);

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearch(text),
    300,
  );

  return (
    <div className={"saved-locations-page"}>
      <h2>Saved Locations List</h2>

      <div className={"carriers-filters"}>
        <div>
          <SearchInputComponent
            setSearch={setSearchDebounced}
            placeholder={"Search locations..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)} className={"variant2"}>
          <PlusCircle /> Add Location
        </button>
      </div>

      <div className={"pt-wrapper"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <>
            {" "}
            <SavedLocationsTable address={locations?.address} />
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
                pages={locations?.totalAddresses}
              />
            </div>
          </>
        )}
      </div>

      <AddEditModalComponent
        open={open}
        setOpen={setOpen}
        debouncedGetLocations={debouncedGetLocations}
      />
    </div>
  );
}
