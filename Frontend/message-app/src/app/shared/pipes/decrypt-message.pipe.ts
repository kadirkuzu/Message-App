import { decryptMessage } from '@/app/common/helpers/message-helpers';
import { Message } from '@/app/models/message';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decryptMessage'
})
export class DecryptMessage implements PipeTransform {

  transform(message: Message) {
    return message.isEncrypted ? decryptMessage(message.content) : message.content
  }

}
