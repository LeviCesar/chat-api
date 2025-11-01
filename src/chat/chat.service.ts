import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
// import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './models/chat.entity';
import { InjectModel } from '@nestjs/sequelize';
import { AccountService } from 'src/account/account.service';
import { CreatedResponseDto } from 'src/account/dto/responses.dto';
import { v4 as uuidv4 } from 'uuid';

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

  // findAll() {
  //   return `This action returns all chat`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} chat`;
  // }

  // update(id: number, updateChatDto: UpdateChatDto) {
  //   return `This action updates a #${id} chat`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} chat`;
  // }
}
