import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'whitecollar'
})
export class WhitecollarPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): string {
    switch (value) {
      case true:
        return "İdari"
        
      case false:
        return "Üretim"
      default:
        return "Teknik"
    }
  }

}
