import { MiddlewareConsumer, Module, NestMiddleware, NestModule, RequestMethod } from '@nestjs/common';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';
import { NextFunction, Request, Response } from 'express';

@Module({
  controllers: [CustomerController],
  providers: [CustomersService]
})
export class CustomersModule implements NestModule{
  configure(consumer:MiddlewareConsumer){
    consumer.apply(
       ValidateCustomerMiddleware,
       ValidateCustomerAccountMiddleware,
       (req:Request, res:Response, next:NextFunction) => {
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
    // {
    //   path:'customer/search/:id',
    //   method: RequestMethod.GET
    // },
    // {
    //   path:'customer/:id',
    //   method: RequestMethod.GET
    // }
    )
  }
}
