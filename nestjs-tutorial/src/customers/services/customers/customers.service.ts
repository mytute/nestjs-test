import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {

    findCustomer(){ // + add
        return {
            id:1,
            email:'samadhivkcom@gmail.com',
            name: 'Samadhi'
        }
    }
}