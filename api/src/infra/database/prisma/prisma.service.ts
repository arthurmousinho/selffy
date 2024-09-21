import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {

  constructor() {
    super(); 
    console.log('PrismaClient instantiated');
  }

  async onModuleInit() {
    console.log('Connecting to Prisma...');
    await this.$connect();
    console.log('Prisma connected');
  }

}