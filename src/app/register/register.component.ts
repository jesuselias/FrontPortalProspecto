import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "app/pages/providers/global.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  user: any;
  users:any;
  role: any;
  save: boolean=false;
  edit: boolean=false;
  bsModalRef: BsModalRef;
  roleList: any;

  constructor(private globalService: GlobalService,private formBuilder: FormBuilder) {
    this.users=[];
   }

  ngOnInit() {
    this.getRole();
  }
  saveUsers() {
    let postUsers = {
      'user_name': this.users.user_name,
      'user_password': this.users.user_password,
      'role_id': this.users.role_id,
    };

    this.globalService.addModel(postUsers, "/users").then(
      result => {
        console.log(result);
        //this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
    this.onClose();
  }
    onClose() {
      return location.href='#';
    }
    getRole() {
    this.globalService.getModel("/role").then(
        result => {
          this.roleList = result;
        },
        err => {
          console.log(err);
        }
      );
}

}