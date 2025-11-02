import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './models/chat.model';
import { InjectModel } from '@nestjs/sequelize';
import { AccountService } from 'src/account/account.service';
import { CreatedResponseDto } from 'src/account/dto/responses.dto';
import { v4 as uuidv4 } from 'uuid';
import { MessageDto, MessageListDto } from './dto/message.dto';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ChatService {
  constructor (
    @InjectModel(Chat) private chatModel: typeof Chat,
    private accountService: AccountService,
  ) {}

  async create(currentAccount: number, createChatDto: CreateChatDto): Promise<CreatedResponseDto> {
    if (!currentAccount) {
      throw new NotFoundException("account not found");
    }
    
    createChatDto.integrants = Array.from(
      new Set([...(createChatDto.integrants || []), currentAccount])
    );
    if (createChatDto.integrants.length < 2) {
      throw new BadRequestException("required two integrants to create a chat");
    }

    let chat = await this.chatModel.create({
      id: uuidv4(),
      title: createChatDto.title,
    });
    
    let accountsId = await this.accountService.findAllById(createChatDto.integrants);
    await chat.setIntegrants(accountsId);
    return { id: chat.id };
  }

  async addMessage(messageDto: MessageDto): Promise<number> {
    let chat = await this.chatModel.findByPk(messageDto.chatId);
    if (!chat) throw new WsException('chat not found');

    let message = await chat.createMessage({
      integrant: messageDto.accountId,
      message: messageDto.message,
    })

    return message.id;
  }

  // async getMessages(chatId: string): Promise<MessageListDto> {
  //   let chat = await this.chatModel.findByPk(chatId);
  //   let messages = await chat.()
  //   return {
  //     messages: []
  //   }
  // }
}
