import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNumber'
})
export class FilterNumberPipe implements PipeTransform {

  transform(value): any {
    console.log(value);
    return null;
  }

}
