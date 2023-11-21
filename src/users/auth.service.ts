import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { scrypt as _scrypt, randomBytes } from "crypto";
import { UserCreateRequestDTO } from "./user.dto";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(dto: UserCreateRequestDTO) {
    const users = await this.usersService.find(dto.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(dto.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user: UserCreateRequestDTO = new UserCreateRequestDTO();
    user.email = dto.email;
    user.password = salt;
    this.usersService.create(dto);

    return user;
  }

  signIn() {

  }
}