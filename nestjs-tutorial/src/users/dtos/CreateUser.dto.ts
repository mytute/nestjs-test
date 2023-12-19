import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @IsNotEmpty()
    @MinLength(10)
    password: string;
}