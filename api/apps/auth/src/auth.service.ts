import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  async getUsers() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "Getting...";
  }

  async postUser() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "Posting...";
  }
}
