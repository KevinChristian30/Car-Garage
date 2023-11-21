import { Body, Controller, Get, Param, Post, Query, Delete, Patch } from '@nestjs/common';
import { UserCreateRequestDTO, UserResponseDTO, UserUpdateRequestDTO } from './user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService
  ) { }

  @Post('sign-up')
  createUser(@Body() body: UserCreateRequestDTO) {
    return this.authService.signUp(body);
  }

  @Get(':id')
  @Serialize(UserResponseDTO)
  findUser(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get('')
  findUsers(@Query("email") email: string) {
    return this.userService.find(email);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() body: UserUpdateRequestDTO
  ) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
