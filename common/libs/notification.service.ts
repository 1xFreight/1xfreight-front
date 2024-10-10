import { io, Socket } from "socket.io-client";

export class NotificationService {
  public readonly socket: Socket;

  public constructor() {
    this.socket = io(process.env.NEXT_PUBLIC_API_URL + "/notification" || "", {
      multiplex: true,
      autoConnect: false,
      withCredentials: true,
      reconnectionDelay: 30000,
      reconnectionAttempts: 20,
      transports: ["websocket"],
    });
  }

  async getUserNotifications(): Promise<any[]> {
    return new Promise((resolve) => {
      this.socket.emit("get-notifications", (notifications: []) => {
        resolve(notifications);
      });
    });
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

export const NotificationServiceInstance = new NotificationService();
