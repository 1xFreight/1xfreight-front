"use client";

import React, { useEffect, useRef, useState } from "react";
import { toShortId } from "@/common/utils/data-convert.utils";
import "./styles.css";
import { useDebouncedCallback } from "use-debounce";
import { getWithAuth } from "@/common/utils/fetchAuth.util";
import Image from "next/image";
import { formatDate } from "@/common/utils/date.utils";
import html2pdf from "html2pdf.js";
import { QuoteTypeEnum } from "@/common/enums/quote-type.enum"; // Import html2pdf

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
      margin: 0.025, // Adjust margins as needed
      filename: `BOL_${referenceNumber}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 3, scrollX: 0, scrollY: 0 }, // Scale for better quality, disable scroll
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] }, // Enables page breaks
    };

    html2pdf().set(options).from(pdfRef.current).save();
  };

  return (
    <div className={"bol-page"}>
      <div className={"container bol-wrapper"}>
        <div className={"bol-page-actions"}>
          <h2>BOL #{toShortId(params.quote_id)}</h2>

          <div className={"reference-edit-input"}>
            <input
              type={"text"}
              placeholder={"Reference number"}
              value={referenceNumber}
              onChange={(ev) => setReference(ev.target.value)}
            />
            {/*<button>Default</button>*/}
          </div>
          <button onClick={downloadPDF}>Download</button>
        </div>

        {/* Main content */}
        <div
          className={"bol"}
          ref={pdfRef}
          style={{
            width: "790px",
            background: "white",
            minHeight: "30rem",
            boxSizing: "border-box",
            padding: "2rem",
            // borderRadius: "0.5rem",
            // scale: "0.9",
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
                    // borderRadius: "0.5rem",
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
                  fontSize: "15px",
                }}
              >
                {quote?.author?.name}
              </h2>
              <h5
                style={{
                  marginLeft: "auto",
                  fontSize: "7px",
                }}
              >
                STRAIGHT BILL OF LADING (ORIGINAL NON NEGOTIABLE)
              </h5>
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
                maxWidth: "50%",
                width: "100%",
                padding: "5px",
                // borderRadius: "0.5rem",
                background: "rgba(202,213,253,0.3)",
                border: "1px solid rgba(222, 222, 222, 0.5)",
                display: "flex",
                flexDirection: "column",
                // gap: "8px",
              }}
            >
              <h3
                style={{
                  color: "#3A56EA",
                  fontSize: "15px",
                  marginBottom: "8px",
                }}
              >
                Pickup
              </h3>
              {quote?.addresses.map((address, index) => {
                if (address.address_type === "pickup")
                  return (
                    <div
                      key={index + address.address}
                      // className={"location-item"}
                      style={{
                        border: "1px solid #dedede",
                        // borderRadius: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        padding: "0.5rem",
                        background: "white",
                        margin: "0.35rem",
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
                            fontSize: "9px",
                          }}
                        >
                          {address.company_name}
                        </h5>
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.street},
                        </h5>
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.partial_address}
                        </h5>
                      </div>
                      <div
                        className={"conact-details"}
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.contact_name} {address.contact_phone}
                        </h5>
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.contact_email}
                        </h5>
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
                            style={{
                              fontWeight: 400,
                              fontSize: "7px",
                            }}
                          >
                            {openHoursLine}
                          </h5>
                        ))}
                      </div>
                      {!!address.date && (
                        <div>
                          <h5
                            style={{
                              fontWeight: 400,
                              fontSize: "7px",
                            }}
                          >
                            Pickup on: {formatDate(address.date)}
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
                background: "#F1FBEB",
                maxWidth: "50%",
                width: "100%",
                padding: "5px",
                // borderRadius: "0.5rem",
                border: "1px solid rgba(222, 222, 222, 0.5)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  color: "#82C181",
                  fontSize: "15px",
                  marginBottom: "0.5rem",
                }}
              >
                Delivery
              </h3>
              {quote?.addresses.map((address, index) => {
                if (address.address_type === "drop")
                  return (
                    <div
                      key={index + address.address}
                      // className={"location-item"}
                      style={{
                        border: "1px solid #dedede",
                        // borderRadius: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        padding: "0.5rem",
                        background: "white",
                        margin: "0.35rem",
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
                            color: "#82C181",
                            fontWeight: 500,
                            fontSize: "9px",
                          }}
                        >
                          {address.company_name}
                        </h5>
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.street},
                        </h5>
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.partial_address}
                        </h5>
                      </div>
                      <div
                        className={"conact-details"}
                        style={{
                          borderBottom: "1px dashed rgba(0, 0, 0, 0.3)",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.contact_name} {address.contact_phone}
                        </h5>
                        <h5
                          style={{
                            fontWeight: 400,
                            fontSize: "7px",
                          }}
                        >
                          {address.contact_email}
                        </h5>
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
                            style={{
                              fontWeight: 400,
                              fontSize: "7px",
                            }}
                          >
                            {openHoursLine}
                          </h5>
                        ))}
                      </div>
                      {!!address.date && (
                        <div>
                          <h5
                            style={{
                              fontWeight: 400,
                              fontSize: "7px",
                            }}
                          >
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

          <div
            className={"quote-items-view"}
            style={{
              marginTop: "16px",
              background: "#F3F3F3",
            }}
          >
            <div>
              <table
                style={{
                  tableLayout: "fixed",
                  width: "100%",
                  textAlign: "left",
                  border: "1px solid #E8E8E8",
                  borderCollapse: "collapse",
                }}
              >
                <thead style={{}}>
                  <tr>
                    <th
                      style={{
                        width: "20px",
                        border: "1px solid #E8E8E8",
                      }}
                    ></th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                        width: "55px",
                      }}
                    >
                      Quantity
                    </th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                        width: "75px",
                      }}
                    >
                      Weight
                    </th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                      }}
                    >
                      Dimensions
                    </th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                      }}
                    >
                      Handling unit
                    </th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                      }}
                    >
                      NMFC
                    </th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                        width: "80px",
                      }}
                    >
                      Freight Class
                    </th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                        width: "60px",
                      }}
                    >
                      Sub Class
                    </th>
                    <th
                      style={{
                        fontSize: "10px",
                        border: "1px solid #E8E8E8",
                      }}
                    >
                      Commodity
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {!quote?.items?.length && (
                    <tr>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      >
                        1.
                      </td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      >
                        {quote?.details_?.quantity}
                      </td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      >
                        {quote?.details_?.weight} {quote?.details_?.weight_unit}
                      </td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      ></td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      ></td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      ></td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      ></td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      ></td>
                      <td
                        style={{
                          fontSize: "11px",
                          border: "1px solid #E8E8E8",
                        }}
                      >
                        {quote?.details_?.commodity}
                      </td>
                    </tr>
                  )}
                  {!!quote?.items?.length &&
                    quote?.items.map((item, index) => (
                      <tr key={item._id}>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {index + 1}.
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item.quantity}
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item.weight} {item.weight_unit}
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item.width} x {item.length} x {item.height}
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item.handling_unit}
                          {item.mixed_pallet && ", Mixed pallet"}
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item.nmfc}
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item.freight_class}
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item?.sub_class}
                        </td>
                        <td
                          style={{
                            fontSize: "11px",
                            border: "1px solid #E8E8E8",
                          }}
                        >
                          {item.commodity}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            className={"signatures"}
            style={{
              width: "100%",
              display: "inline-flex",
              flexWrap: "wrap",
              marginTop: "1rem",
              gap: "20px",
            }}
          >
            {quote?.addresses.map((address, index) => (
              <div
                key={(address?.company_name ?? "key") + index}
                style={{
                  width: "220px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    height: "20px",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "11px",
                    }}
                  >
                    {address?.company_name}
                  </h5>
                  {address?.address_type === "drop" && (
                    <h6
                      style={{
                        width: "30%",
                        borderRight: "1px solid black",
                        borderLeft: "1px solid black",
                        paddingLeft: "5px",
                        height: "20px",
                        fontSize: "8px",
                      }}
                    >
                      Units
                    </h6>
                  )}
                </div>
                <div
                  style={{
                    height: "35px",
                    border: "1px solid black",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    // borderRadius: "0.5rem",
                    padding: "0.25rem",
                  }}
                >
                  <h6
                    style={{
                      fontSize: "7px",
                    }}
                  >
                    Sign
                  </h6>
                  <h6
                    style={{
                      width: "30%",
                      paddingLeft: "0.5rem",
                      borderLeft: "1px solid black",
                      height: "100%",
                      fontSize: "7px",
                    }}
                  >
                    Date
                  </h6>
                </div>
              </div>
            ))}
            {quote?.author && (
              <div
                style={{
                  width: "220px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  height: "80px",
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    height: "20px",
                  }}
                >
                  <h5
                    style={{
                      fontSize: "11px",
                    }}
                  >
                    {quote?.author?.name}
                  </h5>
                  <h6
                    style={{
                      width: "30%",
                      borderRight: "1px solid black",
                      borderLeft: "1px solid black",
                      paddingLeft: "5px",
                      height: "20px",
                      fontSize: "8px",
                    }}
                  >
                    Units
                  </h6>
                </div>
                <div
                  style={{
                    height: "35px",
                    border: "1px solid black",
                    display: "inline-flex",
                    justifyContent: "space-between",
                    padding: "0.25rem",
                  }}
                >
                  <h6
                    style={{
                      fontSize: "7px",
                    }}
                  >
                    Sign
                  </h6>
                  <h6
                    style={{
                      width: "30%",
                      paddingLeft: "0.5rem",
                      borderLeft: "1px solid black",
                      height: "100%",
                      fontSize: "7px",
                    }}
                  >
                    Date
                  </h6>
                </div>
              </div>
            )}
          </div>

          <div
            className={"legal-info"}
            style={{
              marginTop: "1rem",
              height: "80px",
            }}
          >
            <h6
              style={{
                fontSize: "7px",
              }}
            >
              Notice: Freight moving under this Bill of Lading is subject to
              classifications and tariffs established by the carrier and are
              available to shipper upon request. This notice supersedes and
              negates any claimed oral or written contract, promise,
              representation, or understanding between parties, except to the
              extent of any written contract signed by both parties to the
              contract. Carrier certifies only ARB-compliant equipment will be
              dispatched on California highways or railways. Any unauthorized
              alteration or use of this Bill of Lading or the tendering of this
              shipment to any carrier other than that designated by company, may
              VOID company's obligations to make any payments relating to this
              shipment and VOID all rate quotes. All shippers, consignors,
              consignees, freight forwarders or freight brokers are jointly and
              severally liable for the freight charges relating to this
              shipment. I hereby declare that the contents of this consignment
              are fully and accurately described above by the proper shipping
              name, and are classified, packaged, marked and labeled/placarded,
              and are in all respects in proper condition for transport
              according to applicable international and national governmental
              regulations.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}
