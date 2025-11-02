import { Injectable } from '@nestjs/common';
import { ChatService } from 'src/chat/chat.service';
import { MessageDto } from 'src/chat/dto/message.dto';

@Injectable()
export class ChatRoomService {
  constructor(
    private chatService: ChatService,
  ) {}

  async message(messageDto: MessageDto) {
    await this.chatService.addMessage(messageDto);
    return messageDto;
  }

  async getMessages() {
    
  }

  // findAll() {
  //   return `This action returns all chatRoom`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chatRoom`;
  // }

  // update(id: number, updateChatRoomDto: UpdateChatRoomDto) {
  //   return `This action updates a #${id} chatRoom`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chatRoom`;
  // }
}
