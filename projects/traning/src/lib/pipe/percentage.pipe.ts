import { Pipe, PipeTransform } from "@angular/core";

import memo from 'memo-decorator';
@Pipe({
  name: "percentage",
})
export class PercentagePipe implements PipeTransform {
  @memo()
  transform(value: any, val: any): any {
    // console.log(value, val, "+++++++++++++");
    return Math.floor((value / val) * 100);
  }
}
