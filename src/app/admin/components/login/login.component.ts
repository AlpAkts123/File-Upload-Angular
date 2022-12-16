import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login-model';
import { LoginResponseModel } from 'src/app/models/login-response-model';
import { NotificationService, ToastrMessageType, ToastrPosition } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginform:LoginModel=new LoginModel;
  loginResponseModel:LoginResponseModel=new LoginResponseModel();
  constructor(private http: HttpClient,private notify:NotificationService,private router:Router) {


  }
  login(email:HTMLInputElement,password:HTMLInputElement) {
    this.loginform.email=email.value;
    this.loginform.password=password.value;
    debugger
    this.http.post(environment.getApiUrl+"/Users/Login",this.loginform).subscribe(response=>{
      debugger
      Object.assign(this.loginResponseModel,response);
      localStorage.setItem("accessToken",this.loginResponseModel.accessToken)
      localStorage.setItem("expiration",this.loginResponseModel.expiration.toString())
      localStorage.setItem("refreshToken",this.loginResponseModel.refreshToken)
      this.router.navigateByUrl("/admin").then(s=>
        this.notify.message("Yönlendiriliyorsunuz","giriş Başarılı",{messageType:ToastrMessageType.Success,position:ToastrPosition.TopRight,timeout:2000})
      )

    })
  }
}
