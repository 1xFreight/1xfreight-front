import Document from "@/public/icons/24px/document.svg";

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
        {document && (
          <a
            href={`${process.env.NEXT_PUBLIC_API_URL}/file-system/document/${document}`}
            style={{
              display: "flex",
              alignItems: "end",
              gap: "0.35rem",
            }}
          >
            <Document /> {documentName}{" "}
            <h6>{(documentSize / 1024).toFixed(2)}kb</h6>
          </a>
        )}
      </div>
      <div className={"message-triangle"}></div>
    </div>
  );
}
