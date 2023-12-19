import { ClassSerializerInterceptor, Controller, Get, HttpException, HttpStatus, Inject, NotFoundException, Param, UseFilters, UseInterceptors } from '@nestjs/common';
import { UserNotFound } from 'src/users/exceptions/UserNotFound.exception';
import { HttpExceptionFilter } from 'src/users/filters/HttpException.filter';
import { UsersService } from 'src/users/services/users/users.service';
import { SerializedUser } from 'src/users/types/User';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':username')
  @UseFilters(HttpExceptionFilter)
  getByUsername(@Param('username') username:string) {
    const user = this.usersService.getUserByUsername(username);
    if(user) return new SerializedUser(user);
    // else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    // else throw new UserNotFound;
    else throw new NotFoundException();
  }
}
