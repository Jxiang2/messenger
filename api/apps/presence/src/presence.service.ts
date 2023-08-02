import { Injectable } from "@nestjs/common";

@Injectable()
export class PresenceService {
  getPresences() {
    return "Hello World!";
  }
}
