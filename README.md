#  POST Requests & Data Transfer Objects

1. show how to set global api url prefix. 
src/main.ts
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api') // + add
  await app.listen(3000);
}
bootstrap();
```


2. show how to handle request body using 'Data Transfer Objects' instead of express way with '@Req' body.    

2.1  create folder call 'dtos' inside 'customers' folder and inside it create 'CreateCustomer.dto.ts' file.

src/customers/dtos/CreateCustomer.dto.ts
```ts
export class CreateCustomerDto {
   id: number;
   email: string;
   name: string;
}
```

2.2 create folder call 'types' inside 'customers' and inside it create 'Customer.ts' file.  

src/customers/types/Customer.ts
```ts
interface Customer {
  id: number;
  email: string;
  name: string;
}
```

2.3 add above created 'Customer.ts' interface to 'customers.service.ts' file, customer list type.  

src/customers/services/customers/customers.service.ts
```ts
    private customers: Customer[] = [ // + add here
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
```

2.4 inside 'customers.service.ts' file add 'createCustomer' and 'getCustomers' for add new customer and load all customers  

src/customers/services/customers/customers.service.ts
```ts
createCustomer(customerDto:CreateCustomerDto){
    this.customers.push(customerDto);
}

getCustomers(){
    return this.customers;
}
```

2.5 create routes in 'customers.controller.ts' file in order to call above servieces.    
src/customers/controllers/customer/customer.controller.ts
```ts
@Post('create')
creatCustomer(@Body() createCustomerDto:CreateCustomerDto){
    console.log(createCustomerDto)
    this.customerService.createCustomer(createCustomerDto)
}

@Get('')
getAllCustomers(){
    return this.customerService.getCustomers()
}
```

2.6 test above create and load all customers api using following urls   

to create new customer.    
[POST] http://localhost:3000/api/customer/create 
```json
{
    "email" : "samadhivkcom@gmail.com",
    "id": "4",
    "name": "samadhi laksahan"
}
```

to load all customer.    
[GET] http://localhost:3000/api/customer