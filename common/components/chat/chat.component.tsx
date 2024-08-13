import "./styles.css";
import Chat from "@/public/icons/30px/comment.svg";
import AddFile from "@/public/icons/30px/Layer 2.svg";
import Expand from "@/public/icons/30px/expand-alt.svg";
import MessageComponent from "@/common/components/chat/components/message.component";

export default function ChatComponent() {
  const mockData = [
    {
      message:
        "Good day! I’m Mihail from MakeIT. I’d like to discuss a potential collaboration regarding freight transport for our clients. Are you available for a discussion?",
      user: "Mihail",
      company: "Ship Fortus",
      userId: "111",
      time: "24.02.2024 - 15:12",
    },
  ];

  return (
    <div className={"default-chat-wrapper"}>
      <div className={"chat-title"}>
        <div>
          <Chat />
          <h5>Chat with carriere</h5>
        </div>
      </div>

      <div className={"chat-body"}>
        <MessageComponent {...mockData[0]} />
        <MessageComponent {...mockData[0]} isCurrentUser />
        <MessageComponent {...mockData[0]} />
        <MessageComponent {...mockData[0]} isCurrentUser />
        <MessageComponent {...mockData[0]} />
        <MessageComponent {...mockData[0]} isCurrentUser />
        <MessageComponent {...mockData[0]} />
        <MessageComponent {...mockData[0]} isCurrentUser />
        <MessageComponent {...mockData[0]} />
        <MessageComponent {...mockData[0]} isCurrentUser />
        <MessageComponent {...mockData[0]} />
        <MessageComponent {...mockData[0]} isCurrentUser />
      </div>

      <div className={"attach-doc"}>
        <AddFile /> Attach document
      </div>
      <div className={"chat-input"}>
        <input type={"text"} name={"chatMessage"} placeholder={"Message..."} />

        <button>SEND</button>
      </div>
    </div>
  );
}
