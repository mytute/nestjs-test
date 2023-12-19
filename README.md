# Connecting to MySQL using TypeORM.

here we are going to connect mysql with TypeORM.

1. show command to install typeorm, type and msql driver.

```bash
$ npm i @nestjs/typeorm typeorm mysql2
```

note : make sure your mysql server up and running.   

2. show how to connect mysql database.   

2.1 in 'app.modules.ts' file add database datails to '@Module' imports.   
src/app.module.ts
```ts
import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Samadhi@007',
      database: 'nestjs_db',
      entities: [], // classes that anotation with entities.
      synchronize: true // allow auto create/update schema. false on production need migration.
      // prod miss data if put 'synchronize: true'
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```
2.2 restart to nestjs to connect with mysql database.   
this will show becasue of not database created that we defined in 'app.module.ts' file.  
```bash
$ npm run start:dev
```

2.3 login to mysql database to create above defined 'database'   
```bash
$ mysql -u root -p
$ mysql > create database nestjs_db;
```

2.4 restart to nestjs to connect with mysql database.   

```bash
$ npm run start:dev
```

3. show how to create tables with typeorms    

3.1 create folder call 'typeorm' in 'src' folder and create file call 'User.ts'.    

src/typeorm/User.ts
```ts
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
```

3.2 in the 'typeorm' folder create file call 'index.ts' file to collect the all entities to import to 'app.module.ts' file.   

src/typeorm/index.ts
```ts
import { User } from './User';

const entities = [User];

export { User };
export default entities;
```

3.3 all entities to import to 'app.module.ts' file

src/app.module.ts
```ts
@Module({
  imports: [
    CustomersModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Samadhi@007',
      database: 'nestjs_db',
      entities: [...entities], // update here
      synchronize: true 
    })
  ],
  controllers: [],
  providers: [],
})
```