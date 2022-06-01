import { NestFactory } from '@nestjs/core';
import Swagger from 'lib/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

const port = process.env.PORT || 3000;

const swaggerConfig = Swagger.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // https://docs.nestjs.com/recipes/prisma#issues-with-enableshutdownhooks
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Setup Swagger
  Swagger.setup(app, swaggerConfig)

  await app.listen(port);
}
bootstrap();
