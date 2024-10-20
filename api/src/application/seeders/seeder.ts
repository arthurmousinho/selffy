import { Injectable } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { UserSeeder } from './user.seeder';
import { ProjectSeeder } from './project.seeder';

@Injectable()
export class Seeder {

  constructor(
    private roleSeeder: RoleSeeder,
    private userSeeder: UserSeeder,
    private projectSeeder: ProjectSeeder,
  ) { }

  async seed() {
    console.log('Starting seeders...');
    await this.roleSeeder.run();
    await this.userSeeder.run();
    await this.projectSeeder.run();
    console.log('Completed seeders.');
  }

}
