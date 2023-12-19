import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm'; // + add
import { Repository } from 'typeorm'; // + add
import { User as UserEntity } from 'src/typeorm'; // + add
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { SerializedUser, User } from 'src/users/types/User'; 

@Injectable()
export class UsersService {

    constructor(@InjectRepository(UserEntity) private readonly userRespository: Repository<UserEntity>){} // + add

    private users:User[] = [
        {
            username:'samadhi',
            password:'samadhi001'
        },
        {
            username:'laksahan',
            password:'laksahan001'
        },
        {
            username:'piyasiri',
            password:'piyasiri001'
        }
    ];

    getUsers(){
        // return this.users;
        return this.users.map((user)=> plainToClass(SerializedUser, user));
    }

    getUserByUsername(username:string){
        return this.users.find((user)=> user.username === username)
    }

    createUser(createUserDto: CreateUserDto){
        // return user entity and this is sycronize method
        const newUser = this.userRespository.create(createUserDto);
        // no async becasue return promise handle by nestjs middleware
        return this.userRespository.save(newUser);
    }
}
