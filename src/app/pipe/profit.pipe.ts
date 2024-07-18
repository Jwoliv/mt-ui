import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'profit',
  standalone: true
})
export class ProfitPipe implements PipeTransform {

  transform(value: number, isProfit: boolean): number {
    return isProfit ? value : value * -1;
  }

}
