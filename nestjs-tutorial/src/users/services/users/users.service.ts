import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SerializedUser, User } from 'src/users/types/User';

@Injectable()
export class UsersService {

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
}
