import "./styles.css";

import Calendar from "@/public/icons/30px/calendar.svg";
import Clock from "@/public/icons/30px/clock.svg";
import Cog from "@/public/icons/30px/cog.svg";
import Archive from "@/public/icons/30px/archive.svg";
import DollarSign from "@/public/icons/30px/dollar-sign.svg";
import Gym from "@/public/icons/30px/gym.svg";
import Database from "@/public/icons/30px/database.svg";
import EqTruck from "@/public/icons/30px/eq-truck.svg";
import Group from "@/public/icons/30px/group.svg";
import StickyNotes from "@/public/icons/30px/sticky-notes-2.svg";
import OpenBox from "@/public/icons/30px/open-box.svg";
import Routes from "@/public/icons/30px/routes.svg";
import Biohazard from "@/public/icons/30px/hazardous-material.svg";
import {
  extractAccessorialsFromObj,
  extractReferenceNo,
} from "@/common/utils/data-convert.utils";
import { formatDate } from "@/common/utils/date.utils";
import { ShippingHoursEnum } from "@/app/get-quote/components/location-ftl-ltl-form/location-form.component";

export default function QuoteFtlComponent({ quote }: any) {
  const reference = extractReferenceNo(quote.shipment);

  return (
    <div className={"quote-ftl"}>
      <div className={"title"}>
        <h2>QUOTE DETAILS</h2>

        <div>
          <h4>PO / Reference No.</h4>
          <h3>{reference ? reference.join(",") : "N/A"}</h3>
        </div>
      </div>

      <div className={"info-2blocks"}>
        <div>
          <Group />
          <h4>Type: </h4>
          <h3>{quote.type}</h3>
        </div>

        <div>
          <EqTruck />

          <h4>Equipment: </h4>
          <h3>{quote.equipment}</h3>
        </div>
      </div>

      <div className={"locations"}>
        <div className={"location-title"}>
          <Routes />
          <h4>Locations</h4>
        </div>

        <div className={"locations-wrapper"}>
          {quote.pickup &&
            quote.pickup.map((location, index) => {
              const locationAccessorials = extractAccessorialsFromObj(location);
              return (
                <div className={"location-item"} key={location.address + index}>
                  <h3>PICKUP {quote.pickup.length > 1 ? index + 1 : ""}</h3>

                  <div className={"location-circle"}>
                    <div className={"circle-line"}></div>
                  </div>

                  <div className={"location-info"}>
                    <h3>{location.address}</h3>

                    {location.addTime === "yes" && (
                      <div>
                        <Calendar />
                        <h4>Date:</h4>
                        <h3>
                          {formatDate(location.date) +
                            "   ," +
                            ShippingHoursEnum[location.shippingHoursType]}
                        </h3>
                      </div>
                    )}

                    {location.addTime === "yes" && (
                      <div>
                        <Clock />
                        <h4>Time:</h4>
                        <h3>
                          {location.locationTimeStart}
                          {location.locationTimeEnd
                            ? " - " + location.locationTimeEnd
                            : ""}
                        </h3>
                      </div>
                    )}

                    {!!location.locationNotes.length && (
                      <div>
                        <StickyNotes />
                        <h4>Notes:</h4>
                        <h3>{location.locationNotes}</h3>
                      </div>
                    )}

                    {locationAccessorials && (
                      <div>
                        <Cog />
                        <h4>Accessorials:</h4>
                        <h3>{locationAccessorials.join(", ")}</h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          {quote.drop &&
            quote.drop.map((location, index) => {
              const locationAccessorials = extractAccessorialsFromObj(location);
              return (
                <div
                  className={"location-item"}
                  key={location.address + index + "drop"}
                >
                  <h3>DELIVERY {quote.pickup.length > 1 ? index + 1 : ""}</h3>

                  <div className={"location-circle"}>
                    <div className={"circle-line"}></div>
                  </div>

                  <div className={"location-info"}>
                    <h3>{location.address}</h3>

                    {location.addTime === "yes" && (
                      <div>
                        <Calendar />
                        <h4>Date:</h4>
                        <h3>
                          {formatDate(location.date) +
                            "   ," +
                            ShippingHoursEnum[location.shippingHoursType]}
                        </h3>
                      </div>
                    )}

                    {location.addTime === "yes" && (
                      <div>
                        <Clock />
                        <h4>Time:</h4>
                        <h3>
                          {location.locationTimeStart}
                          {location.locationTimeEnd
                            ? " - " + location.locationTimeEnd
                            : ""}
                        </h3>
                      </div>
                    )}

                    {!!location.locationNotes.length && (
                      <div>
                        <StickyNotes />
                        <h4>Notes:</h4>
                        <h3>{location.locationNotes}</h3>
                      </div>
                    )}

                    {locationAccessorials && (
                      <div>
                        <Cog />
                        <h4>Accessorials:</h4>
                        <h3>{locationAccessorials.join(", ")}</h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>

        <div className={"info-2blocks"}>
          <div>
            <Database />
            <h4>Packing method: </h4>
            <h3>{quote.shipment.packing_method.toLowerCase()}</h3>
          </div>

          <div>
            <Archive />
            <h4>Packing type: </h4>
            <h3>{quote.shipment.packing_type}</h3>
          </div>
        </div>

        <div className={"info-2blocks"}>
          <div>
            <OpenBox />
            <h4>Commodity: </h4>
            <h3>{quote.commodity}</h3>
          </div>

          <div>
            <Gym />
            <h4>Weight: </h4>
            <h3>
              {quote.shipment.weight +
                " " +
                quote.shipment.weight_type.toLowerCase() +
                ", " +
                quote.shipment.quantity +
                " units"}
            </h3>
          </div>
        </div>

        <div className={"info-2blocks"}>
          <div>
            <DollarSign />
            <h4>Goods value: </h4>
            <h3>${quote.shipment.goods_value}.00</h3>
          </div>

          <div>
            <Cog />
            <h4>Accessorials: </h4>
            <h3>{quote.accessorials}</h3>
          </div>
        </div>

        {quote.shipment.hazardous_goods === "yes" && (
          <div className={"hazard-warning"}>
            <Biohazard />

            <div className={"info"}>
              <h3>This shipment contains hazardous commodities!</h3>

              <div>
                <h4>UN: {quote.shipment.un_id_number}</h4>
                <h4>
                  Emergency Contact: {quote.shipment.emergency_name},{" "}
                  {quote.shipment.emergency_phone}{" "}
                  {quote.shipment.emergency_phone2}
                </h4>
              </div>
            </div>
          </div>
        )}

        <div className={"special-instructions"}>
          <div>
            <StickyNotes />
            <h4>Special instructions:</h4>
          </div>

          <h3>{quote.shipment.special_instructions}</h3>
        </div>
      </div>
    </div>
  );
}
