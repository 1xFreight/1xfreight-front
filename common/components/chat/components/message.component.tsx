export default function MessageComponent({
  message,
  user,
  company,
  time,
  isCurrentUser,
}) {
  return (
    <div className={`chat-message ${isCurrentUser ? "sent" : "response"}`}>
      <h6>
        {user}, {company}, {time}
      </h6>
      <div className={"message-box"}>
        <h4>{message}</h4>
      </div>
      <div className={"message-triangle"}></div>
    </div>
  );
}
