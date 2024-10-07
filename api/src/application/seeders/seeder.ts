import { Injectable, Logger } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';

@Injectable()
export class Seeder {

  constructor(
    private roleSeeder: RoleSeeder,
    private userSeeder: UserSeeder,
  ) { }

  async seed() {
    console.log('Starting seeders...');
    await Promise.all([
      this.roleSeeder.run(),
      this.userSeeder.run(),
    ]);
    console.log('Completed seeders.');
  }

}
