import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})

export class TitleComponent implements OnInit{
  
  contacto: FormGroup;
  submitted = false;

  ngOnInit(){
    this.initialValues();
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
  constructor(private globalService: GlobalService, private bsModalService: BsModalService,private formBuilder: FormBuilder) {
     this.title=[];
     this.titleList=[];
  }

  OpenTitleModal(template: TemplateRef<any>, option, item) {
    this.title=[]
    if(option==="save"){
      this.titleModal='Crear Titulo';

      this.contacto = this.formBuilder.group({
        title_name: ['', Validators.required], 
              
      }); 

      this.save=true;
    }else
    if(option==="edit"){
      this.titleModal='Edit Title';

      this.contacto = this.formBuilder.group({
        title_name: ['', Validators.required], 
              
      }); 
      
      this.edit=true;
     // this.title=this.titleList[index];
     this.title=this.titleList.filter(data=>data.title_id==item.title_id);
        this.title=this.title[0]
        //console.log(this.title);
    }else
    if(option==='delete'){
      this.title=this.titleList.filter(data=>data.title_id==item.title_id);
        this.title=this.title[0]
        //console.log(this.title);

    }
    this.bsModalRef = this.bsModalService.show(template);
    
  }
  public initialValues(){
    let logged= localStorage.getItem("logged");
    if(logged!="true"){
      return location.href='#';
    }
  }
  getTitle() {
      this.globalService.getModel("/title").then(
          result => {
            this.titleList = result;
          },
          err => {
            console.log(err);
          }
        );
  }
  deleteTitle() {
    this.globalService.removeModel(this.title.title_id,"/title").then(
      result => {
        this.getTitle();
      },
      err => {
        console.log(err);
      }
    );
    
    this.onClose()
  }

  editTitle() {
    let postTitle = {
      'title_id': this.title.title_id,
      'title_name': this.title.title_name,
      
    };

    this.globalService.updateModel(this.title.id,postTitle, "/title").then(
      result => {
        this.getTitle();
      },
      err => {
        console.log(err);
      }
    );
    this.onClose()
  }
  saveTitle() {
   // console.log(this.title)

    this.submitted = true;

    if (this.contacto.invalid) {
        return;
    }
    
    let postTitle = {
      'title_name': this.title.title_name,
      
     
    };

    this.globalService.addModel(postTitle, "/title").then(
      result => {
        this.getTitle();
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
