import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module'; 
import { ValidationPipe } from '@nestjs/common';
import { Seeder } from '@application/seeders/seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  
  const seeder = app.get(Seeder);
  await seeder.seed();

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();