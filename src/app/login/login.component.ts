import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../Pages/providers/global.service";
import { ToastrService } from "ngx-toastr";
import { AlertsService } from 'angular-alert-module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private globalService: GlobalService,private toastr: ToastrService,private alerts: AlertsService) { }

  ngOnInit() {
    this.getLogin();
  }

  loginList: any;
  
 password:"";
  username:"";
  
  getLogin() {
    console.log(this.username);
    this.globalService.getModel("/users/"+this.username+"/"+this.password).then(
        result => {
         
          console.log(result);
          if (result==0)
          return location.href='#/dashboard';
          else
          
         return  this.toastr.success('Registrado Exitosamente', 'Software. Registrado')
        },
        err => {
          console.log(err);
        }
      );
}

}
