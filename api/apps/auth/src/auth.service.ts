import { HttpStatus, Injectable } from "@nestjs/common";
import { RegisterUserSerializer, RegisterUserDto } from "@app/shared";
import { PrismaService } from "@app/shared/prisma/prisma.service";
import { User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { ResponseService } from "@app/shared/response/response.service";

@Injectable()
export class AuthService {
  private static readonly USER_ALREADY_EXISTS = "User already exists";

  constructor(
    readonly prisma: PrismaService,
    readonly response: ResponseService,
  ) {}

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async register(newUser: RegisterUserDto) {
    const { firstName, lastName, email, password } = newUser;

    const user = await this.findByEmail(email);

    if (user) {
      this.response.fail(HttpStatus.CONFLICT, [
        AuthService.USER_ALREADY_EXISTS,
      ]);
    }

    const savedUser = await this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await this.hashPassword(password),
      },
    });

    return this.response.success(new RegisterUserSerializer(savedUser));
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  private async findByEmail(email: string): Promise<Partial<User> | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true },
    });
  }
}
