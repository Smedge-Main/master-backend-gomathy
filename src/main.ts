// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { Transport } from '@nestjs/microservices';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.setGlobalPrefix('api');

//   app.enableCors({
//     origin: 'http://localhost:5173', // your React app
//   });

//   // // Microservice
//   // app.connectMicroservice({
//   //   transport: Transport.RMQ,
//   //   options: {
//   //     urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
//   //     queue: 'college_admin_queue',
//   //     queueOptions: { durable: false },
//   //   },
//   // });

//   await app.startAllMicroservices();
//   console.log('Microservice is running...');

//   const port = process.env.PORT || 3000;
//   await app.listen(port);

//   console.log(`🚀 Server is running on port: ${port}`);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: 'http://localhost:5173' });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 App Admin is running on port ${port}`);
}
bootstrap();
