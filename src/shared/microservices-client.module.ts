import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule, // for ConfigService support

    ClientsModule.registerAsync([
      //For App admin to connect with college-admin
      {
        name: 'COLLEGE_ADMIN_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')].filter(
              (url): url is string => typeof url === 'string', // Ensure the URL is a string
            ),
            queue: 'college_admin_queue',
            queueOptions: { durable: false },
          },
        }),
      },

      // Tutor service client
      {
        name: 'TUTOR_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBITMQ_URL')].filter(
              (url): url is string => typeof url === 'string',
            ),
            queue: 'tutor_flow_queue',
            queueOptions: { durable: false },
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MicroservicesClientModule {}
