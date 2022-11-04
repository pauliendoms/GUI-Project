import { Pipe, PipeTransform } from '@angular/core';
import { Folder } from './folder/folder.component';

@Pipe({
  name: 'sortPipe'
})
export class SortPipePipe implements PipeTransform {

  transform(value: Folder[]): Folder[] {
    if(value.length == 0) {
      return value;
    }

    return value.sort((a, b) => a.name.localeCompare(b.name));
  }

}
