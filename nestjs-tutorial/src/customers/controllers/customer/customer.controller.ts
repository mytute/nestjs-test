import { Controller, Get } from '@nestjs/common';
import { CustomersService } from 'src/customers/services/customers/customers.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomersService){} 

    @Get('')
    getCustomer(){
      return this.customerService.findCustomer();
    }
}
