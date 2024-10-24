"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import PlusCircle from "@/public/icons/24px/plus-circle.svg";
import { partnersMock } from "@/app/get-quote/pages/partners/mock-data";
import "@/app/get-quote/pages/team-members/styles.css";
import MembersTableComponent from "@/app/settings/components/members-table.component";
import "./styles.css";
import RightModalComponent from "@/common/components/right-form-modal/right-modal.component";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { formDataToJSON } from "@/common/utils/formData.util";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import useStore from "@/common/hooks/use-store.context";
import PaginationComponent from "@/common/components/pagination/pagination.component";
import { paginationConfig } from "@/common/config/pagination.config";

export default function UsersSettingsPage() {
  const { showToast } = useStore();
  const [open, setOpen] = useState<boolean>(false);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const saveDate = useDebouncedCallback((data) => {
    postWithAuth("/users/create-member", data).then(async (response) => {
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
        text: "User was added successfully",
        duration: 5000,
      });
    });
  }, 350);

  const validateAndSave = () => {
    const form = document.forms["newUserForm"];
    const valid = form.reportValidity();

    if (valid) {
      const formData = new FormData(form);
      saveDate(formDataToJSON(formData));
      setOpen(false);
      getMembersDebounced();
    }
  };

  const getMembersDebounced = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth(
      `/users/members?skip=${(page - 1) * paginationConfig.pageLimit}&limit=${paginationConfig.pageLimit}&searchText=${search ?? ""}`,
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

      <RightModalComponent
        open={open}
        setOpen={setOpen}
        title={"Add User"}
        action={validateAndSave}
      >
        <form name={"newUserForm"} className={"new-user-form"}>
          <div>
            <div>
              <h3>
                Name <span>*</span>
              </h3>
              <input
                type={"text"}
                name={"name"}
                placeholder={"Type here..."}
                required
                maxLength={20}
              />
            </div>
            <div>
              <h3>
                Position <span>*</span>
              </h3>
              <input
                type={"text"}
                name={"position"}
                placeholder={"Type here..."}
                maxLength={20}
                required
              />
            </div>
          </div>

          <div>
            <div>
              <h3>
                Email <span>*</span>
              </h3>
              <input
                type={"text"}
                name={"email"}
                placeholder={"Type here..."}
                required
              />
            </div>
            <div>
              <h3>
                Phone <span>*</span>
              </h3>
              <input
                type={"text"}
                name={"phone"}
                placeholder={"Type here..."}
                pattern="^(\+?1)?[0-9]{9,10}$"
                title={"Invalid phone number, +1 XXXX XXXXXX"}
                onChange={(ev) =>
                  (ev.target.value = ev.target.value.replace(/\s/g, ""))
                }
                required
              />
            </div>
          </div>

          <div>
            <div>
              <h3>Status</h3>
              <select
                className={"status-select"}
                name={"status"}
                defaultValue={"active"}
                required
              >
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
