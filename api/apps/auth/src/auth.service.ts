import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/shared/prisma/prisma.service";
import { NewUserDto } from "@app/shared/dto";

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
      },
    });
  }

  async register(newUser: NewUserDto) {
    console.log("Hello world");
    return newUser;
  }
}
