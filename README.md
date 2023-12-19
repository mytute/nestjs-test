# Exceptions & Handling Exceptions



1. show how to make customer error handling.   

1.1 create folder call 'exceptions' inside 'users' folder and create 'UserNotFound.exception.ts' file in it. 

src/users/exceptions/UserNotFound.exception.ts
```ts
import { HttpException, HttpStatus } from "@nestjs/common";

export class UserNotFound extends HttpException {
    constructor(msg?: string, status?:HttpStatus){
        // here we can override message and status
        super(msg || 'User not found', status || HttpStatus.BAD_REQUEST)
    }
}
```

1.2 then go to 'users.controller.ts' file and use above custom exception to the ':username' route when user not found.  

src/users/controllers/users/users.controller.ts
```ts
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':username')
  getByUsername(@Param('username') username:string) {
    const user = this.usersService.getUserByUsername(username);
    if(user) return new SerializedUser(user);
    // else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    else throw new UserNotFound; // update here
  }
```

2. use nestjs buitin HTTP exception to instead of custom created 'UserNotFound' exception.  

src/users/controllers/users/users.controller.ts
```ts
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':username')
  getByUsername(@Param('username') username:string) {
    const user = this.usersService.getUserByUsername(username);
    if(user) return new SerializedUser(user);
    // else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    // else throw new UserNotFound;
    else throw new NotFoundException(); // update here
  }
```

3. show how to handle exceptions.(this will make easy to make unit test on methods)  
when you are not happy with response values, then you can use 'ExceptionFilter' to customize the response format.  

3.1 create folder call 'filter' inside 'users' folder and create file call 'HttpException.filter.ts' file.  

```ts
import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        console.log(exception.getResponse());
        console.log(exception.getStatus());
        console.log(exception);
 
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        response.sendStatus(exception.getStatus());

    }
}
```

3.2 to work this filter on the given route we need to add '@UseFilters(HttpExceptionFilter)' anotation with filter which we created.   

src/users/controllers/users/users.controller.ts
```ts 
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':username')
  @UseFilters(HttpExceptionFilter) // update here
  getByUsername(@Param('username') username:string) {
    const user = this.usersService.getUserByUsername(username);
    if(user) return new SerializedUser(user);
    // else throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    // else throw new UserNotFound;
    else throw new NotFoundException();
  }
```