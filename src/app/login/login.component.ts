import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../Pages/providers/global.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private globalService: GlobalService,private toastr: ToastrService) { }

  ngOnInit() {
  }

  loginList: any;
  
 password:"";
 username:"";
  
  getLogin() {
    console.log(this.username);
    this.globalService.getUser("/users/"+this.username+"/"+this.password).then(
        result => {
          console.log(result);
          if (result===0)
          {
            return location.href='#/dashboard';
          }
        },
        err => {
          console.log(err)
        }
      );
}
mensaje(){
  this.toastr.error('Usuario no registrado')
}

}
