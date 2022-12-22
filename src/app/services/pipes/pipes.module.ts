import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenderPipe } from './gender.pipe';
import { WhitecollarPipe } from './whitecollar.pipe';



@NgModule({
  declarations: [GenderPipe, WhitecollarPipe],
  imports: [
    CommonModule,
    
  ],exports:[GenderPipe, WhitecollarPipe]
})
export class PipesModule { }
