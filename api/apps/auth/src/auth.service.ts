import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/shared/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(readonly prismaService: PrismaService) {}

  async getUsers() {
    return await this.prismaService.user.findMany();
  }

  async postUser() {
    return await this.prismaService.user.create({
      data: {
        name: "xjy",
        email: "123@gmail.com",
      },
    });
  }
}
