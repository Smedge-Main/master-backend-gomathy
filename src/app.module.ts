import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PipelineModule } from './pipeline/pipeline.module';

@Module({
  imports: [BookModule,
    MongooseModule.forRoot('mongodb://localhost:27017/learn'),
    PipelineModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
