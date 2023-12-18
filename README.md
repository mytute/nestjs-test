# Filtering Passwords

here looking for filtering response that send to client.     

1. create new module, controller and service for 'users'   
```bash  
$ nest g module users
$ nest g controller users/controllers/users
$ nest g service users/services/users
```

2. in 'users.service' file create fake users list and it's load functions.   

2.1 create folder call 'types' inside 'users' folder.   

nestjs-tutorial/src/users/types/User.ts
```ts
export interface User {
  username: string;
  password: string;
}
```

2.1 create fake users inside 'user.service'.   

```ts
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/types/User';

@Injectable()
export class UsersService {

    private users:User[] = [
        {
            username:'samadhi',
            password:'samadhi001'
        },
        {
            username:'laksahan',
            password:'laksahan001'
        },
        {
            username:'piyasiri',
            password:'piyasiri001'
        }
    ];

    getUsers(){
        return this.users;
    }

    getUserByUsername(username:string){
        return this.users.find((user)=> user.username === username)
    }
}
```

3. implement 'users.controller.ts' file functions to get users and get user by username.    

3.1 just for fun, in 'users.module.ts' file update default provider with key.  

src/users/users.module.ts
```ts
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  controllers: [UsersController],
  // providers: [UsersService]
  providers: [ // start to add here.
    {
      provide:'USER_SERVICE',
      useClass: UsersService
    }
  ]

})
export class UsersModule {}
```

3.2 import 'users.service.ts' file in to 'users.controller.ts' file with inject key and make 'getUsers' route and test it on postman.   

src/users/controllers/users/users.controller.ts
```ts
import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly usersService: UsersService,
  ) {}

  @Get('')
  getUsers() {
    return this.usersService.getUsers();
  }
}

```

4. in 'User.ts' file add '@Exclude()' decorator that field which we want to 

src/users/types/User.ts
```ts
import { Exclude } from "class-transformer";

export interface User {
    username: string;
    password: string;
}

export class SerializedUser {
    username: string;

    @Exclude()
    password: string;
}
```

5. in 'users.service.ts' map the 'getUsers' function with 'plainToClass' fucntion to remove 'Exclude' field from users.   

src/users/services/users/users.service.ts
```ts
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types/User';

/* ... */

getUsers(){
    // return this.users; // - remove
    return this.users.map((user)=> plainToClass(SerializedUser, user)); // + add
}
```   

6. create 'getByUsername' route in 'users.routes.ts' file.

src/users/controllers/users/users.controller.ts
```ts
  @Get('username')
  getByUsername(@Param('username') username:string) {
    const user = this.usersService.getUserByUsername(username);
    if(user) return user;
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }
```

7. add to  'User.ts' file 'SerializedUser' class to a constructor in order to remove '@Exclude' fields.

src/users/types/User.ts
```ts
export class SerializedUser {
    username: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<SerializedUser>){
        Object.assign(this, partial)
    }
}
```

8. now when we return user then call it with above 'SerializedUser' class instance.   

'UseInterceptors' is nestjs documentation recomanded way to remove data field from the response object.

```ts  
  @UseInterceptors(ClassSerializerInterceptor) // + add here
  @Get('username')
  getByUsername(@Param('username') username:string) {
    const user = this.usersService.getUserByUsername(username);
    // if(user) return user;
    if(user) return new SerializedUser(user); // update here
    else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
  }
```