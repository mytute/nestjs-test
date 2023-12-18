#  Controlling the Request & Response

1. create list of customers inside 'CustomersService' file and update 'findCustomer' to find customer by id.    

src/customers/services/customers/customers.service.ts
```ts
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
```

2. in 'customer.controller.ts' file make changes of 'getCustomer' method to make receive router parameter.   

* in express way(get more controller of the req and res)   

src/customers/controllers/customer/customer.controller.ts  
 note: when you are using '@Req()' and '@Res()' you can't use return to send response 
```ts
/* ... */
@Get(':id')
getCustomer(@Req() req:Request, @Res() res:Response){
    const id = Number(req.params.id)
    const customer =  this.customerService.findCustomer(id);
    if(customer){
    res.send(customer);
    }else{
    res.status(400).send({msg:'Customer not found'});
    }
}
```


* in nestjs way

src/customers/controllers/customer/customer.controller.ts
```ts
@Get(':id')
    getCustomer1(@Param('id') id: number){
      console.log(typeof id); // result > string
      return this.customerService.findCustomer(id);
    }
```
by converting 'id' from string to number using pips ('ParseIntPipe')
src/customers/controllers/customer/customer.controller.ts
```ts
// test url > http://localhost:3000/customer/search/1
@Get('/search/:id')
getCustomer1(@Param('id', ParseIntPipe) id: number){
    console.log(typeof id); // result > number
    const customer =  this.customerService.findCustomer(id);
    if(customer) return customer;
    else throw new HttpException('Customer not found', HttpStatus.BAD_REQUEST);
}
```