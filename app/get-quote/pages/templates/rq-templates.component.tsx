"use client";

import SearchInputComponent from "@/common/components/search-input/search-input.component";
import "./styles.css";
import ArrowUp from "@/public/icons/24px/arrow-up.svg";
import ArrowDown from "@/public/icons/24px/arrow-down.svg";
import Edit from "@/public/icons/24px/edit-circle.svg";
import Chevron from "@/public/icons/16px/chevron-right.svg";
import { mockData } from "@/app/quotes/components/quotes-table/mock-data";
import Info from "@/public/icons/14px/info-circle.svg";
import ExtraAddressWindowComponent from "@/common/components/extra-addresses-window/extra-address-window.component";
import useRegisterQuoteContext from "@/app/get-quote/use-register-quote-context.hook";
import { PageStateEnum } from "@/app/get-quote/register-quote.context";
import { useEffect, useMemo, useState } from "react";
import { getWithAuth, postWithAuth } from "@/common/utils/fetchAuth.util";
import { useDebouncedCallback } from "use-debounce";
import LoadingComponent from "@/common/components/loading/loading.component";
import Loading2Component from "@/common/components/loading/loading-as-page.component";
import ConfirmActionComponent from "@/common/components/confirm-action/confirm-action.component";

export default function RqTemplatesComponent() {
  const { setCanChangePage, canChangePage, addData, validateAndGoForward } =
    useRegisterQuoteContext();
  const [templates, setTemplates] = useState();
  const [loading, setLoading] = useState(true);

  const getTemplatesDebounced = useDebouncedCallback(() => {
    setLoading(true);
    getWithAuth("/quote/templates").then((data) => {
      setTemplates(data);
      setLoading(false);
    });
  }, 1000);

  const deleteTemplateDebounced = useDebouncedCallback((id) => {
    postWithAuth("/quote/delete-template", { template_id: id });
  }, 500);

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
                <th>name</th>
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
                        <div className={"location main-text"}>
                          <ArrowUp />
                          {pickupAddress[0].address}

                          {pickupAddress.length >= 2 && (
                            <>
                              <div className={"extra-address"}>
                                +{pickupAddress.length - 1}
                                <Info />
                                <ExtraAddressWindowComponent
                                  stops={pickupAddress}
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div className={"date sub-text"}>
                          {pickupAddress[0].date}
                        </div>
                      </td>
                      <td className={"drop"}>
                        <div className={"location main-text"}>
                          <ArrowDown />
                          {dropAddress[0].address}

                          {dropAddress.length >= 2 && (
                            <>
                              <div className={"extra-address"}>
                                +{dropAddress.length - 1}
                                <Info />
                                <ExtraAddressWindowComponent
                                  stops={dropAddress}
                                />
                              </div>
                            </>
                          )}
                        </div>
                        <div className={"date sub-text"}>
                          {dropAddress[0].date}
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
      </div>
    </div>
  );
}
