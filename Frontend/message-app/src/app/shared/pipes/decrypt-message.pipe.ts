import { decryptMessage } from '@/app/common/helpers/message-helpers';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decryptMessage'
})
export class DecryptMessage implements PipeTransform {

  transform(value: string) {
    return decryptMessage(value)
  }

}
