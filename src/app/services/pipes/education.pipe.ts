import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'education'
})
export class EducationPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value==0) {
      return "İlk Okul"
    }
    if (value==1) {
      return "Lise"
    }
    if (value==2) {
      return "Ön Lisans"
    }
    if (value==3) {
      return "Yüksek Lisans"
    }
    if (value==4) {
      return "Doktora"
    }
    return null;
  }

}
