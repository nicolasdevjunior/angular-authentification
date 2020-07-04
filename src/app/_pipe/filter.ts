import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterGlobalPipe implements PipeTransform {

  transform(value: any, searchText: any): any {
    if(!searchText) {
      return value;
    }
    return value.filter((data) => this.matchValue(data,searchText)); 
  }

  matchValue(data, value) {
    value = value.replace('+','\\+'); // pour échapper '+' dans le Regex
    return Object.keys(data).map((key) => {
        return new RegExp(value, 'gi').test(data[key]);
    }).some(result => result);
  }

  

}
