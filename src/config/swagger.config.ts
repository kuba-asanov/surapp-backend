import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Surapp API')
  .setDescription('The Surapp API description')
  .setVersion('1.0')
  .build();
