import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { ChatRoomService } from './chat-room.service';
import { MessageDto } from 'src/chat/dto/message.dto';

@WebSocketGateway(3001, { transports: ['websocket'] })
export class ChatRoomGateway {
  constructor(private readonly chatRoomService: ChatRoomService) {}

  @SubscribeMessage('room')
  create(@MessageBody() messageDto: MessageDto) {
    return this.chatRoomService.message(messageDto);
  }
}
