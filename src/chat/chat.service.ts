import {
  Airgram,
  InputMessageTextInput,
  isError,
  toObject,
  prompt,
  ChatUnion,
  Auth,
} from 'airgram';
import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import 'dotenv/config';
import { AirgramConfig } from '../../config/airgram.config';

@Injectable()
export class ChatService {
  private airgram: Airgram;

  constructor() {
    this.airgram = new Airgram(AirgramConfig);
    this.auth();
  }

  public async send(sendMessageDto: SendMessageDto): Promise<string> {
    const { phone, message } = sendMessageDto;
    console.log(phone, message);
    await this.run(phone, message);
    return message;
  }

  private auth() {
    this.airgram.use(new Auth({
      phoneNumber: () => process.env.PHONE as string,
      code: () => prompt(`Please enter the secret code:\n`),
    }));
  }

  private async createChatWithUser(userId: number): Promise<ChatUnion> {
    return toObject(await this.airgram.api.createPrivateChat({ userId }));
  }

  public async sendMessage(chatId: number, text: string): Promise<void> {
    const messageContent: InputMessageTextInput = {
      _: 'inputMessageText',
      text: {
        _: 'formattedText',
        text,
      },
    };
    const { request, response } = await this.airgram.api.sendMessage({
      chatId,
      messageThreadId: 0,
      replyToMessageId: 0,
      inputMessageContent: messageContent,
    });
    if (isError(response)) {
      console.error(`[${request.method}][${response.code}] ${response.message}`);
    }
  }

  public async run(phone: string, message: string) {
    await this.addContact(phone);
    const contact = await this.getContacts();
    const chat = await this.createChatWithUser(contact[0]);
    await this.sendMessage(chat.id, message);
  }

  private async addContact(phone: string): Promise<void> {
    const contact = toObject(await this.airgram.api.importContacts({
      contacts: [
        {
          _: 'contact',
          phoneNumber: phone,
        },
      ],
    }));
    if (contact.userIds.length === 1 && contact.userIds[0] === 0) {
      throw new Error('User does not exists');
    }
  }

  private async getContacts(): Promise<number[]> {
    const contacts = toObject(await this.airgram.api.getContacts());
    return contacts.userIds;
  }
}
