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
import Cross from "@/public/icons/24px/cross.svg";
import SpotTableComponent from "@/app/settings/components/spot-table.component";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";

export default function SpotSettingsPage() {
  const { showToast } = useStore();
  const [open, setOpen] = useState<boolean>(false);
  const [spotGroups, setSpotGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carriers, setCarriers] = useState([]);
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const removeItem = (id: string) => {
    setSelectedCarriers(selectedCarriers.filter(({ _id }) => _id !== id));
  };

  const saveDate = useDebouncedCallback(
    (data) => {
      postWithAuth("/carrier/spot-create", data).then(async (response) => {
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
          text: "Spot Group was added successfully",
          duration: 5000,
        });
      });
    },
    1000,
    { leading: true },
  );

  const validateAndSave = () => {
    const form = document.forms["newGroupForm"];
    const valid = form.reportValidity();

    if (valid && !!selectedCarriers.length) {
      const formData = new FormData(form);
      const obj = formDataToJSON(formData);
      obj["carriers"] = selectedCarriers.map(({ _id }) => _id);
      saveDate(obj);
      setOpen(false);
      getMembersDebounced();
    }
  };

  const getMembersDebounced = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth(
      `/carrier/spot?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}`,
    ).then((data) => {
      setSpotGroups(data);
    });
    getWithAuth("/carrier").then((data) => {
      setCarriers(data);
      setLoading(false);
    });
  }, 500);

  const getSpotGroupsDebounced = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth(
      `/carrier/spot?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
    ).then((data) => {
      setSpotGroups(data);
      setLoading(false);
    });
  }, 500);

  useEffect(() => {
    getMembersDebounced();
  }, []);

  useEffect(() => {
    setLoading(true);
    getSpotGroupsDebounced();
  }, [page, search]);

  const setSearchDebounced = useDebouncedCallback(
    (text) => setSearch(text),
    300,
  );

  return (
    <div className={"spot-group-page"}>
      <h2>Spot Group Emails</h2>

      <div className={"spot-group-filters"}>
        <div>
          <SearchInputComponent
            setSearch={setSearchDebounced}
            placeholder={"Search tags..."}
            width={"20rem"}
          />
        </div>

        <button onClick={() => setOpen(true)}>
          <PlusCircle /> Add group
        </button>
      </div>

      <div className={"tm-wrapper"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <>
            <SpotTableComponent members={spotGroups?.spots} />
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
                pages={spotGroups?.totalSpot}
              />
            </div>
          </>
        )}
      </div>

      <RightModalComponent
        open={open}
        setOpen={setOpen}
        title={"Add Spot Group"}
        action={validateAndSave}
      >
        <form name={"newGroupForm"} className={"new-group-form"}>
          <div>
            <div>
              <h3>
                Group Name (tag) <span>*</span>
              </h3>
              <input
                type={"text"}
                name={"name"}
                placeholder={"Type here..."}
                required
                maxLength={20}
              />
            </div>
          </div>

          <div>
            <div>
              <h3>
                Select Carriers <span>*</span>
              </h3>
              <select
                onChange={(e) => {
                  setSelectedCarriers([
                    ...selectedCarriers,
                    carriers[e.target.value],
                  ]);
                }}
                defaultValue={"-1"}
              >
                <option value={"-1"} disabled>
                  Choose carrier
                </option>
                {!!carriers.length &&
                  carriers.map((carrier, index) => (
                    <option key={carrier._id} value={index}>
                      {carrier.name} | {carrier.email}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div>
            <div className={"input-chips-wrapper"}>
              {selectedCarriers &&
                selectedCarriers.map((eq, index) => (
                  <div key={eq + index} className={"chip-item"}>
                    {eq.email}
                    <div onClick={() => removeItem(eq._id)}>
                      <Cross />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <div>
              <h3>
                Status <span>*</span>
              </h3>
              <select name={"status"}>
                <option value={"active"}>active</option>
                <option value={"inactive"}>inactive</option>
              </select>
            </div>
          </div>
        </form>
      </RightModalComponent>
    </div>
  );
}
