# Validating POST Requests

validating DTO  

1. install following two packages to add validation feature.   

```bash
$ npm i --save class-validator class-transformer
```

DOC > https://www.npmjs.com/package/class-validator


2. show how to add class validation for DTO   

you have to call this validation in the controller in order to validate.    

src/customers/dtos/CreateCustomer.dto.ts
```ts
import { IsEmail, IsNotEmpty, IsNumberString } from "class-validator";

export class CreateCustomerDto {
    @IsEmail()
    email: string;

    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;
}
```

3. show how to call definded validation in the controller using '@UsePipes()' and show the results using POSTMAN application.    

src/customers/controllers/customer/customer.controller.ts
```ts
@Post('create')
@UsePipes(ValidationPipe) // add here
createCustomer(@Body() createCustomerDto:CreateCustomerDto){
    console.log(createCustomerDto);
    this.customerService.createCustomer(createCustomerDto);
}
```

4. show how to validate nested object. for that create 'CreateAddressDto' and add it in to 'CreateCustomer' dto address line.  

* create 'CreateAddressDto' and add validation to it.    

src/customers/dtos/CreateAddress.dto.ts
```ts
import { IsNotEmpty } from "class-validator";

export class CreateAddressDto {
    @IsNotEmpty()
    line1:string;

    line2?:string;

    @IsNotEmpty()
    zip:string;

    @IsNotEmpty()
    city:string;

    @IsNotEmpty()
    state:string;
}
```

src/customers/dtos/CreateCustomer.dto.ts
```ts
import { IsEmail, IsNotEmpty, IsNumberString, ValidateNested } from "class-validator";
import { CreateAddressDto } from "./CreateAddress.dto";
import { Type } from "class-transformer";

export class CreateCustomerDto {
    @IsEmail()
    email: string;

    @IsNumberString()
    id: number;

    @IsNotEmpty()
    name: string;

    @ValidateNested()
    @Type(()=> CreateAddressDto) // start to validate nested class
    @IsNotEmpty() // address field is manditory 
    address: CreateAddressDto; // nested address object
}
```
postman [URL] > http://localhost:3000/api/customer/create
```json
{
    "email" : "samadhivkcom@gmail.com",
    "id": "4",
    "name": "samadhi laksahan",
    "address":{
       "line1": "x",
       "zip": "zip",
       "city": "city",
       "state": "state"
    }
}
```