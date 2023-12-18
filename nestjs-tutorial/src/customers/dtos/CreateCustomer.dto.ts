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
