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
}) {
  return (
    <div className={`chat-message ${isCurrentUser ? "sent" : "response"}`}>
      <h6>
        {user}, {time}
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
        )}
      </div>
      <div className={"message-triangle"}></div>
    </div>
  );
}
