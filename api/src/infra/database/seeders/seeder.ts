import { Injectable } from '@nestjs/common';
import { UserSeeder } from './user.seeder';
import { ProjectSeeder } from './project.seeder';
import { CostSeeder } from './cost.seeder';
import { TaskSeeder } from './task.seeder';

@Injectable()
export class Seeder {

  constructor(
    private userSeeder: UserSeeder,
    private projectSeeder: ProjectSeeder,
    private costSeeder: CostSeeder,
    private taskSeeder: TaskSeeder,
  ) { }

  async seed() {
    console.log('Starting seeders...');
    await this.userSeeder.run();
    await this.projectSeeder.run();
    await this.costSeeder.run();
    await this.taskSeeder.run();
    console.log('Completed seeders.');
  }

}
