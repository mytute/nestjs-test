import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomersService } from './services/customers/customers.service';

@Module({
  controllers: [CustomerController],
  providers: [CustomersService]
})
export class CustomersModule {}
