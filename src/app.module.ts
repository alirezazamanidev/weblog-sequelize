import { Module } from '@nestjs/common';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv, Keyv } from '@keyv/redis';

@Module({
  imports: [DatabaseModule,CacheModule.registerAsync({
    isGlobal:true,
    useFactory:async()=>{

      return {
        stores:[
          createKeyv(`redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`)
        ]
      }
    }
  }), UserModule, AuthModule],
})
export class AppModule {}
