import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hossam:nodejs123@learn-mongo-db.wmpsfgz.mongodb.net/Saheb'),
    UsersModule
  ],
    
})
export class AppModule {}
