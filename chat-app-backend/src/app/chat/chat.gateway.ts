import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";

import { EVENTS, SOCKET_EVENT } from "@/types";
import usernameStore from "@/store/username-store";

@WebSocketGateway(4010, {
  namespace: "chat",
  cors: { origin: "*" },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Namespace;
  private readonly roomName = "standard_room" as const;

  afterInit(server: any) {
    console.log("[WEB_SOCKETS]: web socker init...");
  }

  handleConnection(client: any, ...args: any[]) {
    console.log("[WEB_SOCKETS]: Connection!");
  }

  handleDisconnect(client: any) {
    console.log("[WEB_SOCKETS]: Disconnection!");
  }

  @SubscribeMessage(EVENTS.join_room)
  handleJoinRoom(client: Socket, username: string) {
    usernameStore.addUser(username, client.id);
    client.join(this.roomName);
  }

  @SubscribeMessage(EVENTS.send_message)
  handleIncommingMessage(client: Socket, message: string) {
    const username = usernameStore.getUsernameById(client.id);
    this.server.to(this.roomName).emit(SOCKET_EVENT.new_message, `[${username}]: ${message}`);
  }

  @SubscribeMessage(EVENTS.leave_room)
  handleRoomLeave(client: Socket, room: string) {
    console.log("[WEB_SOCKETS]: USER LEAVE:", usernameStore.getUsernameById(client.id));
    usernameStore.removeUser(client.id);
    client.leave(this.roomName);
  }
}
