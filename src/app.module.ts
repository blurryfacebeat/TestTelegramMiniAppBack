import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { setTelegramConfig } from './telegram/telegram.config';

@Module({
  imports: [
    TelegramModule,
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: setTelegramConfig,
    }),
  ],
})
export class AppModule {}
