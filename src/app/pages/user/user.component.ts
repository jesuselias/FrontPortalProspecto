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
   
    gettile() {
    
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
  
    checkTitle(id) {
      var title= this.titleList.find(function(element) {
        if(element.title_id==id)
           return element;
           else return " ";
           });
       
       return  title.title_name;
     }
}
