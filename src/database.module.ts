import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import config from './config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { host, name, username, password } = configService.database;
        return {
          type: 'postgres',
          port: 5432,
          host,
          database: name,
          username,
          password,
          synchronize: true,
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
