"use client";

import React, { useEffect, useRef, useState } from "react";
import { toShortId } from "@/common/utils/data-convert.utils";
import "./styles.css";
import PointOnMap from "@/public/icons/point-on-map.svg";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import Image from "next/image";
import { formatDate } from "@/common/utils/date.utils";
import html2pdf from "html2pdf.js"; // Import html2pdf

export default function ViewBOLPage({ params }) {
  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [referenceNumber, setReference] = useState<string>("");
  const pdfRef = useRef(null); // Reference for .bol element

  const getQuote = useDebouncedCallback(() => {
    getWithAuth(`/quote/shipments?limit=1&id=${params.quote_id}`).then(
      (data) => {
        const quoteObj = { ...data?.quotes[0] };
        setQuote(quoteObj);
        setLoading(false);
        identifyRef(quoteObj.references);
      },
    );
  });

  const identifyRef = (quoteRefs = null) => {
    let quoteReferences = [];
    if (!quoteRefs) {
      quoteReferences = quote?.references;
    } else {
      quoteReferences = [...quoteRefs];
    }

    if (!quoteReferences.length) {
      setReference("N/A");
      return "N/A";
    }
    if (quoteReferences.length === 1) {
      setReference(quoteReferences[0]);
      return quoteReferences[0];
    }

    quoteReferences.forEach((reference) => {
      if (reference.includes("BOL")) {
        setReference(reference);
        return reference;
      }
    });

    setReference(quoteReferences[0]);
    return quoteReferences[0];
  };

  useEffect(() => {
    getQuote();
  }, []);

  // Function to generate PDF
  const downloadPDF = async () => {
    const options = {
      margin: 0, // Adjust margins as needed
      filename: `BOL_${referenceNumber}.pdf`,
      image: { type: "jpeg", quality: 1 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(options).from(pdfRef.current).save();
  };

  return (
    <div className={"bol-page"}>
      <div className={"container"}>
        <div className={"bol-page-title"}>
          <h2>BOL</h2>
          <button onClick={downloadPDF}>Download</button>
          <h5>#{toShortId(params.quote_id)}</h5>
        </div>

        {/* Main content */}
        <div
          className={"bol"}
          ref={pdfRef}
          style={{
            width: "100%",
            maxWidth: "77.5rem",
            background: "white",
            minHeight: "30rem",
            boxSizing: "border-box",
            padding: ".5rem",
            minWidth: "1000px",
          }}
        >
          <div
            className={"bol-title"}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                gap: "0.5rem",
                alignItems: "center",
              }}
            >
              {!!quote?.author?.logo && (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${quote?.author?.logo}`}
                  alt={"logo"}
                  width={1000}
                  height={100}
                  className={"quote-author-logo-img"}
                  quality={80}
                  style={{
                    borderRadius: "0.5rem",
                    width: "40px", // Let CSS control width
                    height: "40px", // Let CSS control height
                    maxWidth: "100%", // Ensure it doesn't exceed the container
                    objectFit: "contain", // Ensure the image fits the box without cropping
                  }}
                />
              )}
              <h2
                style={{
                  color: "#3A56EA",
                  fontWeight: 700,
                }}
              >
                {quote?.author?.name}
              </h2>
            </div>
            <div
              className={"reference-edit"}
              id={"reference-edit"}
              style={{
                display: "inline-flex",
                gap: "0.5rem",
                alignItems: "center",
                position: "relative",
                zIndex: 15,
              }}
            >
              <button
                className={"reference-bol"}
                style={{
                  background: "transparent",
                  boxShadow: "unset",
                  border: "unset",
                  height: "2rem",
                }}
              >
                {referenceNumber}
              </button>
              <div
                className={"reference-edit-box"}
                onBlur={(ev) => {
                  const newRefValue =
                    document.getElementById("edit-ref")?.value;
                  setReference(newRefValue ?? referenceNumber);
                }}
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  marginTop: "1rem",
                  background: "rgba(0, 0, 0, 0.1)",
                  backdropFilter: "blur(10px)",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  zIndex: 20,
                  flexDirection: "column",
                  gap: "0.5rem",
                  display: "none",
                  width: "20rem",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className={"edit-ref-title"}
                  style={{
                    display: "inline-flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h6>edit reference number:</h6>
                  <button
                    onClick={(ev) => {
                      document.getElementById("edit-ref").value = identifyRef();
                    }}
                    id={"undo-edit-reference"}
                    style={{
                      padding: "0.15rem 0.35rem",
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                    }}
                  >
                    default
                  </button>
                </div>
                <input
                  type={"text"}
                  defaultValue={referenceNumber}
                  id={"edit-ref"}
                  onChange={(ev) => {
                    if (ev.target.value !== referenceNumber) {
                      document.getElementById(
                        "undo-edit-reference",
                      ).style.display = "flex";
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={"locations"}
            style={{
              width: "100%",
              display: "flex",
              gap: "1rem",
              marginTop: "0.6rem",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              className={"pickup"}
              style={{
                maxWidth: "380px",
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                background: "rgba(222, 222, 222, 0.2)",
                border: "1px solid rgba(222, 222, 222, 0.5)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <h3>Pickup</h3>
              {quote?.addresses.map((address, index) => {
                if (address.address_type === "pickup")
                  return (
                    <div
                      key={index + address.address}
                      className={"location-item"}
                      style={{
                        border: "1px solid #dedede",
                        margin: "0.5rem",
                        borderRadius: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        position: "relative",
                        padding: "0.75rem",
                      }}
                    >
                      <div
                        className={"address"}
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        <h5
                          className={"company-name"}
                          style={{
                            color: "#3A56EA",
                            fontWeight: 500,
                          }}
                        >
                          {address.company_name}
                        </h5>
                        <h5>{address.street},</h5>
                        <h5>{address.partial_address}</h5>
                      </div>
                      <div
                        className={"conact-details"}
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        <h5>
                          {address.contact_name} {address.contact_phone}
                        </h5>
                        <h5>{address.contact_email}</h5>
                      </div>
                      <div
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        {address.open_hours?.split(",").map((openHoursLine) => (
                          <h5
                            key={openHoursLine}
                            className={"formatted-open-hours"}
                          >
                            {openHoursLine}
                          </h5>
                        ))}
                      </div>
                      {!!address.date && (
                        <div>
                          <h5>
                            Delivery on: {formatDate(address.date)}
                            {address.time_start || address.time_end ? ", " : ""}
                            {address.time_start}{" "}
                            {address.time_start && address.time_end
                              ? " - "
                              : ""}{" "}
                            {address.time_end}
                          </h5>
                        </div>
                      )}
                    </div>
                  );
              })}
            </div>

            <div
              className={"drop"}
              style={{
                maxWidth: "380px",
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                background: "rgba(222, 222, 222, 0.2)",
                border: "1px solid rgba(222, 222, 222, 0.5)",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <h3>Delivery</h3>
              {quote?.addresses.map((address, index) => {
                if (address.address_type === "drop")
                  return (
                    <div
                      key={index + address.address}
                      className={"location-item"}
                      style={{
                        border: "1px solid #dedede",
                        margin: "0.5rem",
                        borderRadius: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        position: "relative",
                        padding: "0.75rem",
                      }}
                    >
                      <div
                        className={"address"}
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        <h5
                          className={"company-name"}
                          style={{
                            color: "#3A56EA",
                            fontWeight: 500,
                          }}
                        >
                          {address.company_name}
                        </h5>
                        <h5>{address.street},</h5>
                        <h5>{address.partial_address}</h5>
                      </div>
                      <div
                        className={"conact-details"}
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        <h5>
                          {address.contact_name} {address.contact_phone}
                        </h5>
                        <h5>{address.contact_email}</h5>
                      </div>
                      <div
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        {address.open_hours?.split(",").map((openHoursLine) => (
                          <h5
                            key={openHoursLine}
                            className={"formatted-open-hours"}
                          >
                            {openHoursLine}
                          </h5>
                        ))}
                      </div>
                      {!!address.date && (
                        <div>
                          <h5>
                            Delivery on: {formatDate(address.date)}
                            {address.time_start || address.time_end ? ", " : ""}
                            {address.time_start}{" "}
                            {address.time_start && address.time_end
                              ? " - "
                              : ""}{" "}
                            {address.time_end}
                          </h5>
                        </div>
                      )}
                    </div>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
