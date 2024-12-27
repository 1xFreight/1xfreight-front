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
import jsPDF from "jspdf";
import * as htmlToImage from "html-to-image";
import useStore from "@/common/hooks/use-store.context";
import SendToCarrierButton from "@/app/docs/bol/[quote_id]/components/send-to-carrier.button";

export default function ViewLabelPage({ params }) {
  const [quote, setQuote] = useState();
  const [loading, setLoading] = useState(true);
  const [referenceNumber, setReference] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [shipTo, setShipTo] = useState<string>("");
  const pdfRef = useRef<HTMLDivElement>(null);
  const { showToast, session } = useStore();

  const getQuote = useDebouncedCallback(() => {
    getWithAuth(`/quote/shipments?limit=1&id=${params.quote_id}`).then(
      (data) => {
        const quoteObj = { ...data?.quotes[0] };
        setQuote(quoteObj);
        setLoading(false);
        setReference(concatReferencesByType(quoteObj.references));
        const firstDrop = quoteObj?.addresses?.filter(
          (location) => location.address_type === "drop" && location.order == 1,
        );
        setShipTo(firstDrop[0].company_name + " ," + firstDrop[0].address);
      },
    );
  });

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
        const fileName = `Label_${toShortId(quote?._id)}.pdf`; // Replace `bolId` with your ID variable

        return new File([pdfBlob], fileName, { type: "application/pdf" });
      } else {
        pdf.save(`Label_${toShortId(quote?._id)}.pdf`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <div className={"bol-page"}>
      <div className={"container bol-wrapper"}>
        <div className={"bol-page-actions"}>
          <h2>Edit Label</h2>

          <div className={"reference-edit-input"}>
            <input
              type={"text"}
              placeholder={"Reference number"}
              value={referenceNumber}
              onChange={(ev) => setReference(ev.target.value)}
            />
            {/*<button>Default</button>*/}
          </div>

          <select
            onChange={(ev) => {
              setShipTo(ev.target.value);
            }}
            value={shipTo}
          >
            {quote?.addresses
              ?.filter((location) => location.address_type === "drop")
              .map((location) => (
                <option
                  key={location._id}
                  value={location.company_name + " ," + location.address}
                >
                  {location.company_name}
                </option>
              ))}
          </select>

          <div className={"reference-edit-input"}>
            <textarea
              placeholder={"Label Notes"}
              value={notes}
              onChange={(ev) => setNotes(ev.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 1rem",
              }}
              rows={8}
            />
          </div>

          <button onClick={() => downloadPDF()}>Download</button>
          <SendToCarrierButton quote={quote} downloadPDF={downloadPDF} />
        </div>

        <div
          className="label"
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
          <div className={"shipper"}>
            <h3>Shipper:</h3>
            <h5>{session?.name}</h5>
            <h5>{session?.billing_address}</h5>
          </div>

          <div className={"ship-to"}>
            <h3>Ship To:</h3>
            <h5>{shipTo}</h5>
          </div>

          <div className={"carrier"}>
            <h3>Carrier:</h3>
            <h5>{quote?.local_carrier?.name}</h5>
          </div>

          <div className={"refs"}>
            <h3>PO #:</h3>
            {referenceNumber.split(";").map((ref) => (
              <h5 key={ref}>{ref}</h5>
            ))}
          </div>

          <div className={"notes"}>
            <h3>Notes:</h3>
            <h5>{notes}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
