import { Component, OnInit } from '@angular/core';
import { GlobalService } from "../Pages/providers/global.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  contacto: FormGroup;
  submitted = false;

  constructor(private globalService: GlobalService,private toastr: ToastrService,private formBuilder: FormBuilder) { 

    this.software1 = [];
      this.softwareList = [];
      this.softwares=[];
  }

  ngOnInit() {
    this.contacto = this.formBuilder.group({
      usuario: ['', Validators.required],            
      password: ['', Validators.required],
  });
  
this.getSotware();
  }

  loginList: any;
  softwareList: any;
  softwares: any;
  software1: any;
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

getSotware() {
  this.softwares=[];
  this.globalService.getModel("/software").then(
      result => {
        console.log(result);
        this.softwareList = result;
       
        this.softwareList.map(item=>{
          this.software1.push({ id: item.software_id, name: item.software_name})
        })
        console.log('software login',this.software1);
        localStorage.setItem("softwareslogin", JSON.stringify(this.software1));
      },
      err => {
        console.log(err);
      }
    );
}
mensaje(){
  this.toastr.error('Usuario no registrado')
}

get f() { return this.contacto.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.contacto.invalid) {
            return;
        }

       // alert('Usuario Correcto !')
    }
}
