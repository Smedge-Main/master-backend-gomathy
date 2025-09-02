// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { BookModule } from './book/book.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { PipelineModule } from './pipeline/pipeline.module';
// import { ModuleModule } from './module/module.module';

// import { DropdownModule } from './dropdown/dropdown.module';
// import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MicroservicesClientModule } from './shared/microservices-client.module';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // makes ConfigService available everywhere
//     }),
//     BookModule,
//     MongooseModule.forRoot('mongodb://localhost:27017/learn'),
//     PipelineModule,
//     ModuleModule,
//     DropdownModule,
//     RabbitmqModule,
//     MicroservicesClientModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { ModuleModule } from './module/module.module';
import { DropdownModule } from './dropdown/dropdown.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { MicroservicesClientModule } from './shared/microservices-client.module';

import { TutorflowRabbitMqModule } from './rabbitmq/tutorflowRabbitMQ/tutorflow-rabbit-mq/tutorflow-rabbit-mq.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost:27017/learn'),

    // feature modules
    BookModule,
    PipelineModule,
    ModuleModule,
    DropdownModule,
    RabbitmqModule,
    TutorflowRabbitMqModule,

    // 👇 already registers COLLEGE_ADMIN_SERVICE client
    MicroservicesClientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
