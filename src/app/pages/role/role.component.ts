import { Component, OnInit,TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
    selector: 'role-cmp',
    moduleId: module.id,
    templateUrl: 'role.component.html'
    
})

export class RoleComponent implements OnInit{
    ngOnInit(){
      this.initialValues();
        this.getroles();
        this.getfunction();
    }

    contacto: FormGroup;
    submitted = false;

    index:any;
    pageActual: number = 1;
    roleList: any;
    bsModalRef: BsModalRef;
    role: any;
    function: any;
    functiones: any;
    functions: any;
    functionList: any;
    function_Prospect:any;

    titleModal: string="";
    save: boolean=false;
    edit: boolean=false;

    constructor(private globalService: GlobalService, private bsModalService: BsModalService,private formBuilder: FormBuilder) {
       this.role=[];
       this.function= [];
       this.functiones= [];
       this.functionList = [];
       
    }


    checkfunction(id) 
    {
       let item;
      // console.log(this.softwareList)
        for(item of this.role.functions)
        {

      //  console.log(item)
         if(item.function_id==id)
            return item.function_name;
        }

    }

    OpenroleModal(template: TemplateRef<any>, option, item) {
    
      this.functiones=[];
      this.role=[]
      if(option==="save"){
        this.titleModal='Create role';

        this.contacto = this.formBuilder.group({
          role_name: ['', Validators.required], 
                
        }); 
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit role';
        this.edit=true;
        this.role=this.roleList.filter(data=>data.role_id==item.role_id);
        this.role=this.role[0]
        console.log(this.role);
        console.log(this.functiones);
        this.role.functions.map(item=>{
         
        this.functiones.push({
        
        id: item.function_id,
        name: this.checkfunction(item.function_id),
        
        });

      })
         
      }else
      if(option==='delete'){
        //this.role=this.roleList;
        this.role=this.roleList.filter(data=>data.role_id==item.role_id);
        this.role=this.role[0]

      }
      this.bsModalRef = this.bsModalService.show(template);
      
    }

    public initialValues(){
      let logged= localStorage.getItem("logged");
      if(logged!="true"){
        return location.href='#';
      }
    }

    // checkroleid(id) 
    // {
    //    let item;
    //   // console.log(this.roleList)
    //     for(item of this.roleList)
    //     {

    //   //  console.log(item)
    //      if(item.role_id==id)
    //         return item.role_id;
    //     }

    // }

    getfunctions() {
      this.globalService.getModel("/function").then(
          result => {
            this.functionList= result;
          },
          err => {
            console.log(err);
          }
        );
  }

  getfunction() {
    this.globalService.getModel("/function").then(
        result => {
          this.functionList = result;
       
          this.functionList.map(item=>{
            this.function.push({ id: item.function_id, name: item.function_name})
            
          })
        },
        err => {
          console.log(err);
        }
      );
  }

    getroles() {
        this.globalService.getModel("/role").then(
            result => {
              this.roleList = result;
            },
            err => {
              console.log(err);
            }
          );
    }
    deleterole() {
      this.globalService.removeModel(this.role.role_id,"/role").then(
        result => {
          console.log(result);
          this.getroles();
        },
        err => {
          console.log(err);
        }
      );
      
      this.onClose()
    }
  
    editrole() {
      console.log(this.role)

      let arrayfun=[];
      this.functiones.map(item=>{
     //   console.log(item);
        arrayfun.push({'function_id':item.id})
  
       
        })
       
      let postrole = {
        'role_id': this.role.role_id,
        'role_name': this.role.role_name,
        'functions': arrayfun
        
      };
      console.log(postrole)
      this.globalService.updateModel(this.role.id,postrole, "/role").then(
        result => {
          console.log(result);
          this.getroles();
        },
        err => {
          console.log(err);
        }
      );
     
      this.onClose()
    }


    saverole() {
      console.log(this.role)

      this.submitted = true;

      if (this.contacto.invalid) {
        return;
    }

      let arrayfun=[];
      this.functiones.map(item=>{
     //   console.log(item);
        arrayfun.push({'function_id':item.id})
  
       
        })
      
      let postrole = {
        'role_name': this.role.role_name,
        'functions': arrayfun
       
      };
  
      this.globalService.addModel(postrole, "/role").then(
        result => {
          console.log(result);
          this.getroles();
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
