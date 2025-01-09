"use client";

import { memo } from "react";
import Warning from "@/public/icons/circle-wavy-warning.svg";
import Cross from "@/public/icons/24px/cross.svg";
import Document from "@/public/icons/24px/document.svg";
import EmptyTableComponent from "@/common/components/empty-table.component";
import useStore from "@/common/hooks/use-store.context";
import { isImageFile } from "@/common/utils/file.utils";
import Image from "next/image";
import { formatBytes } from "@/common/utils/number.utils";
import { formatDateTime } from "@/common/utils/date.utils";
import Link from "next/link";

function ViewChatDocsComponent({ open, setOpen, docs }) {
  const { session } = useStore();
  let chatDocuments;

  if (docs) {
    chatDocuments = docs.filter((chatMessage) => !!chatMessage.documentName);
  }

  if (!open) return "";

  return (
    <div className={"vcd-wrapper"}>
      <div
        className={"ca-backdrop"}
        onClick={() => {
          setOpen(false);
        }}
      ></div>
      <div className={"view-docs"}>
        <div className={"vd-header"}>
          <div className={"ca-title"}>Documents</div>
          <div
            className={"close"}
            onClick={() => {
              setOpen(false);
            }}
          >
            <Cross />
          </div>
        </div>

        <div className={"vd-container"}>
          {chatDocuments?.length ? (
            chatDocuments.map((document) => (
              <Link
                href={`${process.env.NEXT_PUBLIC_API_URL}/file-system/document/${document.document}`}
                key={document._id}
              >
                <div className={"doc-item"}>
                  <div className={"doc-item-icon"}>
                    <Document />
                  </div>
                  <div className={"doc-name"}>{document.documentName}</div>
                  <div className={"doc-size"}>
                    {formatBytes(document.documentSize)}
                  </div>
                  <div className={"doc-time"}>
                    {formatDateTime(document.createdAt)}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "1rem",
                flexDirection: "column",
              }}
            >
              <EmptyTableComponent />
              <h5>0 documents found</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(ViewChatDocsComponent);
