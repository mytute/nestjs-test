# Controllers & Services 

1. show how to change app listen port number to 5001 and using browser go to that port and show the result. And same time show 'src/app.controller.ts' file and where is this result come from.   

src/main.ts
```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000); // change here.. 3000 -> 5001
}
bootstrap();
```

2. delete 'src/app.service.ts', 'src/app.controller.ts' and 'src/app.controller.spec.ts' fiels and generate module call 'customers'. in show this module imported to 'app.module.ts' file to as 'import'.   

```bash 
$ nest generate module customers
```

3. generate controller inside above cutomer module and show 'CustomerController' already included inside 'customers.module.ts' file contollers array.   

```bash 
$ nest g controller customers/controllers/customer
```

src/customers/customers.module.ts
```ts 
import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer/customer.controller';

@Module({
  controllers: [CustomerController] // 'CustomerController' already added here.
})
export class CustomersModule {}
```
src/customers/controllers/customer/customer.controller.ts
```ts 
import { Controller } from '@nestjs/common';

@Controller('customer')
export class CustomerController {}
```


4. create new 'GET' route inside custmers controller and show the result on 'http://localhost:3000/customers'   

src/customers/controllers/customer/customer.controller.ts
```ts 
import { Controller, Get } from '@nestjs/common';

@Controller('customer')
export class CustomerController {

  @Get('')
  getCustomer(){
    return {
        id:1,
        email:'samadhivkcom@gmail.com',
        createAt: new Date()
    }
  }
}
```

5. show how to create service for handling business logic of the endpoint. and show this service have added to 'CustomersModule' inside providers array.  
repository layer : deal with database 
service layer : deal with business logic and communicate with respository and controller.   
controller layer : deal with request 

```bash 
$ nest g service customers/services/customers
```

src/customers/services/customers/customers.service.ts
```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {}
```

src/customers/customers.module.ts
```ts
/* ... */
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomersService] // have added here automatically  
})
export class CustomersModule {}
```

6. move 'CustomerController' 's  'getCustomer' funtion in to 'CustomersService' and show how to make dependency injection.        

src/customers/controllers/customer/customer.controller.ts
```ts 
/* ... */
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomersService){} // + add 

  @Get('')
  getCustomer(){
    return this.customerService.findCustomer(); + add 
  }
}
```

src/customers/services/customers/customers.service.ts
```ts 
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {

    findCustomer(){ // + add
        return {
            id:1,
            email:'samadhivkcom@gmail.com',
            createAt: new Date()
        }
      }
}
```
