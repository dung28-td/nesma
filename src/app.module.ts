import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import GraphQLModule from './graphql/graphql.module';

@Module({
  imports: [GraphQLModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
