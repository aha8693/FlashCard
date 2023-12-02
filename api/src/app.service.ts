import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}

  getHello(): string {
    const NODE_ENV = this.configService.get<string>("NODE_ENV");
    console.log(NODE_ENV);
    return "Hello World!";
  }
}
