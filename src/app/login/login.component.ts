import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../Pages/providers/global.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private globalService: GlobalService) { }

  ngOnInit() {
    this.getLogin();
  }

  loginList: any;

  getLogin() {
    this.globalService.getModel("/users/{user_name}/{user_password}").then(
        result => {
          console.log(result);
          this.loginList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
}

}
