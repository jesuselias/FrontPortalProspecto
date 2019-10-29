import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalService } from "../providers/global.service";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
<<<<<<< HEAD
=======
import { element } from 'protractor';
import { observable } from 'rxjs';
>>>>>>> ffa8aa34d2dd5632e4604b9f141fc2917eb4620f


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  pageActual: number = 1;
  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public isCollapsed = true;
  public labels:any;
  request: any;
  prospectList: any;
  country:any;
  countryList :any;
  city:any;
  cityList:any;
  titleList: any;
  title: any;
  bsModalRef: BsModalRef;

  titleModal: string="";
  save: boolean=false;
  edit: boolean=false;
  
  software: any;
  software_Prospect: any;
  softwareList: any;

  UserList :any;

  prospect;
  selectedsoftware;
  FiltersProspects:any;
    ngOnInit(){
      this.getsoftware();
      this.getprospects();
     // this.getcountry();
      this.gettile();
      this.getcity();
      this.chartColor = "#FFFFFF";

    } 

   

    constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
      this.UserList = [];
      this.softwareList = [];
      this.software = [];
      this.prospect=[];
      this.prospectList=[];
      this.software_Prospect=[];
    
    }
    loadPage(item){
      // console.log(item);
      //localStorage.setItem("prospect", item);
      
    }
<<<<<<< HEAD
=======
    checkSoftware(id) 
    {
       let item;
       console.log(this.softwareList)
        for(item of this.softwareList)
        {

        console.log(item)
         if(item.software_id==id)
            return item.software_name;
        }

    }
     
