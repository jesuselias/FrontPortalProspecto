
import { Component, OnInit, TemplateRef } from '@angular/core';
import { GlobalService } from "../providers/global.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { element } from 'protractor';
import { observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { SliderType } from "igniteui-angular";
import { Options } from 'ng5-slider';
import { LoginComponent} from 'app/login/login.component'

@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
    
})

export class DashboardComponent implements OnInit{

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };
  public sliderType = SliderType;
  public priceRange: PriceRange = new PriceRange(200, 800);
  public exp: Exp = new Exp(200, 800);
  public lexp: Lexp = new Lexp(200, 800);
  public age: Age = new Age(200, 800);
  contacto: FormGroup;
  submitted = false;
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
  arraysoftware: any;
  titleModal: string="";
  save: boolean=false;
  edit: boolean=false;
  softwares: any;
  softwares1: any;
  software1: any;
  country1:any;
  countrys1:any;
  countryList1:any;
  softwareList1: any;
  cityTest: any;
  software: any;
  software_Prospect: any;
  softwareList: any;
  index : any;
  prospect:any;
  FiltersProspects:any;
  model: NgbDateStruct;
  date: {year: number, month: number};

    
  

  constructor(private globalService: GlobalService, private bsModalService: BsModalService, 
    private formBuilder: FormBuilder,private calendar: NgbCalendar) {
      this.initialValues();

      this.softwareList = [];
      this.softwareList1 = [];
      this.software = [];
      this.prospect=[];
      this.prospectList=[];
      this.softwares= [];
      this.softwares1=[];
      this.software1 = [];
      this.country1 = [];
      this.countrys1 = [];
      this.countryList1 = [];
      this.cityTest = [];
      
    }

    ngOnInit(){

    
        this.selectCountry()
        this.selectSoftware();
        this.getsoftware();
        this.getsoftware1();
        this.getcountry1();
        this.getprospects();
        this.getcountry();
        this.gettile();
        this.getcity();
        this.chartColor = "#FFFFFF";
      
      this.submitted = false;
      
    
    } 

   
