

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterNull',
})
export class FilterNullPipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.filter((el) => {
        // // let a = Object.keys(el);
        // console.log(el.nombre , el['nombre']);
        if(el.quantity > 0){
            return el;
        }
    });
  }

}
