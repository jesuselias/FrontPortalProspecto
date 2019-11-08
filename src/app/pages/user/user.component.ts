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
        this.gettile();
        this.getcity();
        this.getsoftware();
        this.route
        .queryParams
        .subscribe(params => {
          console.log(params);
            // Defaults to 0 if no query param provided.
            this.prospect=params;
          });

          this.route
          .queryParams
          .subscribe(params => {
            console.log(params);
              // Defaults to 0 if no query param provided.
              this.title=params;
            });     

            this.route
            .queryParams
            .subscribe(params => {
              console.log(params);
                // Defaults to 0 if no query param provided.
                this.software=params;
              });
          }

    software: any;
    softwareList: any;
    title : any;
    UserList: any;
    bsModalRef: BsModalRef;
    user: any;
    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;
    prospect: any;
    titleList:any;
    cityList:any;
    experiencieList:string[]= ['Basico', 'Intermedio','Experto','Master']

    constructor(private globalService: GlobalService, private bsModalService: BsModalService,
      public  route: ActivatedRoute) {
       this.user=[];
       
    }
   
    gettile() {
    
      this.globalService.getModel("/title").then(
        
          result => {
           // console.log(result);
            this.titleList = result;
          },
          err => {
            console.log(err);
            //this.loader.dismiss();
          }
        );
  }

  getcity() {
    
    this.globalService.getModel("/city").then(
      
        result => {
          //console.log(result);
          this.cityList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
}
  getsoftware() {
    this.globalService.getModel("/software").then(
        result => {
          this.softwareList = result;
        
          this.softwareList.map(item=>{
            this.software.push({ id: item.software_id, name: item.software_name})
            console.log(this.software);
          })
        },
        err => {
          console.log(err);
        }
      );
  }

  checkCity(id) {
    let item;
    //console.log(this.cityList)
     for(item of this.cityList)
     {

     //console.log(item)
      if(item.city_id==id)
         return item.city_name;
     }
  }
  checkTitle(id) {
    let item;
    console.log(this.titleList)
     for(item of this.titleList)
     {

     console.log(item)
      if(item.title_id==id)
         return item.title_name;
     }
  }
  checkSoftware(id) {
    let item;
    console.log(this.softwareList)
     for(item of this.softwareList)
     {

     console.log(item)
      if(item.software_id==id)
         return item.software_name;
     }
  }
  exp(){
    return this.experiencieList[this.prospect.experience_level-1]
    ;
  }
}


