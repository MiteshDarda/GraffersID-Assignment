import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordTransformer } from 'src/utils/class-transformer/password-transformer';
import { AuthModule } from 'src/auth/auth.module';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, PasswordTransformer],
  exports: [TypeOrmModule],
})
export class UsersModule {}
