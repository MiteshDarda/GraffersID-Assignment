import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pool } from 'pg';

const pgPoolFactory = {
  provide: 'DATABASE_POOL',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const pool = new Pool({
      host: configService.getOrThrow('database.host'),
      port: configService.getOrThrow('database.port'),
      user: configService.getOrThrow('database.username'),
      password: configService.getOrThrow('database.password'),
      database: configService.getOrThrow('database.database'),
    });

    // Error handling
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });

    // Logging
    pool.on('connect', () => {
      console.log('Connected to the database');
    });

    pool.on('acquire', () => {
      console.log('Client checked out from the pool');
    });

    pool.on('remove', () => {
      console.log('Client removed from the pool');
    });

    // Query logging
    const originalQuery = pool.query;
    pool.query = (...args) => {
      console.log('Executing query:', args[0]);
      return originalQuery.apply(pool, args);
    };

    return pool;
  },
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('database.host'),
        port: configService.getOrThrow('database.port'),
        username: configService.getOrThrow('database.username'),
        password: configService.getOrThrow('database.password'),
        database: configService.getOrThrow('database.database'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('database.synchronize'),
        logging: configService.getOrThrow('database.logging'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [pgPoolFactory],
  exports: ['DATABASE_POOL'],
})
export class DatabaseModule {}
