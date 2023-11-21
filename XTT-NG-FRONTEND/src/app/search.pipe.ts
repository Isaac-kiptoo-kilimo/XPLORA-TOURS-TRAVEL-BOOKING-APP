import { Pipe, PipeTransform } from '@angular/core';
import { Tour } from './interfaces/tour';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(tours: Tour[], type: string): Tour[] {
    if(!tours || type == ''){
     return tours 
    };
    const filtered: Tour[]=[];

    for(let tour of tours){
      if(tour.type.toLowerCase().includes(type.toLowerCase())){
        filtered.push(tour)
      }
    }
    return filtered;
  }

}
