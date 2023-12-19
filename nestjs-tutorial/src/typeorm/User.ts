import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn({
        type:'bigint', // change default type to bigint
        name:'user_id' // overwrite database column name to user_id
    })
    id: number;

    @Column({
        nullable: false,
        default: ''
    })
    username:string;

    @Column({
        name:'email_address',
        nullable: false,
        default: ''
    })
    emailAddress:string;

    @Column({
        nullable:false
    })
    password:string;
}
