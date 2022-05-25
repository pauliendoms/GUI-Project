import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitLength'
})
export class LimitLengthPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    let result: string = "";
    if (value.length > limit) {
      result = value.slice(0, limit) + "...";
    } else {
      result = value;
    }

    return result;
  }

}
