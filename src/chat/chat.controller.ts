import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {
  }

  @MessagePattern('sendMessage')
  create(sendMessageDto: SendMessageDto) {
    return this.chatService.send(sendMessageDto);
  }
}
