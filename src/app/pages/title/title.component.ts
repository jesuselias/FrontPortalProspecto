import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})

export class TitleComponent implements OnInit{
  ngOnInit(){
      this.getTitle();
  }

  index:any;
  pageActual: number = 1;
  titleList: any;
  bsModalRef: BsModalRef;
  title: any;
  titleModal: string="";
  save: boolean=false;
  edit: boolean=false;
  constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
     this.title=[];
     this.titleList=[];
  }

  OpenTitleModal(template: TemplateRef<any>, option, index:number) {
    this.title=[]
    if(option==="save"){
      this.titleModal='Create Title';
      this.save=true;
    }else
    if(option==="edit"){
      this.titleModal='Edit Title';
      this.edit=true;
      console.log(this.titleList[index])
      this.title=this.titleList[index];
      console.log(this.title);
    }else
    if(option==='delete'){
      this.title=this.titleList[index];

    }
    this.bsModalRef = this.bsModalService.show(template);
    
  }

  getTitle() {
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
  
  

  deleteTitle() {
    this.globalService.removeModel(this.title.title_id,"/title").then(
      result => {
        console.log(result);
        this.getTitle();
      },
      err => {
        console.log(err);
        
        //this.loader.dismiss();
      }
    );
    
    this.onClose()
  }

  editTitle() {
    console.log(this.title)
    
    let postTitle = {
      'title_id': this.title.title_id,
      'title_name': this.title.title_name,
      
    };

    this.globalService.updateModel(this.title.id,postTitle, "/title").then(
      result => {
        console.log(result);
        this.getTitle();
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
   
    this.onClose()
  }


  saveTitle() {
    console.log(this.title)
    
    let postTitle = {
      'title_name': this.title.title_name,
      
     
    };

    this.globalService.addModel(postTitle, "/title").then(
      result => {
        console.log(result);
        this.getTitle();
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
