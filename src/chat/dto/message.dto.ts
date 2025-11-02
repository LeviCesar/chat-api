export class MessageDto {
  chatId: string;
  accountId: number;
  message: string;
}

export class MessageListDto {
  messages: MessageDto[]
}