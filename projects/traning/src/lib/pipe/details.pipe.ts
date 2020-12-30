import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'details'
})
export class DetailsPipe implements PipeTransform {

  transform(value: any): any {

    return value.length > 200 ? value.substr(0, 200) +'' : value;
  }
}

