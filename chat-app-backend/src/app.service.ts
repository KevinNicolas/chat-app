import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IEnvVariables } from "@/config/configuration";

@Injectable()
export class AppService {
  getHello() {
    return `Hello world`;
  }
}
