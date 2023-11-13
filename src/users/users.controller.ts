import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserCreateRequestDTO } from './user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('sign-up')
  createUser(@Body() body: UserCreateRequestDTO) {
    return this.userService.create(body);
  }

  @Get(':id')
  findUser(@Param() id: number) {
    return this.userService.findOne(id);
  }

  @Get('')
  findUsers(@Query("email") email: string) {
    return this.userService.find(email);
  }
}
