import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
    private customers = [
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
}
