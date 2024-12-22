import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'dateUtc',
})
export class DateUtcPipe implements PipeTransform {

  transform(value: string | Date, format = 'MM/DD/YYYY, HH:mm'): string{
    return moment.utc(value).local().format(format)
  }

}
