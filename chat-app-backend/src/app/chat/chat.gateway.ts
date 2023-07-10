import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Namespace, Socket } from "socket.io";

@WebSocketGateway(4010, {
  namespace: "chat",
  cors: { origin: "*" },
})
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Namespace;

  afterInit(server: any) {
    console.log("[WEB_SOCKETS]: web socker init...");
  }

  handleConnection(client: any, ...args: any[]) {
    console.log("[WEB_SOCKETS]: Connection!");
  }

  handleDisconnect(client: any) {
    console.log("[WEB_SOCKETS]: Disconnection!");
  }

  @SubscribeMessage("event_join")
  handleJoinRoom(client: Socket, room: string) {
    client.join(`room_${room}`);
  }

  @SubscribeMessage("event_message") //TODO Backend
  handleIncommingMessage(client: Socket, payload: { room: string; message: string }) {
    const { room, message } = payload;
    console.log(payload);
    this.server.to(`room_${room}`).emit("new_message", message);
  }

  @SubscribeMessage("event_leave")
  handleRoomLeave(client: Socket, room: string) {
    console.log(`chao room_${room}`);
    client.leave(`room_${room}`);
  }
}
