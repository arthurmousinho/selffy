import { Injectable } from '@nestjs/common';
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
    await this.roleSeeder.run(),
    await this.userSeeder.run(),
    console.log('Completed seeders.');
  }

}
