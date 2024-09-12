import { io, Socket } from "socket.io-client";
import { ChatEventsEnum } from "@/common/enums/socket-events.enum";

export class ChatService {
  public readonly socket: Socket;

  public constructor() {
    this.socket = io(process.env.NEXT_PUBLIC_API_URL + "/chat" || "", {
      multiplex: true,
      autoConnect: false,
      withCredentials: true,
      reconnectionDelay: 30000,
      reconnectionAttempts: 20,
      transports: ["websocket"],
    });
  }

  async joinRoom(room: string): Promise<any[]> {
    return new Promise((resolve) => {
      this.socket.emit(ChatEventsEnum.JOIN_ROOM, room, (messages: []) => {
        resolve(messages);
      });
    });
  }

  async sendMessage(message: string) {
    return this.socket.emit(ChatEventsEnum.NEW_MESSAGE, message);
  }

  async disconnect() {
    return this.socket.disconnect();
  }

  async connect() {
    return this.socket.connect();
  }

  async reconnect() {
    await this.disconnect().then(() => this.socket.connect());
  }
}

export const ChatServiceInstance = new ChatService();
