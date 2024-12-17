"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  clearText,
  concatReferencesByType,
  toShortId,
} from "@/common/utils/data-convert.utils";
import "./styles.css";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import { formatDate } from "@/common/utils/date.utils";
import { generateCustomID } from "@/common/utils/number.utils";
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import Image from "next/image";
import FTL from "@/public/png/full-truck.png";
import LTL from "@/public/png/half-truck.png";
import Ocean from "@/public/png/ocean-transportation.png";
import Air from "@/public/png/air-transportation.png";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum";
import MapMarker from "@/public/png/map-marker.png";
import Dollar from "@/public/png/dollar.png";
import Mail from "@/public/icons/pdf-icons/mail.svg";
import Phone from "@/public/icons/pdf-icons/phone.svg";
import Notes from "@/public/icons/30px/sticky-notes-2.svg";
import Watch from "@/public/icons/30px/clock.svg";
import Canada from "@/public/png/maple 1.png";
import USA from "@/public/png/usa 1.png";
import Mexico from "@/public/png/mexican-republic-map-black-shape 1.png";
import useStore from "@/common/hooks/use-store.context";
import ToastTypesEnum from "@/common/enums/toast-types.enum";
import SendToCarrierButton from "@/app/docs/bol/[quote_id]/components/send-to-carrier.button";

const typeImageMapping = {
  [QuoteTypeEnum.FTL]: FTL,
  [QuoteTypeEnum.LTL]: LTL,
  [QuoteTypeEnum.FCL]: Ocean,
  [QuoteTypeEnum.AIR]: Air,
};

const brokerCountryImageMapping = {
  ["US"]: USA,
  ["MX"]: Mexico,
  ["CA"]: Canada,
};

