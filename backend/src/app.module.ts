import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/configuration';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './api/users/users.module';
// import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './api/users/entities/user.entity';
import { CompanyModule } from './api/company/company.module';
import { ReviewModule } from './api/review/review.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // Registers User entity globally
    // Configuration module for environment variables
    ConfigModule.forRoot({
      isGlobal: true, // Makes config globally available
      envFilePath: '.env', // Points to your .env file
      load: [config], // Loads your custom configuration
    }),
    // Authentication and Authorization modules
    AuthModule, // AuthModule is imported here to provide JwtService globally
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // Application-specific modules
    DatabaseModule,
    UsersModule,
    CompanyModule,
    ReviewModule,
  ],
  controllers: [AppController], // Application's controllers
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard, // Registers AuthGuard globally
    // },
  ],
})
export class AppModule {}
