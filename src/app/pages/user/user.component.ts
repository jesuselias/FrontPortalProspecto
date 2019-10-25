import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import {Routes,ActivatedRoute} from '@angular/router';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
    
})

export class UserComponent implements OnInit{
    ngOnInit(){
        //this.getUsers();
        this.route
        .queryParams
        .subscribe(params => {
          console.log(params);
            // Defaults to 0 if no query param provided.
            this.prospect=params;
          });
    }


    title = 'AngularCRUDExample';
    UserList: any;
    bsModalRef: BsModalRef;
    user: any;
    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;
    prospect: any;
    titleList:any;
    constructor(private globalService: GlobalService, private bsModalService: BsModalService,public  route: ActivatedRoute) {
       this.user=[];
       
    }
    OpenUserModal(template: TemplateRef<any>, option, index:number) {
      this.user=[]
      if(option==="save"){
        this.titleModal='Create User';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit User';
        this.edit=true;
        console.log(this.UserList[index])
        this.user=this.UserList[index];
        console.log(this.user);
      }else
      if(option==='delete'){
        this.user=this.UserList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
    }

    getUsers() {
        this.globalService.getModel("/users").then(
            result => {
              console.log(result);
              this.UserList = result;
            },
            err => {
              console.log(err);
              //this.loader.dismiss();
            }
          );
    }
    gettitle() {
      this.globalService.getModel("/title").then(
        
        result => {
          console.log(result);
          this.titleList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
  }
    
  
    deleteUser() {
      this.globalService.removeModel(this.user.id,"/users").then(
        result => {
          console.log(result);
          this.getUsers();
        },
        err => {
          console.log(err);
          
          //this.loader.dismiss();
        }
      );
      
      this.onClose()
    }
  
    editUser() {
      console.log(this.user)
      
      let postUser = {
        'id': this.user.id,
        'userName': this.user.userName,
        'Name': this.user.name,
        'lastName': this.user.lastName,
        'Age': this.user.age,
        'lastSessionDateTime': '2019-08-05T15:02:29.393'
      };
  
      this.globalService.updateModel(this.user.id,postUser, "/users").then(
        result => {
          console.log(result);
          this.getUsers();
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
     
      this.onClose()
    }


    saveUser() {
      console.log(this.user)
      
      let postUser = {
        'userName': this.user.userName,
        'Name': this.user.name,
        'lastName': this.user.lastName,
        'Age': this.user.age,
        'lastSessionDateTime': '2019-08-05T15:02:29.393'
      };
  
      this.globalService.addModel(postUser, "/users").then(
        result => {
          console.log(result);
          this.getUsers();
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
     
      this.onClose();
    }
  
    onClose() {
      this.edit=false;
      this.save=false;
      this.bsModalRef.hide();
    }
  
    
}
