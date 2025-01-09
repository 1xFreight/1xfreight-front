import { formatDate } from "@/common/utils/date.utils";
import Image from "next/image";
import MapMarker from "@/public/png/map-marker.png";
import Mail from "@/public/icons/pdf-icons/mail.svg";
import Phone from "@/public/icons/pdf-icons/phone.svg";
import Notes from "@/public/icons/30px/sticky-notes-2.svg";
import Watch from "@/public/icons/30px/clock.svg";
import Dollar from "@/public/png/dollar.png";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import { clearText } from "@/common/utils/data-convert.utils";
import React from "react";

export default function TestX() {
  return (
    <>
      <div className={"header-pdf"}>
        <div className={"left-header"}>
          <div className={"pdf-date-created"}>{formatDate(Date.now())}</div>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${quote?.author?.logo}`}
            alt={"logo"}
          />
          <div className={"bol-legal-subtitle"}>
            STRAIGHT BILL OF LADING ( ORIGINAL NON NEGOTIABLE)
          </div>
        </div>

        <div className={"bol-text"}>BOL</div>
      </div>

      <div className={"ids-and-refs"}>
        <div className={"left-div"}>
          <div className={"bol-id"}>{bolId}</div>
          <div className={"ref-div"}>
            <div>
              <span>Ref #</span> {referenceNumber}
            </div>
            <div>{selectedEquipment}</div>
          </div>
        </div>

        <div className={"right-part"}>
          <div className={"quote-author-name"}>
            {quote?.local_carrier?.name}
          </div>
          <div className={"quote-type-img"}>
            <img src={typeImageMapping[quote?.type]?.src} alt={"type"} />
          </div>
        </div>
      </div>

      <div className={"locations-wrapper-pdf"}>
        <div className={"pickup-wrapper-pdf"}>
          {quote?.addresses?.map((address) => {
            if (address?.address_type !== "pickup") return;
            return (
              <div key={address._id} className={"location-item"}>
                <div className={"location-header"}>
                  <div className={"icon-box"}>
                    <Image src={MapMarker} alt={"map-marker"} width={150} />
                  </div>
                  <div className={"location-datetime"}>
                    Pickup {!!address?.date && `on ${formatDate(address.date)}`}
                    {(address.time_start?.length < 10 ||
                      address.time_end?.length < 10) &&
                      " at "}
                    {address.time_start?.length < 10 ? address.time_start : ""}
                    {address.time_end?.length < 10 && ` - ${address.time_end}`}
                  </div>
                </div>
                <div className={"location-details"}>
                  <div className={"location-address"}>
                    <div className={"location-company"}>
                      {address?.company_name}
                    </div>
                    <div>{address?.street}</div>
                    <div>{address?.partial_address}</div>
                  </div>

                  <div className={"location-company-contacts"}>
                    <div className={"company-contact"}>
                      {address?.contact_name}
                    </div>

                    <div className={"contacts-info"}>
                      <div>
                        <Mail />
                        {address?.contact_email}
                      </div>
                      <div>
                        <Phone />
                        {address?.contact_phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={"location-notifications"}>
                  <Notes />
                  {address?.notes}
                </div>

                <div className={"location-open-hours"}>
                  <Watch />
                  {address?.open_hours}
                </div>
              </div>
            );
          })}
        </div>
        <div className={"drop-wrapper-pdf"}>
          {quote?.addresses?.map((address) => {
            if (address?.address_type !== "drop") return;
            return (
              <div key={address._id} className={"location-item"}>
                <div className={"location-header"}>
                  <div className={"icon-box"}>
                    <img src={MapMarker?.src} alt={"map-marker"} />
                  </div>
                  <div className={"location-datetime"}>
                    Drop {!!address?.date && `on ${formatDate(address.date)}`}
                    {(address.time_start?.length < 10 ||
                      address.time_end?.length < 10) &&
                      " at "}
                    {address.time_start?.length < 10 ? address.time_start : ""}
                    {address.time_end?.length < 10 && ` - ${address.time_end}`}
                  </div>
                </div>
                <div className={"location-details"}>
                  <div className={"location-address"}>
                    <div className={"location-company"}>
                      {address?.company_name}
                    </div>
                    <div>{address?.street}</div>
                    <div>{address?.partial_address}</div>
                  </div>

                  <div className={"location-company-contacts"}>
                    <div className={"company-contact"}>
                      {address?.contact_name}
                    </div>

                    <div className={"contacts-info"}>
                      <div>
                        <Mail />
                        {address?.contact_email}
                      </div>
                      <div>
                        <Phone />
                        {address?.contact_phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className={"location-notifications"}>
                  <Notes />
                  {address?.notes}
                </div>

                <div className={"location-open-hours"}>
                  <Watch />
                  {address?.open_hours}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {!!quote?.details_?.customs_broker_name && (
        <div className={"customs-broker"}>
          <div className={"country-png"}>
            <img
              src={
                brokerCountryImageMapping[
                  quote?.addresses?.filter(
                    ({ address_type }) => address_type === "drop",
                  )[0].country
                ].src
              }
              alt={"country"}
            />
          </div>

          <div className={"broker"}>{quote?.details_?.customs_broker_name}</div>

          <div className={"broker"}>
            <Mail />
            {quote?.details_?.customs_broker_email}
          </div>
          <div className={"broker"}>
            <Phone />
            {quote?.details_?.customs_broker_phone}
          </div>
        </div>
      )}

      <div className={"billing-info"}>
        <div className={"dollar-png"}>
          <img src={Dollar?.src} alt={"dollar"} />
        </div>

        <div className={"billing-to"}>
          Bill to: <span>{billingInfo?.bill_to}</span>
        </div>

        <div className={"billing-to"}>
          <img src={MapMarker?.src} alt={"map-marker"} />
          <span>{billingInfo?.billing_address}</span>
        </div>

        <div className={"contacts-info-billing"}>
          <div>
            <Mail />
            {billingInfo?.billing_email}
          </div>
          <div>
            <Phone />
            {billingInfo?.billing_phone}
          </div>
        </div>
      </div>

      {bolNotes && (
        <div className={"billing-info"}>
          <div className={"info-png"}>i</div>

          <div className={"billing-to"}>
            <span>{bolNotes}</span>
          </div>
        </div>
      )}

      <div className={"items-table"}>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Quantity</th>
              <th>Handling unit</th>
              <th>Dimensions</th>
              <th>Commodity</th>
              <th>Hazmat</th>
              <th>Weight</th>
            </tr>
          </thead>
          <tbody>
            {quote?.type !== QuoteTypeEnum.LTL && (
              <>
                <tr>
                  <td>1</td>
                  <td>{quote?.details_?.quantity}</td>
                  <td>{clearText(quote?.details_?.packing_method)}</td>
                  <td></td>
                  <td>{quote?.details_?.commodity}</td>
                  <td>
                    {quote?.details_?.hazardous_goods ? (
                      <div className={"hazard-td"}>
                        <div>UN: {quote?.details_?.un_number}</div>
                        <div>
                          Contact: {quote?.details_?.emergency_contact},{" "}
                          {quote?.details_?.emergency_phone1}
                        </div>
                      </div>
                    ) : (
                      "------"
                    )}
                  </td>
                  <td>
                    {quote?.details_?.weight} {quote?.details_?.weight_unit}
                  </td>
                </tr>

                <tr className={"total-tr"}>
                  <td>Total</td>
                  <td>{quote?.details_?.quantity}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {quote?.details_?.weight} {quote?.details_?.weight_unit}
                  </td>
                </tr>
              </>
            )}

            {quote?.items?.map((item, index) => (
              <>
                <tr>
                  <td>{index + 1}</td>
                  <td>{item?.quantity}</td>
                  <td>{item?.handling_unit}</td>
                  <td>
                    {item.width} x {item.length} x {item.height}
                  </td>
                  <td>{item.commodity}</td>
                  <td>
                    {item.un_number ? (
                      <div className={"hazard-td"}>
                        <div>UN: {item.un_number}</div>
                        <div>
                          Contact: {item.emergency_contact},{" "}
                          {item.emergency_phone}
                        </div>
                      </div>
                    ) : (
                      "------"
                    )}
                  </td>
                  <td>{item.weight} lb/unit</td>
                </tr>

                {index + 1 == quote?.items?.length && (
                  <tr className={"total-tr"}>
                    <td>Total</td>
                    <td>{quote?.details_?.quantity}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      {quote?.details_?.weight} {quote?.details_?.weight_unit}
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className={"sign-divs"}>
        {quote?.addresses &&
          [
            ...quote?.addresses
              ?.sort((a, b) => {
                // First sort by address_type ("pickup" before "drop")
                if (a.address_type === b.address_type) {
                  // If address_type is the same, sort by order
                  return a.order - b.order;
                }
                return a.address_type === "pickup" ? -1 : 1;
              })
              .map((address) => address.company_name),
            quote?.local_carrier?.name,
          ].map((name) => (
            <div className={"sign-item"} key={name}>
              <div className={"sign-item-row"}>
                <div className={"name"}>{name}</div>
                <div className={"sign-extra"}>
                  <span>Units</span>
                </div>
              </div>

              <div className={"sign-item-row"}>
                <div className={"sign"}>
                  <span>Sign</span>
                </div>
                <div className={"sign-extra"}>
                  <span>Date</span>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className={"info-footer"}>
        Notice: Freight moving under this Bill of Lading is subject to
        classifications and tariffs established by the carrier and are available
        to the shipper upon request. This notice supersedes and negates any
        claimed oral or written contract, promise, representation, or
        understanding between parties, except to the extent of any written
        contract signed by both parties to the contract. The carrier certifies
        that only ARB-compliant equipment will be dispatched on California
        highways or railways. Any unauthorized alteration or use of this Bill of
        Lading, or the tendering of this shipment to any carrier other than that
        designated by the company, may VOID the company’s obligations to make
        any payments relating to this shipment and VOID all rate quotes. All
        shippers, consignors, consignees, freight forwarders, or freight brokers
        are jointly and severally liable for the freight charges relating to
        this shipment. I hereby declare that the contents of this consignment
        are fully and accurately described above by the proper shipping name,
        are classified, packaged, marked, and labeled/placarded, and are in all
        respects in proper condition for transport according to applicable
        international and national governmental regulations.
      </div>
    </>
  );
}
