# Middleware

1. inside 'customers' folder create another folder call 'middlewares' and create file call 'validate-customer.middleware.ts. file         

```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable() // middleware support to dependency injection.
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello, world. I am inside ValidateCustomerMiddleware');
    next();
  }
}
```

2. to apply above create middleware need to add it to 'customers.module.ts' file.     

here we can add in to '@Module({})' too. but here adding to class body of Module.   

src/customers/customers.module.ts
```ts
import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';

@Module({
  controllers: [CustomerController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(ValidateCustomerMiddleware).forRoutes(
    {
      path:'customer/search/:id', // route that want to add middleware
      method: RequestMethod.GET  // route type
    },
    // {
    //   path:'customer/:id',
    //   method: RequestMethod.GET
    // }
    )
  }
}
```

3. show how to register middleware for entire controller.     

src/customers/customers.module.ts
```ts
/* ... */
import { CustomerController } from './controllers/customer/customer.controller';

/* ... */
@Module({
  controllers: [CustomerController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(ValidateCustomerMiddleware).forRoutes(CustomerController) // update here
  }
}
```

4. show how to exclude certain path when middleware register for entire controller.

src/customers/customers.module.ts
```ts
/* ... */
@Module({
  controllers: [CustomerController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(ValidateCustomerMiddleware)
    .exclude({  // add start here
        path: 'api/customer/create',

        method: RequestMethod.POST
    })
    .forRoutes(CustomerController) 
  }
}
```

5. show how to authorize using 'ValidateCustomerMiddleware'.  

just you need to update 'validate-customer.middleware.ts' file.

src/customers/middlewares/validate-customer.middleware.ts
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello, world. I am inside ValidateCustomerMiddleware');
    const { authorization } = req.headers;
    if(!authorization){
        return res.status(403).send({error:'No Authentication Token Provided'});
    }
    if(authorization=== '123'){
      next();
    }else {
      return res.status(403).send({error: 'Invalid Authentication Token Provided.'})
    }
  }
}
```

6. create another middleware call 'CustomerAccountValidate'   

6.1 create middleware file inside 'middlewares' folder call 'validate-customer-account.middleware.ts'   


src/customers/middlewares/validate-customer-account.middleware.ts
```ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable() 
export class ValidateCustomerAccountMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello, world. I am inside ValidateCustomerAccountMiddleware');
    const { valid } = req.headers;
    if(valid){
      next();
    }else {
      return res.status(401).send({error: 'Customer Account Invalid!'})
    }
  }
}
```

6.2 show how to define second middleware in 'CustomersModule'.   

```ts
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';

@Module({
  controllers: [CustomerController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware // add here
        )
      .exclude({
        path: 'api/customer/create',
        method: RequestMethod.POST
      })
      .forRoutes(
        CustomerController
    )
  }
}
```

7. show how to add middleware as a arrow function inside CustomersModule class body.   

```ts
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';

@Module({
  controllers: [CustomerController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware 
        (req:Request, res:Response, next:NextFunction) => { // start to add from here.
        console.log('Last Middleware');
        next();
        }
        )
      .exclude({
        path: 'api/customer/create',
        method: RequestMethod.POST
      })
      .forRoutes(
        CustomerController
    )
  }
}
```


