# Saving Users to Database.


1. in 'users.controller.ts' file create post request to get data from client to save.   


1.1 first create 'CreateUserDto' class to define types and validation
```ts
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @IsNotEmpty()
    @MinLength(10)
    password: string;
}
```

1.2 create 'create' route post method to save data.

src/users/controllers/users/users.controller.ts
```ts
  @Post('create')
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto){
    this.usersService.createUser(createUserDto);
  }
```

1.3 import 'User' model to 'users.module.ts'. 

src/users/users.module.ts
```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // + add 
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm'; // + add

@Module({
  imports: [TypeOrmModule.forFeature([User])], // + add
  controllers: [UsersController],
  // providers: [UsersService]
  providers: [
    {
      provide:'USER_SERVICE',
      useClass: UsersService
    }
  ]

})
export class UsersModule {}
```

1.4 in service file inject 'userRepository' in the constructor and save the user data on the database.

src/users/services/users/users.service.ts
```ts
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm'; // + add
import { Repository } from 'typeorm'; // + add
import { User as UserEntity } from 'src/typeorm'; // + add
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types/User'; 

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRespository: Repository<UserEntity>){} // + add
    
    /* ... */

    createUser(createUserDto: CreateUserDto){
        // return user entity and this is sycronize method
        const newUser = this.userRespository.create(createUserDto);
        // no async becasue ??
        return this.userRespository.save(newUser);
    }
}
```