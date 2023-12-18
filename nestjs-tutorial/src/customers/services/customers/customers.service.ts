import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customers/dtos/CreateCustomer.dto';

@Injectable()
export class CustomersService {
    private customers: Customer[] = [
        {
            id:1,
            email:'samadhi@gmail.com',
            name:'Samadhi'
        },
        {
            id:2,
            email:'laksahan@gmail.com',
            name:'Laksahan'
        },
        {
            id:1,
            email:'piyasiri@gmail.com',
            name:'Piyasiri'
        }
    ];


    findCustomer(id:number){ // + add
        return this.customers.find((customer)=> customer.id===id)
    }

    createCustomer(customerDto:CreateCustomerDto){
      this.customers.push(customerDto);
    }

    getCustomers(){
        return this.customers;
    }
}
