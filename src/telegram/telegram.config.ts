import { TelegramOptions } from './telegram.types';
import { ConfigService } from '@nestjs/config';
import { TELEGRAM_TOKEN_NOT_FOUND } from './telegram.errors';

export const setTelegramConfig = (
  configService: ConfigService,
): TelegramOptions => {
  const token = configService.get('TELEGRAM_TOKEN');

  if (!token) {
    throw new Error(TELEGRAM_TOKEN_NOT_FOUND);
  }

  return {
    token,
    chatId: configService.get('CHAT_ID') ?? '',
  };
};
