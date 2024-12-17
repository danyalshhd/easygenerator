import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
}

bootstrap().catch((err) => {
  console.error('Error populating database:', err);
  process.exit(1);
});
