import { ChatServiceInstance } from "@/common/libs/chat.service";

export const useChat = () => {
  const chatService = ChatServiceInstance;

  const joinRoom = (roomCode: string) => {
    return chatService.joinRoom(roomCode);
  };

  const sendMessage = (message: any) => {
    return chatService.sendMessage(message);
  };

  const connect = () => {
    return chatService.connect();
  };

  const disconnect = () => {
    return chatService.disconnect();
  };

  const reconnect = () => {
    return chatService.reconnect();
  };

  return {
    joinRoom,
    sendMessage,
    connect,
    disconnect,
    reconnect,
    chatService,
  };
};
