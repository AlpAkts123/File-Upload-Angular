import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class QrComponent {
   myAngularxQrCode: string = null;
  

  constructor (private router:ActivatedRoute) {
    
    this.myAngularxQrCode = this.router.snapshot.paramMap.get("id");
}
}