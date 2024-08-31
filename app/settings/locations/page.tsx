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

export default function SavedLocationsPage() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [locations, setLocations] = useState();
  const { showToast } = useStore();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const debouncedGetLocations = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth(
      `/address?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
    ).then((data) => {
      setLocations(data);
      setLoading(false);
    });
  }, 500);

  const saveDataDebounced = useDebouncedCallback(() => {
    const form = document.forms["location-form-Location-0"];
    const valid = form[0].reportValidity();

    if (!valid) return;

    const formData = new FormData(form);
    const location = formDataToJSON(formData);
    location.addTime = "yes";
    const locationFormatted: any = formatAddressObj(location, "drop");
    delete locationFormatted.date;
    delete locationFormatted.address_type;
    console.log(locationFormatted);

    postWithAuth("/address", locationFormatted).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        return showToast({
          type: ToastTypesEnum.ERROR,
          text: errorData.message || "Something went wrong",
          duration: 5000,
        });
      }

      showToast({
        type: ToastTypesEnum.SUCCESS,
        text: "Address was added successfully",
        duration: 5000,
      });
      debouncedGetLocations();
    });
    setOpen(false);
  });

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

        <button onClick={() => setOpen(true)}>
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

      <RightModalComponent
        open={open}
        setOpen={setOpen}
        title={"Add Location"}
        action={saveDataDebounced}
      >
        <LocationFormComponent title={"Location"} index={0} />
      </RightModalComponent>
    </div>
  );
}