>>>>>>> ffa8aa34d2dd5632e4604b9f141fc2917eb4620f
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
  
    
    OpenProspectModal(template: TemplateRef<any>, option, index:number) {
      this.prospect=[]
     // this.software = [];
     
      if(option==="save"){
        this.titleModal='Create prospect';
        this.save=true;
      }else
      if(option==="edit"){
        this.titleModal='Edit prospect';
        this.edit=true;
        console.log(this.prospectList[index])
        this.prospect=this.prospectList[index];
<<<<<<< HEAD
        console.log(this.prospect);
=======
         
        console.log(this.prospect.software_Prospect);
        this.prospect.software_Prospect.map(item=>{
            this.softwares.push({
            disabled: undefined,
            id: item.software_id,
             name: this.checkSoftware(item.software_id),
            ticked: true,
            });
           console.log(this.checkSoftware(6))
        })
>>>>>>> ffa8aa34d2dd5632e4604b9f141fc2917eb4620f
      }else
      if(option==='delete'){
        this.prospect=this.prospectList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
      
    }
    showCountry() {
      console.log(this.country);
      this.globalService.getModel("/country/" + this.country.country_id).then(
        result => {
          console.log(result);
          this.countryList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
  }

  prospectfilter() {
    //console.log();
    //localStorage.getItem('exp_max') -->years max
   // localStorage.getItem('exp_min') -->years min
    //localStorage.getItem('exp_level_min') -->level max
   // localStorage.getItem('exp_level_max') -->level min
    this.prospect.software_id = localStorage.getItem('soft');
    this.prospect.city_id = localStorage.getItem('city');

    console.log('edad_min',localStorage.getItem('age_min'))
    console.log('edad_max',localStorage.getItem('age_max'))
    console.log('salary_min',localStorage.getItem('salary_min'))
    console.log('salary_max',localStorage.getItem('salary_max'))
    console.log('city',this.prospect.city_id);
    console.log('software',this.prospect.software_id);
    //localStorage.getItem('age_min') === null?"":localStorage.getItem('age_min')
     let postprospect = {
      "prospect_id": this.prospect.prospect_id,
      "ageMin": localStorage.getItem('age_min'),
      "ageMax": localStorage.getItem('age_max'),
      "city_id": this.prospect.city_id,
      "salaryMin": localStorage.getItem('salary_min'),
      "salaryMax": localStorage.getItem('salary_max'),
      "expierenceLevel": "",
      "yearsExpierenceMin": "",
      "yearsExpierenceMax": "",
      "software_id": this.prospect.software_id
     };
 
     this.globalService.addModel(postprospect, "/prospect/filter").then(
       result => {
        
        this.prospectList = result;
        console.log(this.prospectList);
       },
       err => {
         console.log(err);
         //this.loader.dismiss();
       }
     );
    
     this.onClose();
   }
 

  showProspect() {
    console.log(this.city);
    this.globalService.getModel("/city/" +  this.city.city_id).then(
      result => {
        console.log(result);
        this.cityList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
}




    showTitle() {
      console.log(this.title);
      this.globalService.getModel("/title/" + this.title.title_id).then(
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

    getprospects() {
    
      this.globalService.getModel("/prospect").then(
        
          result => {
            console.log(result);
            this.prospectList = result;
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
          console.log(result);
          this.cityList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
}



gettile() {
    
    this.globalService.getModel("/title").then(
      
        result => {
          //console.log(result);
          this.titleList = result;
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
        console.log(result);
        this.softwareList = result;
       
        this.softwareList.map(item=>{
          this.software.push({ id: item.software_id, name: item.software_name})
        })
      },
      err => {
        console.log(err);
      }
    );
}
  deleteprospect() {
    this.globalService.removeModel(this.prospect.prospect_id,"/prospect").then(
      result => {
        console.log(result);
        this.getprospects();
      },
      err => {
        console.log(err);
        
        //this.loader.dismiss();
      }
    );
    
    this.onClose()
  }

  editprospect() {
    console.log(this.prospect)
    console.log(this.software_Prospect)

    let arraysoft=[];
    this.software.map(item=>{
      arraysoft.push(item.software_id)

      
      })
    
    let postprospect = {
      'prospect_id': this.prospect.prospect_id,
      'prospect_name': this.prospect.prospect_name,
      'prospect_lastname': this.prospect.prospect_lastname,
      'prospect_birthday': this.prospect.prospect_birthday,
      'prospect_phonenumber': this.prospect.prospect_phonenumber,
      'city_id': this.prospect.city_id,
      'prospect_address': this.prospect.prospect_address,
      'prospect_cv': this.prospect.prospect_address,
      'prospect_photo': this.prospect.prospect_photo,
      'prospect_link': this.prospect.prospect_link,
      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
      'software_Prospect': arraysoft,
     
    };
<<<<<<< HEAD
=======
   
>>>>>>> ffa8aa34d2dd5632e4604b9f141fc2917eb4620f

    this.globalService.updateModel(this.prospect.id,postprospect, "/prospect").then(
      result => {
        console.log(result);
        this.getprospects();
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
   
    this.onClose()
  }


  saveprospect() {
    console.log(this.prospect)
    console.log(this.software_Prospect)

    let arraysoft=[];
    this.software.map(item=>{
      arraysoft.push(item.software_id)

      
      })
    
    
    let postprospect = {
      'prospect_id': this.prospect.prospect_id,
      'prospect_name': this.prospect.prospect_name,
      'prospect_lastname': this.prospect.prospect_lastname,
      'prospect_birthday': this.prospect.prospect_birthday,
      'city_id': this.prospect.city_id,
      'prospect_address': this.prospect.prospect_address,
      'prospect_phonenumber': this.prospect.prospect_phonenumber,
      'prospect_cv':  this.prospect.prospect_cv,
      'prospect_photo':  this.prospect.prospect_photo,
      'prospect_link': this.prospect.prospect_link,
      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
      'software_Prospect': arraysoft,
     
    };
<<<<<<< HEAD

=======
>>>>>>> ffa8aa34d2dd5632e4604b9f141fc2917eb4620f
    this.globalService.addModel(postprospect, "/prospect").then(
      result => {
        console.log(result);
        this.getprospects();
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