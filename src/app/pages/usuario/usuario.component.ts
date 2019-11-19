import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit{
  contacto: FormGroup;
  submitted = false;

  ngOnInit(){
      this.initialValues();
      this.getUsers();
      this.getRole();
      
  }

  index:any;
  pageActual: number = 1;
  usersList: any;
  roleList: any;
  bsModalRef: BsModalRef;
  user: any;
  role: any;
  userModal: string="";
  save: boolean=false;
  edit: boolean=false;
  titleModal: string="";
  constructor(private globalService: GlobalService, private bsModalService: BsModalService,private formBuilder: FormBuilder) {
     this.user=[];
     this.usersList=[];
     this.roleList=[];
  }

  OpenUsersModal(template: TemplateRef<any>, option, item) {
    console.log(item);
    this.user=[]
    if(option==="save"){
      this.userModal='Crear Usuario';
      this.contacto = this.formBuilder.group({
        user_name: ['', Validators.required], 
        user_password: ['', Validators.required]      
      });  
      this.save=true;
    }else
    if(option==="edit"){
      this.userModal='Editar Usuario';

      this.contacto = this.formBuilder.group({
        user_name: ['', Validators.required],
        user_password: ['', Validators.required]   
              
      }); 
      this.edit=true;
      this.user=this.usersList.filter(data=>data.user_name==item.user_name);
      this.user=this.user[0]
      console.log(this.user);
      //this.user=this.usersList[index];
    }else
    if(option==='delete'){
      this.user=this.usersList.filter(data=>data.user_name==item.user_name);
      this.user=this.user[0]

    }
    this.bsModalRef = this.bsModalService.show(template);
    
  }
  public initialValues(){
    let logged= localStorage.getItem("logged");
    if(logged!="true"){
      return location.href='#';
    }
  }
  getUsers() {
      this.globalService.getModel("/users").then(
          result => {
            this.usersList = result;
          },
          err => {
            console.log(err);
          }
        );
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
  checkRole(id) {
    let item;
     for(item of this.roleList)
     {

      if(item.role_id==id)
         return item.role_name;
     }
    
  }
  deleteUsers() {
    this.globalService.removeModel(this.user.user_name,"/users").then(
      result => {
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
    
    this.onClose()
  }

  deletelbUsers() {
    let postUsers = {
      'user_password':this.user.user_password,
      
    };

    this.globalService.updateModel(this.user.id,postUsers,"/prospect/baja").then(
      result => {
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
    this.onClose()
  }

  editUsers() {

    this.submitted = true;

    if (this.contacto.invalid) {
        return;
    }

    let postUsers = {
      'user_name': this.user.user_name,
      'user_password': this.user.user_password,
      'role_id': this.user.role_id,
      
    };

    this.globalService.updateModel(this.user.user_name,postUsers,"/users").then(
      result => {
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
    this.onClose()
  }


  
  saveUsers() {

    this.submitted = true;

    if (this.contacto.invalid) {
        return;
    }
    
    let postUsers = {
      'user_name': this.user.user_name,
      'user_password': this.user.user_password,
      'role_id': this.user.role_id,
    };

    this.globalService.addModel(postUsers, "/users").then(
      result => {
        console.log(result);
        this.getUsers();
      },
      err => {
        console.log(err);
      }
    );
   
    this.onClose();
  }


  onClose() {
    this.edit=false;
    this.save=false;
    this.bsModalRef.hide();
    this.submitted = false;
  }

  get f() { return this.contacto.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.contacto.invalid) {
        return;
    }

    
}
  
}
