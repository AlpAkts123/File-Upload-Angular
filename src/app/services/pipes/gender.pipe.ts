import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: boolean, ...args: unknown[]): unknown {
    switch (value) {
      case false:
        return "Erkek"
      case true:
        return "Kadın"
      default:
        return "Belirtmek İstemiyor"
    }
  }

}
