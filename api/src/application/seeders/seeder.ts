import { Injectable, Logger } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';

@Injectable()
export class Seeder {
  
  constructor(
    private readonly roleSeeder: RoleSeeder,
  ) {}

  private readonly logger = new Logger(Seeder.name);

  async seed() {
    this.logger.log('Starting to seed roles...');
    await this.roleSeeder.run();
    this.logger.log('Completed seeding roles.');
  }
  
}
