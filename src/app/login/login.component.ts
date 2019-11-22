import { Component, OnInit } from '@angular/core';
import { GlobalService} from "../Pages/providers/global.service";
import { ToastrService } from "ngx-toastr";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  contacto: FormGroup;
  submitted = false;

  constructor(private globalService: GlobalService,private toastr: ToastrService,private formBuilder: FormBuilder,private spinner: NgxSpinnerService) { 

    this.software1 = [];
    this.softwareList = [];
    this.softwares=[];

    this.funcciones = [];
      
    this.country1 = [];
    this.softwareList = [];
    this.softwares=[];

    this.country1 = [];
    this.countrys1 = [];
    this.countryList1 = [];
  }

  ngOnInit() {
    localStorage.clear();
    this.contacto = this.formBuilder.group({
      usuario: ['', Validators.required],            
      password: ['', Validators.required],
  });


  this.spinner.hide();
//this.getSotware();

this.getcountry1();

this.getcity();
  }

  loginList: any;
  softwareList: any;
  softwares: any;
  software1: any;

  funcciones:any;

  country1:any;
  countrys1:any;
  countryList1:any;

  city: any;
  cityList:any;

  password:any;
  username:any;

  getcity() {
    
    this.globalService.getModel("/city").then(
      
        result => {
          this.cityList = result;
          localStorage.setItem("citylogin", JSON.stringify(this.cityList));
        },
        err => {
          console.log(err);
     
        }
      );
}
  postLogin() {
    this.spinner.show();
 
  
      /** spinner ends after 5 seconds */
     
  
    let postLogin = {
      'user_name': this.username,
      'user_password': this.password,
    };

    this.globalService.addLogin(postLogin, "/users/authenticate").then(
      (result) => {

        this.funcciones=result;

        if (result!=null)
        {
          localStorage.setItem("logged","true");
          localStorage.setItem("funcioneslogin", JSON.stringify(this.funcciones.functions));
          return location.href='#/dashboard';

        }else
          localStorage.setItem("logged","false");
          
      },
      err => {
        
        localStorage.setItem("logged","false");
        
        console.log(err)
      }
    );
      //this.onClose();

  }

  
//   getLogin() {
//     //console.log(this.username);
    
//     // let postLogin = {
//     //   'user_name': this.username,
//     //   'user_password': this.password,
//     // };
//     // console.log(postLogin)
//     // this.globalService.addModel(postLogin, "/users/authenticate").then(
//     //   result => {
//     //     console.log(result);
//     //     this.getLogin();
//     //   },
//     //   err => {
//     //     console.log(err);
//     //   }
//     // );
//     //   //this.onClose();


//     this.globalService.getUser("/users/"+this.username+"/"+this.password).then(
//         result => {
//         //  console.log(result);
//           if (result===0)
//           {
//             localStorage.setItem("logged","true");
//             return location.href='#/dashboard';

//           }else
//             localStorage.setItem("logged","false");
//         },
//         err => {
//           localStorage.setItem("logged","false");
//           console.log(err)
//         }
//       );
// }

// getSotware() {
//   this.softwares=[];
//   this.globalService.getModel("/software").then(
//       result => {
//       //  console.log(result);
//         this.softwareList = result;
       
//         this.softwareList.map(item=>{
//           this.software1.push({ id: item.software_id, name: item.software_name})
//         })
//       //  console.log('software login',this.software1);
//         localStorage.setItem("softwareslogin", JSON.stringify(this.software1));
//       },
//       err => {
//         console.log(err);
//       }
//     );
// }

getcountry1() {

  this.globalService.getModel("/country").then(
      result => {
        this.countryList1 = result;
       
        this.countryList1.map(item=>{
          this.country1.push({ id: item.country_id, name: item.country_name})
         // console.log(item.country_id);
          localStorage.setItem("countryslogin", JSON.stringify(this.country1));
        })
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
