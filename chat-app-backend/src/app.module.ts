import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import configuration from "./config/configuration";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ChatsGateway } from "./app/chat/chat.gateway";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration.database],
      envFilePath: [".env"],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ChatsGateway],
})
export class AppModule {}
