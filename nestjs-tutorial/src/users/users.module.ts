import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // + add 
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm'; // + add

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  // providers: [UsersService]
  providers: [
    {
      provide:'USER_SERVICE',
      useClass: UsersService
    }
  ]

})
export class UsersModule {}