public initialValues(){
  let logged= localStorage.getItem("logged");
  //localStorage.clear();
  console.log(logged);

  if(logged!="true"){
    return location.href='#';
  }
}


   public experiencieList: any = [
    {
      experience_level: "Basico",
      id: 1
    },
    {
      experience_level: "Intermedio",
      id: 2
    },
    {
      experience_level: "Experto",
      id: 3
    },
    {
      experience_level: "Master",
      id: 4
    }
    
  ]

    checkSoftware(id) 
    {
       let item;
      // console.log(this.softwareList)
        for(item of this.softwareList)
        {

      //  console.log(item)
         if(item.software_id==id)
            return item.software_name;
        }

    }
   
     
    checkTitle(id) {
      let item;
      //console.log(this.titleList)
       for(item of this.titleList)
       {

     //  console.log(item)
        if(item.title_id==id)
           return item.title_name;
       }
    }

    selectSoftware(){
      localStorage.getItem('softwareslogin');
     this.software1= JSON.parse(localStorage.getItem('softwareslogin'))
    }
    selectSoft(event){
      localStorage.setItem("soft", JSON.stringify(this.softwares))
    }

    selectCountry(){
      localStorage.getItem('countryslogin');
     this.country1= JSON.parse(localStorage.getItem('countryslogin'))
    }

    selectCity(event){
  
      localStorage.setItem("city", this.cityTest)
    }

    
    
    OpenProspectModal(template: TemplateRef<any>, option, index:number) {


      this.prospect=[];
      this.softwares=[];
      
     //console.log(item)
      if(option==="save"){

        this.contacto = this.formBuilder.group({
          prospect_name: ['', Validators.required],            
          prospect_lastname: ['', Validators.required],
          prospect_birthday: ['', Validators.required],
          prospect_phonenumber: ['', Validators.required],
          prospect_address: ['', Validators.required],
          prospect_salary: ['', Validators.required],
          prospect_cv: ['', Validators.required],
          prospect_photo: ['', Validators.required],
          prospect_link: ['', Validators.required],
          experience_years: ['', Validators.required],


      });
        this.titleModal='Create prospect';
        this.save=true;
      }else
      if(option==="edit"){
        this.contacto = this.formBuilder.group({
          prospect_name: ['', Validators.required],            
          prospect_lastname: ['', Validators.required],
          prospect_birthday: ['', Validators.required],
          prospect_phonenumber: ['', Validators.required],
          prospect_address: ['', Validators.required],
          prospect_salary: ['', Validators.required],
          prospect_cv: ['', Validators.required],
          prospect_photo: ['', Validators.required],
          prospect_link: ['', Validators.required],
          experience_years: ['', Validators.required],


      });
        this.titleModal='Edit prospect';
        this.edit=true;
        this.prospect=this.prospectList[index];
         
        //console.log(this.prospect.software_Prospect);
        this.prospect.software_Prospect.map(item=>{
            this.softwares.push({
            disabled: undefined,
            id: item.software_id,
             name: this.checkSoftware(item.software_id),
            ticked: true,
            });
           console.log(this.checkSoftware(6))
        })
      }else
      if(option==='delete'){
        this.prospect=this.prospectList[index];

      }
      this.bsModalRef = this.bsModalService.show(template);
      
      
    }
    showCountry() {
      this.globalService.getModel("/country/" + this.country.country_id).then(
        result => {
          this.countryList = result;
        },
        err => {
          console.log(err);
          //this.loader.dismiss();
        }
      );
  }
   prospectfilter() {
    console.log(JSON.parse(localStorage.getItem('soft')))
    this.arraysoftware= JSON.parse(localStorage.getItem('soft'))==null? []: JSON.parse(localStorage.getItem('soft'));
    let arraysoft=[];
    this.arraysoftware.map(item=>{
      arraysoft.push({'software_id':item.id})
    })  
    this.prospect.city_id = localStorage.getItem('city');

     let postprospect = {
      "prospect_id": null,
      "ageMin":localStorage.getItem('age_min')=="null"?null:Number(localStorage.getItem('age_min')),
      "ageMax": localStorage.getItem('age_max')=="null"?null:Number(localStorage.getItem('age_max')),
      "city_id": this.prospect.city_id=="null"?null:Number(localStorage.getItem('city')),
      "country_id": localStorage.getItem('country')=="null"?null:localStorage.getItem('country'),
      "salaryMin": localStorage.getItem('salary_min')=="null"?null:Number(localStorage.getItem('salary_min')),
      "salaryMax": localStorage.getItem('salary_max')=="null"?null:Number(localStorage.getItem('salary_max')),
      "expierenceLevel": localStorage.getItem('expierenceLevel')=="null"?null:Number(localStorage.getItem('expierenceLevel')),
      "yearsExpierenceMin":localStorage.getItem('exp_min')=="null"?null:Number(localStorage.getItem('exp_min')),
      "yearsExpierenceMax": localStorage.getItem('exp_max')=="null"?null:Number(localStorage.getItem('exp_max')),
      "software": arraysoft
     };

    this.clearLocalstorage();
     console.log(postprospect);
     this.globalService.addfilter(postprospect, "/prospect/filter").then(
       result => {
        this.prospectList = result;
        console.log(this.prospectList);
       },
       err => {
         console.log(err);
         //this.loader.dismiss();
       }
     );
   }
   clearLocalstorage(){
     localStorage.setItem("country", null);
     localStorage.setItem("city", null);
     localStorage.setItem("age_min", null);
     localStorage.setItem("age_max", null);
     localStorage.setItem("salary_min", null);
     localStorage.setItem("salary_max", null);
     localStorage.setItem("expierenceLevel", null);
     localStorage.setItem("exp_min", null);
     localStorage.setItem("exp_max", null);
     localStorage.setItem("soft",null);
   }
  showProspect() {
    this.globalService.getModel("/city/" +  this.city.city_id).then(
      result => {
        this.cityList = result;
      },
      err => {
        console.log(err);
        
      }
    );
}
    showTitle() {
      this.globalService.getModel("/title/" + this.title.title_id).then(
        result => {
          this.titleList = result;
        },
        err => {
          console.log(err);
        
        }
      );
    }
    
    showcity() {
      this.globalService.getModel("/country/" + this.prospect.country_id + "/city").then(
        result => {
          this.cityList = result;
        },
        err => {
          console.log(err);
         
        }
      );
    }

    getprospects() {
    
      this.globalService.getModel("/prospect").then(
        
          result => {
            this.prospectList = result;
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

getcountry() {
    
  this.globalService.getModel("/country").then(
    
      result => {
        this.countryList = result;
      },
      err => {
        console.log(err);
     
      }
    );
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

getsoftware1() {
  this.globalService.getModel("/software").then(
      result => {
        this.softwareList1 = result;
       
        this.softwareList1.map(item=>{
          this.software1.push({ id: item.software_id, name: item.software_name})
          
        })
      },
      err => {
        console.log(err);
      }
    );
}

getcountry1() {

  this.globalService.getModel("/country").then(
      result => {
        this.countryList1 = result;
       
        this.countryList1.map(item=>{
          this.country1.push({ id: item.country_id, name: item.country_name})
          console.log(item.country_id);
        })
      },
      err => {
        console.log(err);
      }
    );
}


 

getsoftware() {
  this.globalService.getModel("/software").then(
      result => {
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

    let arraysoft=[];
    this.softwares.map(item=>{
   //   console.log(item);
      arraysoft.push({'software_id':item.id})

     
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
      'software_prospect': arraysoft,
      'experience_years': this.prospect.experience_years,
      'experience_level': this.prospect.experience_level,
      'email': this.prospect.email,
      'commentary': this.prospect.commentary,
      'referral_name': this.prospect.referral_name,
      
    };
   

    this.globalService.updateModel(this.prospect.prospect_id,postprospect, "/prospect").then(
      result => {
    //    console.log(result);
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

     this.submitted = true;

      if (this.contacto.invalid) {
          return;
      } else

     // alert('Usuario Correcto !')
   
   console.log(this.experiencieList);
    let arraysoft=[];
    this.softwares.map(item=>{
      arraysoft.push({'software_id':item.id})

     
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
      'software_prospect': arraysoft,
      'experience_years': this.prospect.experience_years,
      'experience_level': this.prospect.experience_level,
      'email': this.prospect.email,
      'commentary': this.prospect.commentary,
      'referral_name': this.prospect.referral_name,

     
    };
    this.globalService.addModel(postprospect, "/prospect").then(
      result => {
  //      console.log(result);
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
    this.submitted = false;
  }

  get f() { return this.contacto.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.contacto.invalid) {
          return;
      }

     // alert('Usuario Correcto !')
  }
    
}

class PriceRange {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}

class Exp {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}

class Lexp {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}

class Age {
  constructor(
    public lower: number,
    public upper: number,
  ) {
  }

}