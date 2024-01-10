import { Inject, Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { TelegramOptions } from './telegram.types';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;
  private options: TelegramOptions;

  constructor(@Inject(TELEGRAM_MODULE_OPTIONS) options: TelegramOptions) {
    this.options = options;
    this.bot = new TelegramBot(options.token, { polling: true });

    this.messagesListener();
  }

  async sendMessage(
    message: string,
    chatId: string | number = this.options.chatId,
  ): Promise<void> {
    await this.bot.sendMessage(chatId, message);
  }

  async messagesListener(): Promise<void> {
    this.bot.on('message', (message) => {
      console.log(123, message);

      this.sendMessage(JSON.stringify(message), message.chat.id);
    });
  }
}
