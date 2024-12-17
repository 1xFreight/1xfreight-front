import "./styles.css";
import FTL from "@/public/png/full-truck.png";
import LTL from "@/public/png/half-truck.png";
import Ocean from "@/public/png/ocean-transportation.png";
import Air from "@/public/png/air-transportation.png";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import Image from "next/image";
import React, { useState } from "react";
import { clearText, toShortId } from "@/common/utils/data-convert.utils";
import { formatDate } from "@/common/utils/date.utils";
import Database from "@/public/icons/30px/database.svg";
import ExpandAlt from "@/public/icons/30px/expand-alt.svg";
import Archive from "@/public/icons/30px/archive.svg";
import OpenBox from "@/public/icons/30px/open-box.svg";
import Gym from "@/public/icons/30px/gym.svg";
import DollarSign from "@/public/icons/30px/dollar-sign.svg";
import Cog from "@/public/icons/30px/cog.svg";
import TempUp from "@/public/icons/30px/temperature-arrow-up(1).svg";
import TempDown from "@/public/icons/30px/temperature-arrow-down(1).svg";
import EqTruck from "@/public/icons/30px/eq-truck.svg";
import AddNote from "@/public/icons/24px/add-note2.svg";
import Template from "@/public/icons/24px/archive.svg";
import Document from "@/public/icons/24px/document2.svg";
import Delete from "@/public/icons/24px/delete 1.svg";
import Arrow from "@/public/icons/40px/Arrow 1.svg";
import Packages from "@/public/png/sparkle.png";

const typeImageMapping = {
  [QuoteTypeEnum.FTL]: FTL,
  [QuoteTypeEnum.LTL]: LTL,
  [QuoteTypeEnum.FCL]: Ocean,
  [QuoteTypeEnum.AIR]: Air,
};