export default function ViewBOLPage({ params }) {
  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [referenceNumber, setReference] = useState<string>("");
  const [selectedEquipment, setSelectedEquipment] = useState<string>("");
  const [bolId, setBolId] = useState<string>("");
  const [bolNotes, setBolNotes] = useState<string>("");
  const pdfRef = useRef<HTMLDivElement>(null);
  const { showToast, session } = useStore();
  const [billingInfo, setBillingInfo] = useState({
    bill_to: null,
    billing_address: null,
    billing_email: null,
    billing_phone: null,
    type: "collect",
  });

  const getQuote = useDebouncedCallback(() => {
    getWithAuth(`/quote/shipments?limit=1&id=${params.quote_id}`).then(
      (data) => {
        const quoteObj = { ...data?.quotes[0] };
        setQuote(quoteObj);
        setLoading(false);
        setReference(concatReferencesByType(quoteObj.references));
        setSelectedEquipment(quoteObj?.equipments[0]);
        setBolId(toShortId(params.quote_id));
        changeBillingInfo("prepaid");
      },
    );
  });

  const changeBillingInfo = (
    type: "prepaid" | "collect" | "third-party",
    address_id = null,
  ) => {
    switch (type) {
      case "prepaid":
        setBillingInfo({
          bill_to: session?.name,
          billing_address: session?.billing_address,
          billing_email: session?.billing_email,
          billing_phone: session?.billing_phone,
          type: "prepaid",
        });
        break;

      case "collect":
        const locations = quote?.addresses;
        let collectLocation;

        address_id
          ? (collectLocation = locations?.find(({ _id }) => _id === address_id))
          : (collectLocation = locations[0]);

        setBillingInfo({
          bill_to: collectLocation?.company_name,
          billing_address: collectLocation?.address,
          billing_email: collectLocation?.contact_email,
          billing_phone: collectLocation?.contact_phone,
          type: "collect",
        });
        break;

      case "third-party":
        const carrier = quote?.local_carrier;
        setBillingInfo({
          bill_to: carrier?.name,
          billing_address: carrier?.address,
          billing_email: carrier?.email,
          billing_phone: carrier?.phone,
          type: "third-party",
        });
        break;
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  // Function to generate PDF
  const downloadPDF = async (getPdf = false) => {
    try {
      const domElement = document.getElementById("pdfRef"); // Ensure your target element has this ID

      if (!domElement) {
        console.error("Element with ID 'pdfRef' not found.");
        return;
      }

      // Convert the DOM element to a PNG image

      const dataUrl = await htmlToImage.toJpeg(domElement, {
        quality: 1, // Lower quality for smaller size
        pixelRatio: 2,
      });

      // Initialize jsPDF with US Letter format
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "in",
        format: "letter", // US Letter format
      });

      // Calculate dimensions to fit the image into US Letter size
      const pageWidth = 8.5; // US Letter width in inches
      const pageHeight = 11; // US Letter height in inches

      const imgProps = pdf.getImageProperties(dataUrl);
      const imgWidth = pageWidth - 1; // Leave 0.5 inch margin on both sides
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width; // Maintain aspect ratio

      // Add the image to the PDF
      const xOffset = 0.35; // Center horizontally with a 0.5-inch margin
      const yOffset = 0.35; // Top margin
      pdf.addImage(dataUrl, "JPEG", xOffset, yOffset, imgWidth, imgHeight);

      // Save the PDF

      if (getPdf) {
        const pdfBlob = pdf.output("blob");
        const fileName = `BOL_${bolId}.pdf`; // Replace `bolId` with your ID variable

        return new File([pdfBlob], fileName, { type: "application/pdf" });
      } else {
        pdf.save(`BOL_${bolId}.pdf`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className={"bol-page"}>
      <div className={"container bol-wrapper"}>
        <div className={"bol-page-actions"}>
          <h2>Edit BOL</h2>

          <div className={"reference-edit-input"}>
            <input
              type={"text"}
              placeholder={"Reference number"}
              value={referenceNumber}
              onChange={(ev) => setReference(ev.target.value)}
            />
            {/*<button>Default</button>*/}
          </div>
          <div className={"reference-edit-input"}>
            <input
              type={"text"}
              placeholder={"Bol id"}
              value={bolId}
              onChange={(ev) => setBolId(ev.target.value)}
            />
          </div>
          <div className={"reference-edit-input"}>
            <select
              onChange={(ev) => setSelectedEquipment(ev.target.value)}
              value={selectedEquipment}
            >
              {quote?.equipments?.map((equipment) => (
                <option key={equipment}>{equipment}</option>
              ))}
            </select>
          </div>
          <div className={"reference-edit-input"}>
            <textarea
              placeholder={"Bol Notes"}
              value={bolNotes}
              onChange={(ev) => setBolNotes(ev.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
              }}
              rows={8}
            />
          </div>

          <div className={"payment-terms"}>
            <h5>Payment Terms:</h5>

            <select onChange={(ev) => changeBillingInfo(ev.target.value)}>
              <option value={"prepaid"}>Prepaid</option>
              <option value={"collect"}>Collect</option>
              <option value={"third-party"}>Third-party</option>
            </select>

            {billingInfo?.type === "collect" && (
              <select
                onChange={(ev) => {
                  changeBillingInfo("collect", ev.target.value);
                }}
              >
                {quote?.addresses?.map((location) => (
                  <option key={location._id} value={location._id}>
                    {location.company_name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button onClick={() => downloadPDF()}>Download</button>
          <SendToCarrierButton quote={quote} downloadPDF={downloadPDF} />
        </div>

        <div
          className="bol"
          ref={pdfRef}
          id={"pdfRef"}
          style={{
            width: "1760px",
            background: "white",
            minHeight: "1024px", // Height for US Letter format
            boxSizing: "border-box",
            padding: "2rem",
          }}
        >
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
                        Pickup{" "}
                        {!!address?.date && `on ${formatDate(address.date)}`}
                        {(address.time_start?.length < 10 ||
                          address.time_end?.length < 10) &&
                          " at "}
                        {address.time_start?.length < 10
                          ? address.time_start
                          : ""}
                        {address.time_end?.length < 10 &&
                          ` - ${address.time_end}`}
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
                        Drop{" "}
                        {!!address?.date && `on ${formatDate(address.date)}`}
                        {(address.time_start?.length < 10 ||
                          address.time_end?.length < 10) &&
                          " at "}
                        {address.time_start?.length < 10
                          ? address.time_start
                          : ""}
                        {address.time_end?.length < 10 &&
                          ` - ${address.time_end}`}
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
                      quote?.details_?.customs_broker_country
                    ].src
                  }
                  alt={"country"}
                />
              </div>

              <div className={"broker"}>
                {quote?.details_?.customs_broker_name}
              </div>

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

            <div className={"contacts-info"}>
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
                          {quote?.details_?.weight}{" "}
                          {quote?.details_?.weight_unit}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {bolNotes && (
            <div className={"bol-notes"}>
              <h3>Notes:</h3>

              <span>{bolNotes}</span>
            </div>
          )}

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
                quote?.author?.name,
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
            classifications and tariffs established by the carrier and are
            available to the shipper upon request. This notice supersedes and
            negates any claimed oral or written contract, promise,
            representation, or understanding between parties, except to the
            extent of any written contract signed by both parties to the
            contract. The carrier certifies that only ARB-compliant equipment
            will be dispatched on California highways or railways. Any
            unauthorized alteration or use of this Bill of Lading, or the
            tendering of this shipment to any carrier other than that designated
            by the company, may VOID the company’s obligations to make any
            payments relating to this shipment and VOID all rate quotes. All
            shippers, consignors, consignees, freight forwarders, or freight
            brokers are jointly and severally liable for the freight charges
            relating to this shipment. I hereby declare that the contents of
            this consignment are fully and accurately described above by the
            proper shipping name, are classified, packaged, marked, and
            labeled/placarded, and are in all respects in proper condition for
            transport according to applicable international and national
            governmental regulations.
          </div>
        </div>
      </div>
    </div>
  );
}
