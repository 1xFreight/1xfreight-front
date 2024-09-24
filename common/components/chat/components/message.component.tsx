import Document from "@/public/icons/24px/document.svg";
import { formatBytes } from "@/common/utils/number.utils";
import Image from "next/image";
import { isImageFile } from "@/common/utils/file.utils";

export default function MessageComponent({
  message,
  user,
  document,
  time,
  isCurrentUser,
  documentName,
  documentSize,
  localCarrier,
}) {
  return (
    <div
      className={`chat-message ${isCurrentUser ? "sent" : "response"}`}
      style={{
        display: "flex",
        flexDirection: isCurrentUser ? "row-reverse" : "row",
        gap: "0.5rem",
      }}
    >
      {!!user?.logo && (
        <div className={"user-logo"}>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${user.logo}`}
            alt={"image"}
            width={75}
            height={75}
          />
        </div>
      )}
      <div>
        <h6>
          {localCarrier?.name ?? user?.name ?? user?.email}, <span>{time}</span>
        </h6>
        <div className={"message-box"}>
          <h4>{message}</h4>
          {document && isImageFile(documentName ?? ".") && (
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/file-system/image/${document}`}
              alt={"image"}
              width={500}
              height={500}
            />
          )}
          {document && (
            <div className={"tooltip"}>
              <a
                href={`${process.env.NEXT_PUBLIC_API_URL}/file-system/document/${document}`}
                style={{
                  display: "flex",
                  alignItems: "end",
                  gap: "0.35rem",
                }}
                className={"message-doc"}
              >
                <Document /> {documentName}{" "}
                <h6 style={{ whiteSpace: "nowrap" }}>
                  {formatBytes(documentSize)}
                </h6>
              </a>
              <span
                className={"tooltiptext"}
                style={{
                  bottom: "unset",
                  top: "100%",
                  // padding: "1rem",
                  // width: "30rem",
                  left: "50%",
                }}
              >
                download
              </span>
            </div>
          )}
        </div>
      </div>
      {/*<div className={"message-triangle"}></div>*/}
    </div>
  );
}
