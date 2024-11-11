import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { Seeder } from '@infra/database/seeders/seeder';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const seeder = app.get(Seeder);
  await seeder.seed();

  const config = new DocumentBuilder()
    .setTitle('Selffy API')
    .setDescription('Selffy REST API documentation')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs/swagger', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}

bootstrap();