export default function QuoteModalPreviewComponent({ quote, setQuote }) {
  const reference = quote?.references;
  const pickup =
    quote?.addresses?.filter(({ address_type }) => address_type === "pickup") ??
    quote?.pickup;
  const drop =
    quote?.addresses?.filter(({ address_type }) => address_type === "drop") ??
    quote?.drop;
  const details = quote?.details ? quote?.details[0] : quote?.shipment_details;
  const items = quote?.items?.length ? quote.items : details?.items;

  if (!quote) return;

  return (
    <div className={"quote-modal-preview"} id={"quote-modal-preview"}>
      <div>
        <div className={"qm-header"}>
          <div className={"quote-type"}>
            <Image
              src={typeImageMapping[quote?.type]}
              alt={"type"}
              width={55}
            />
            {quote?.type}
            <span>{quote?.equipments?.join(", ")}</span>
          </div>
          <h3 className={"quote-short-id"}>#{toShortId(quote?._id)}</h3>
        </div>

        <div className={"qm-content"}>
          <div className={"locations-wrapper"}>
            <div className={"pickup-locations"}>
              <h3>Pickup</h3>

              {pickup?.map((location, index) => (
                <>
                  <div key={location._id} className={"location-item"}>
                    <Image
                      src={Packages}
                      alt={"location"}
                      width={30}
                      quality={100}
                    />
                    <div className={"location-details-wrapper"}>
                      <div className={"company-name"}>
                        {location.company_name}
                      </div>
                      <div className={"main-text-address"}>
                        {location.partial_address}
                      </div>
                      <div className={"sub-text-address"}>
                        {formatDate(location.date)} {location.time_start}{" "}
                        {location.time_end ? " - " + location.time_end : ""}
                      </div>
                    </div>
                  </div>
                  {pickup[index + 1] && (
                    <div className={"between-address-arrow"}>
                      <Arrow />
                    </div>
                  )}
                </>
              ))}
            </div>
            <div className={"drop-locations"}>
              <h3>Drop</h3>

              {drop?.map((location, index) => (
                <>
                  <div key={location._id} className={"location-item"}>
                    <Image
                      src={Packages}
                      alt={"location"}
                      width={30}
                      quality={100}
                    />
                    <div className={"location-details-wrapper"}>
                      <div className={"company-name"}>
                        {location.company_name}
                      </div>
                      <div className={"main-text-address"}>
                        {location.partial_address}
                      </div>
                      <div className={"sub-text-address"}>
                        {formatDate(location.date)} {location.time_start}{" "}
                        {location.time_end ? " - " + location.time_end : ""}
                      </div>
                    </div>
                  </div>
                  {drop[index + 1] && (
                    <div className={"between-address-arrow"}>
                      <Arrow />
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>

          <div className={"quote-details"}>
            <div className={"details-wrapper"}>
              {/*{!!quote?.equipments?.length && (*/}
              {/*  <div>*/}
              {/*    <EqTruck />*/}
              {/*    <h4>Equipment: </h4>*/}
              {/*    <h3>{quote?.equipments?.join(",")}</h3>*/}
              {/*  </div>*/}
              {/*)}*/}

              {reference &&
                reference.map((ref, index) => (
                  <div key={ref}>
                    <span>{index + 1}</span>
                    <h4>PO/Reference No: </h4>
                    <h3>{ref}</h3>
                  </div>
                ))}
              {!!details?.packing_method && (
                <div>
                  <Database />
                  <h4>Packing method: </h4>
                  <h3
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {clearText(details?.packing_method)}
                  </h3>
                </div>
              )}

              {!!details?.skid_spots && (
                <div>
                  <ExpandAlt />
                  <h4>Est. skid spots: </h4>
                  <h3
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {details?.skid_spots}
                  </h3>
                </div>
              )}

              {!!details?.volume && (
                <div>
                  <Database />
                  <h4>volume: </h4>
                  <h3>{details?.volume.toFixed(2)} ft3</h3>
                </div>
              )}

              {!!details?.density && (
                <div>
                  <Archive />
                  <h4>density: </h4>
                  <h3>
                    {details?.density.toFixed(2)} {details.weight_unit}/ft3
                  </h3>
                </div>
              )}

              {!!details?.packing_type && (
                <div>
                  <Archive />
                  <h4>Packing type: </h4>
                  <h3>{details?.packing_type}</h3>
                </div>
              )}

              {!!details?.commodity && (
                <div>
                  <OpenBox />
                  <h4>Commodity: </h4>
                  <h3>{details?.commodity}</h3>
                </div>
              )}

              {!!details?.weight &&
                !!details?.weight_unit &&
                !!details?.quantity && (
                  <div>
                    <Gym />
                    <h4>Weight: </h4>
                    <h3>
                      {details?.weight +
                        " " +
                        details?.weight_unit +
                        ", " +
                        details?.quantity +
                        " units"}
                    </h3>
                  </div>
                )}

              <div>
                <DollarSign />
                <h4>Goods value: </h4>
                <h3>${details?.goods_value}.00</h3>
              </div>

              {!!details?.accessorials?.length && (
                <div>
                  <Cog />
                  <h4>Accessorials: </h4>
                  <h3>{details?.accessorials?.join(", ")}</h3>
                </div>
              )}

              {details?.min_temp && details?.max_temp && (
                <>
                  <div className={"temp-reefer"}>
                    <TempUp />
                    <h4>Max Temp: </h4>
                    <h3>{details?.max_temp + " "}°F</h3>
                  </div>

                  <div className={"temp-reefer"}>
                    <TempDown />
                    <h4>Min Temp: </h4>
                    <h3>{details?.min_temp + " "}°F</h3>
                  </div>
                </>
              )}

              {!!quote?.load_number && (
                <div>
                  <OpenBox />
                  <h4>Load numbers: </h4>
                  <h3>{quote?.load_number}</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={"qm-preview-actions"}>
        <button>Cancel load</button>
        <button>Duplicate</button>
        <button>Make Template</button>
        <button>Add PO#</button>
        <button className={"variant2"}>view details</button>
      </div>
    </div>
  );
}
