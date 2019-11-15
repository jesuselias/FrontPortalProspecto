import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
    selector: 'software-cmp',
    moduleId: module.id,
    templateUrl: 'software.component.html'
    
})

export class SoftwareComponent implements OnInit{
    ngOnInit(){
      this.initialValues();
        this.getSoftwares();
    }

    index:any;
    pageActual: number = 1;
    softwareList: any;
    bsModalRef: BsModalRef;
    software: any;
    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;
    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
       this.software=[];
       
    }

    OpenSoftwareModal(template: TemplateRef<any>, option, item) {
      console.log(item);
      console.log("algo")
      this.software=[]
      if(option==="save"){
        this.titleModal='Create Software';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit Software';
        this.edit=true;
        this.software=this.softwareList.filter(data=>data.software_id==item.software_id);
        this.software=this.software[0]
        console.log(this.software);
         
      }else
      if(option==='delete'){
        //this.software=this.softwareList;
        this.software=this.softwareList.filter(data=>data.software_id==item.software_id);
        this.software=this.software[0]

      }
      this.bsModalRef = this.bsModalService.show(template);
      
    }

    public initialValues(){
      let logged= localStorage.getItem("logged");
      if(logged!="true"){
        return location.href='#';
      }
    }

    checkSoftwareid(id) 
    {
       let item;
      // console.log(this.softwareList)
        for(item of this.softwareList)
        {

      //  console.log(item)
         if(item.software_id==id)
            return item.software_id;
        }

    }
   

    getSoftwares() {
        this.globalService.getModel("/Software").then(
            result => {
              this.softwareList = result;
            },
            err => {
              console.log(err);
            }
          );
    }
    deleteSoftware() {
      this.globalService.removeModel(this.software.software_id,"/Software").then(
        result => {
          console.log(result);
          this.getSoftwares();
        },
        err => {
          console.log(err);
        }
      );
      
      this.onClose()
    }
  
    editSoftware() {
      console.log(this.software)
      
      let postSoftware = {
        'software_id': this.software.software_id,
        'software_name': this.software.software_name,
        
      };
  
      this.globalService.updateModel(this.software.id,postSoftware, "/Software").then(
        result => {
          console.log(result);
          this.getSoftwares();
        },
        err => {
          console.log(err);
        }
      );
     
      this.onClose()
    }


    saveSoftware() {
      console.log(this.software)
      
      let postSoftware = {
        'software_name': this.software.software_name,
        
       
      };
  
      this.globalService.addModel(postSoftware, "/Software").then(
        result => {
          console.log(result);
          this.getSoftwares();
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
    }
  
    
}
