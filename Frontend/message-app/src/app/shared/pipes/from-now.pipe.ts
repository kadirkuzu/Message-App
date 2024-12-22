import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {

  transform(value: Date) {
    return moment.utc(value).local().calendar(null, {
      sameDay: "HH:mm", 
      lastDay: "[Yesterday]",
      lastWeek: "[Last] dddd",
      sameElse: "MM/DD/YYYY"
  });
  }

}
