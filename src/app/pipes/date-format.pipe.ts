import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const dateObj = new Date(value);
    // Pipe for date formatting - mm/dd/yyyy hh:min:sec
    const formattedDate = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds().toString().length==2?dateObj.getSeconds():`0${dateObj.getSeconds()}`}`;
    return formattedDate;
  }
}
