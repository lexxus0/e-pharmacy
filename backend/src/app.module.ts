import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validateEnvVariable } from './utils/env.util';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(validateEnvVariable(process.env.DB_URI, 'DB_URI')),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
