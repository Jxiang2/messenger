import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/shared/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async postUser() {
    return this.prismaService.user.create({
      data: {
        email: "123@gmail.com",
        name: "hello world",
      },
    });
  }
}
