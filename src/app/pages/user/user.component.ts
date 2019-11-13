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
        this.initialValues();
        this.gettile();
        this.getcity();
        
        this.route
        .queryParams
        .subscribe(params => {
          console.log((params));
            this.prospect=params;
            this.getsoftwareProspect(this.prospect.prospect_id)
          });


          
          }
          public initialValues(){
            let logged= localStorage.getItem("logged");
            console.log(logged);
          
            if(logged!="true"){
              return location.href='#';
            }
          }
    softwareList:any
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
            this.titleList = result;
          },
          err => {
            console.log(err);
          }
        );
  }

  getcity() {
    
    this.globalService.getModel("/city").then(
      
        result => {
          this.cityList = result;
        },
        err => {
          console.log(err);
        }
      );
}
 getsoftwareProspect(prospect_id) {
    console.log(prospect_id)

    this.globalService.getModel("/api/prospect/"+ prospect_id+"/software").then(
        result => {
          this.softwareList = result;
        },
        err => {
          console.log(err);
        }
      );
  }
  checkCity(id) {
    let item;
     for(item of this.cityList)
     {

      if(item.city_id==id)
         return item.city_name;
     }
  }
  checkTitle(id) {
    let item;
     for(item of this.titleList)
     {
      if(item.title_id==id)
         return item.title_name;
     }
  }
  checkSoftware(id) {
    let item;
     for(item of this.softwareList)
     {
      if(item.software_id==id)
         return item.software_name;
      }
      console.log(item.software_id)
  }
  exp(){
    return this.experiencieList[this.prospect.experience_level-1]
    ;
  }
}


