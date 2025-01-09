"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import "./styles.css";
import Chevron from "@/public/icons/16px/chevron-right.svg";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { useEffect, useState } from "react";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { useDebouncedCallback } from "use-debounce";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";
import EmptyTableComponent from "@/common/components/empty-table.component";

export default function RqTemplatesComponent() {
  const {
    setCanChangePage,
    canChangePage,
    addData,
    validateAndGoForward,
    type,
  } = useRegisterQuoteContext();
  const [templates, setTemplates] = useState();
  const [loading, setLoading] = useState(true);

  const getTemplatesDebounced = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth(`/quote/templates?type=${type ?? ""}`, true).then((data) => {
      setTemplates(data);
      setLoading(false);
    });
  }, 1000);

  const deleteTemplateDebounced = useDebouncedCallback((id) => {
    postWithAuth("/quote/delete-template", { template_id: id });
  }, 350);

  useEffect(() => {
    getTemplatesDebounced();
  }, []);

  const selectTemplate = useDebouncedCallback((data) => {
    addData({ form: "default", data });
    validateAndGoForward();
  });

  useEffect(() => {
    setCanChangePage(PageStateEnum.NO_VALIDITY);
  }, [canChangePage]);

  return (
    <div className={"rq-templates"}>
      <div className={"template-title"}>
        <h2>Select Template</h2>
        <h4>Select a template or create a new request</h4>

        <div className={"action-panel"}>
          <div className={"search-template"}>
            <SearchInputComponent placeholder={"Search Templates"} />
          </div>

          {/*<button className={"create-template"}>*/}
          {/*  <PlusCircle />*/}
          {/*  Create Template*/}
          {/*</button>*/}
        </div>
      </div>

      <div className={"templates-list"}>
        {loading ? (
          <Loading2Component />
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Equipment</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {templates &&
                templates?.map(({ name, quote_data, _id }, index) => {
                  const pickupAddress = quote_data.addresses.filter(
                    ({ address_type }) => address_type === "pickup",
                  );
                  const dropAddress = quote_data.addresses.filter(
                    ({ address_type }) => address_type === "drop",
                  );
                  let open = false;

                  return (
                    <tr
                      key={_id + index}
                      onClick={() => selectTemplate(quote_data)}
                    >
                      <td>
                        <div className={"main-text"}>{name}</div>
                      </td>
                      <td className={"pickup"}>
                        <div className={"location-styling"}>
                          {/*<ArrowUp />*/}
                          <div>
                            <div className={"location main-text"}>
                              {pickupAddress[0].partial_address}

                              {pickupAddress.length >= 2 && (
                                <>
                                  <div className={"extra-address"}>
                                    +{pickupAddress.length - 1}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className={"date sub-text"}>
                              {pickupAddress[0]?.company_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={"drop"}>
                        <div className={"location-styling"}>
                          {/*<ArrowDown />*/}

                          <div>
                            <div className={"location main-text"}>
                              {dropAddress[0].partial_address}

                              {dropAddress.length >= 2 && (
                                <>
                                  <div className={"extra-address"}>
                                    +{dropAddress.length - 1}
                                  </div>
                                </>
                              )}
                            </div>
                            <div className={"date sub-text"}>
                              {dropAddress[0]?.company_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className={"main-text"}>
                          53’ Dryvan, 53’ Reefer
                        </div>
                      </td>
                      <td>
                        <div className={"template-actions"}>
                          <button
                            className={"edit-template-btn"}
                            onClick={(ev) => {
                              ev.stopPropagation();
                              document.getElementById(
                                name + index,
                              ).style.display = "flex";
                            }}
                          >
                            Delete Template
                          </button>

                          <div
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            <ConfirmActionComponent
                              title={`Delete template "${name}" ?`}
                              id={name + index}
                              action={() => {
                                deleteTemplateDebounced(_id);
                                getTemplatesDebounced();
                              }}
                            />
                          </div>

                          <div className={"chevron-svg"}>
                            <Chevron />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        )}
        {templates && !templates?.length && (
          <div
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <EmptyTableComponent button={<h5>No templates found</h5>} />
          </div>
        )}
      </div>
    </div>
  );
}
