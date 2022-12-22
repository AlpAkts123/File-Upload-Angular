import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationPipe } from './education.pipe';



@NgModule({
  declarations: [EducationPipe],
  imports: [
    CommonModule,
    
  ],exports:[EducationPipe]
})
export class PipesModule { }
