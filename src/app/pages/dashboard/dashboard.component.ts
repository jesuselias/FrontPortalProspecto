
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { GlobalService } from "../providers/global.service";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options } from 'ng5-slider';
import { ToastrService } from "ngx-toastr";
import { NgbDateAdapter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
//import {FileUploaderComponent} from './file-uploader.component';
import { NgxSpinnerService } from "ngx-spinner";
//import { FileUploader } from 'ng2-file-upload';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { GridSummaryCalculationMode } from 'igniteui-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'dashboard-cmp',
    //moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    
    
})

export class DashboardComponent implements OnInit {

 
  //uploader:FileUploader;
  
  selectedFilef: File

  selectedFilec: File

    
  
  minValue = 1;
  maxValue = 25;
  options1: Options = {
    floor: 1,
    ceil: 25,
    /*minRange: this.valorMinimo,
    maxRange: this.valorMaximo,*/
  };

  
  minValue2: number = 0;
  maxValue2: number = 100;
  options2: Options = {
    floor: 0,
    ceil: 100
  };

  


  minValue3: number = 0;
  maxValue3: number = 2000;
  options3: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number): string => {
      return '$' + value;
    }
  };

  //multiselct de experiencia
  expierenceLevel:any; 

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public isCollapsed = true;
  public labels:any;
  // archvos
  btnSubirCv = false;
  btnSubirFoto = false;
  fileCV:any;
  fileFoto:any;
  loaderFileCV = false;
  loaderFileFoto = false;

  //Hasta aqui lo de los archivos

  currDate = new Date();
  yearsExpierenceMin:any;
  yearsExpierenceMax:any;
  contacto: FormGroup;
  submitted = false;
  pageActual: number = 1;
  request: any;
  prospectList: any;
  country:any;
  countrys:any;
  countryList :any;
  city:any;
  cityList:any;
  titleList: any;
  titleList1: any;
  sourceList: any;
  currencyList: any;
  title: any;
  bsModalRef: BsModalRef;
  arraysoftware: any;
  titleModal: string="";
  save: boolean=false;
  edit: boolean=false;
  softwares: any;
 // softwares1: any;
  software1: any;
  nivel1: any;
  levelTest: any;
  country1:any;
  countrys1:any;
  countryList1:any;
 // softwareList1: any;
  cityTest: any;
  software: any;
  software_Prospect: any;
  software_filtros:any;
  softwareList: any;
  level: any;
  index : any;
  prospect:any;
  FiltersProspects:any;
  model: NgbDateStruct;
  date: {year: number, month: number};
  
  postprospect = {
      
    "ageMin": null,
    "ageMax": null,
    "city_id": null,
    "country_list": [],
    'experience_years': null,
    "salaryMin": null,
    "salaryMax": null,
    "expierenceLevel": null,
    "yearsExpierenceMin": null,
    "yearsExpierenceMax": null,
    "software":[]
    //'experiencieList':[]
   }; 
   
   prospect_birthday:any;

   //Slider
   valueMaxLevel:any;
   valueMinLevel:any;
   valueMaxSalary:any;
   valueMinSalary:any;
   valueMaxAge:any;
   valueMinAge:any;
   
  //multiselct de nivel
  selectedLevel;
  nivel;
  
  constructor(private globalService: GlobalService, private bsModalService: BsModalService, 
              private formBuilder: FormBuilder,private spinner: NgxSpinnerService,
              private toastr: ToastrService) {
    
      this.initialValues();
      this.softwareList = [];
      //this.softwareList1 = [];
      this.software = [];
      this.prospect=[];
      this.prospectList=[];
      this.softwares= [];
     // this.softwares1=[];
      this.software1 = [];
      this.levelTest = [];
      this.nivel1 = [];
      this.country1 = [];
      this.countrys1 = [];
      this.countryList1 = [];
      this.cityTest = [];
      this.yearsExpierenceMin=[];
      this.yearsExpierenceMax=[];
      this.expierenceLevel=[];
      this.level = [];
      
      


      //this.valueMaxYear = this.getMaxLevel();

     
      
    }

    public initialValues(){
      let logged= localStorage.getItem("logged");
    
      if(logged!="true"){
        return location.href='#';
      }
    }


    ngOnInit(){

      this.selectCountry();
      this.selectSoftware();
    //   this.selectCity();
       this.getsoftware();
    // //  this.getsoftware1(); 
       this.getprospects();
       this.getcountry();
       this.gettile();
    // //  this.getcity();
      this.getFuente();
      this.getMoneda();
      this.submitted = false;
      this.spinner.hide();
      /*this.getMaxYear();
      this.getMinYear();*/
      this.getMinLevel();
      this.getMaxLevel();
      this.getMaxAge();
      this.getMinAge();
      this.getMaxSalary();
      this.getMinSalary()
      

     this.expierenceLevel = [
        {
          name: "Basico",
          id: 1
        },
        {
          name: "Intermedio",
          id: 2
        },
        {
          name: "Experto",
          id: 3
        },
        {
          name: "Master",
          id: 4
        }
     ];


    }
    

   

  public experiencieListPost: any = [
    {
      experience_level: "Basico",
      Id: 1
    },
    {
      experience_level: "Intermedio",
      Id: 2
    },
    {
      experience_level: "Experto",
      Id: 3
    },
    {
      experience_level: "Master",
      Id: 4
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
    selectCit(event){
      localStorage.setItem("citylogin", this.cityList)
    }

    selectCity(){
      localStorage.getItem('citylogin');
     this.cityList= JSON.parse(localStorage.getItem('citylogin'))
    }
     
    OpenProspectModal(template: TemplateRef<any>, option, item) {

      this.prospect=[];
      this.softwares=[];
      

      if(option==="save"){

        this.contacto = this.formBuilder.group({
          prospect_name: ['', Validators.required],            
          prospect_lastname: ['', Validators.required],
          prospect_birthday: ['', Validators.required],
          prospect_phonenumber: ['', Validators.required],
          prospect_address: ['', Validators.required],
          prospect_salary: ['', [Validators.required,Validators.pattern('[0-9]+')]],
          prospect_cv: ['',[Validators.required]],
          prospect_photo: ['', [Validators.required]],
          codigoMoneda: ['', [Validators.required]],
          /*prospect_cv: ['',[Validators.required,Validators.pattern('https?://.+')]],
          prospect_photo: ['', [Validators.required,Validators.pattern('https?://.+')]],*/
          prospect_link: ['', Validators.required],
          experience_years: ['', [Validators.required,Validators.pattern('[0-9]+')]],
          email: ['', [Validators.required,Validators.email]],
          commentary: ['', Validators.required],
          referral_name: ['', Validators.required],
          title_id: ['', Validators.required],
          country_id: ['', Validators.required],
          city_id: ['', Validators.required],
          experience_level:['', Validators.required]
          


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
          email: ['', Validators.required],
          commentary: ['', Validators.required],
          title_id: ['', Validators.required],
          experience_level:['', Validators.required],
          country_id: ['', Validators.required],
          city_id: ['', Validators.required],
          referral_name: ['', Validators.required],
          codigoMoneda: ['', [Validators.required]],


      });
        this.titleModal='Edit prospect';
        this.edit=true;
        //this.prospect=this.prospectList[index];
        this.prospect=this.prospectList.filter(data=>data.prospect_id==item.prospect_id);
        this.prospect=this.prospect[0]
        /*console.log(this.prospect);
        console.log(this.prospect.software_Prospect);*/
        this.prospect.software_Prospect.map(item=>{

            this.softwares.push({
            disabled: undefined,
            id: item.software_id,
             name: this.checkSoftware(item.software_id),
            ticked: true,
            });

        })
      }else
      if(option==='delete'){
       // this.prospect=this.prospectList[index];
       this.prospect=this.prospectList.filter(data=>data.prospect_id==item.prospect_id);
        this.prospect=this.prospect[0]

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

   

   prospectyear(event) {

     //console.log(event)
     this.postprospect.yearsExpierenceMin=event.value;
     this.postprospect.yearsExpierenceMax=event.highValue;
     this.filterApp(this.postprospect);
     let arraysoft=[];
     let arraycountry=[];

      
    }

    prospectage(event) {

       //console.log(event)
       this.postprospect.ageMin=event.value;
       this.postprospect.ageMax=event.highValue;
       this.filterApp(this.postprospect);
       let arraysoft=[];
       let arraycountry=[];
 
   
      }

      prospectsalary(event) {
    
         //console.log(event)
         this.postprospect.salaryMin=event.value;
         this.postprospect.salaryMax=event.highValue;
         this.filterApp(this.postprospect);
         let arraysoft=[];
         let arraycountry=[];
    
          
        }

   prospectcity(event) {
    // console.log(JSON.parse(localStorage.getItem('soft')))
     //console.log(event)
     this.postprospect.city_id=event
     this.filterApp(this.postprospect); 
      
    }

    
    prospectcountry(event) {
       let arraycountry=[];
       let country=event;
       country.map(item=>{

      arraycountry.push(item.id)
      
         })
  
       this.postprospect.country_list=arraycountry
       this.filterApp(this.postprospect);
   
        
      }

      /*
      prospectexp(event) {
        let arrayExp=[];
        let experience = event;
  
        experience.map(item=>{
            arrayExp.push({'id':item.id, 'name':item.name})
            //this.country1.push({ id: item.country_id, name: item.country_name})
        })

        //this.postprospect.expierenceLevel = this.nivel.id;
        this.postprospect.expierenceLevel = arrayExp
        //this.nivel=arrayExp
        this.filterApp(this.postprospect);
        console.log(arrayExp)
     }*/


     
     prospectexp(event){
      console.log(event)
      //this.postprospect.expierenceLevel=event
      this.filterApp(this.expierenceLevel);
       
     }


    prospectsoft(event) {
      // console.log(JSON.parse(localStorage.getItem('soft')))
       let arraysoft=[];
       let soft=event;
       soft.map(item=>{
      //   console.log(item);
         arraysoft.push({'software_id':item.id})
        //console.log( this.softwares1)
        
         })
       this.postprospect.software=arraysoft
       this.filterApp(this.postprospect);
        
        
      }
  
   filterApp(postprospect){
    this.clearLocalstorage();
    //  console.log(postprospect);
     this.globalService.addfilter(postprospect, "/prospect/filter").then(
       result => {
        this.prospectList = result;
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

    showcity2(event:any[]) {
      if(event.length <= 1){
      this.globalService.getModel("/country/" + event[0].id + "/city").then(
        result => { 
          this.cityList = result;
        },
        err => {
          console.log(err);
         
        }
      );
    }
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

gettile1() {
    
  this.globalService.getModel("/title").then(
    
      result => {
 
        this.titleList1 = result;
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

// getsoftware1() {
//   this.globalService.getModel("/software").then(
//       result => {
//         this.softwareList1 = result;
       
//         this.softwareList1.map(item=>{
//           this.software1.push({ id: item.software_id, name: item.software_name})
          
//         })
//       },
//       err => {
//         console.log(err);
//       }
//     );
// }

getcountry1() {

  this.globalService.getModel("/country").then(
      result => {
        this.countryList1 = result;
       
        this.countryList1.map(item=>{
          this.country1.push({ id: item.country_id, name: item.country_name})
          // console.log(item.country_id);
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


getFuente() {
    
  this.globalService.getModel("/fuente").then(
    
      result => {
        
        this.sourceList = result;
        
      },
      err => {
        console.log(err);
      
      }
    );
}


getMoneda() {
    
  this.globalService.getModel("/moneda").then(
    
      result => {
        
        this.currencyList = result;
        
      },
      err => {
        console.log(err);
      
      }
    );
}

// Slider

  setNewMaxLevel(newCeil: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options1);
    newOptions.ceil = newCeil;
    this.options1 = newOptions;
  }

getMaxLevel() {
    
  this.globalService.getModel("/Prospect/MaxLevel").then(
    
      result => {
        
        this.valueMaxLevel = result;
        this.setNewMaxLevel(Number(result));
        
      },
      err => {
        console.log(err);
      
      }
    );
}

  setNewMinLevel(floor:number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options1);
    newOptions.floor = floor;
    this.options1 = newOptions;
  }

getMinLevel() {
    
  this.globalService.getModel("/Prospect/MinLevel").then(
    
      result => {
        
        this.valueMinLevel = result;
        this.setNewMinLevel(Number(result));
        
      },
      err => {
        console.log(err);
      
      }
    );
}

// Salario

  setNewMaxSalary(newCeil: number): void {
    // Due to change detection rules in Angular, we need to re-create the options object to apply the change
    const newOptions: Options = Object.assign({}, this.options3);
    newOptions.ceil = newCeil;
    this.options3 = newOptions;
  }


getMaxSalary() {
    
  this.globalService.getModel("/Prospect/MaxSalary").then(
    
      result => {
        
        this.valueMaxSalary = result;
        this.setNewMaxSalary(Number(result));
        
      },
      err => {
        console.log(err);
      
      }
    );
}


setNewMinSalary(floor:number): void {
  // Due to change detection rules in Angular, we need to re-create the options object to apply the change
  const newOptions: Options = Object.assign({}, this.options3);
  newOptions.floor = floor;
  this.options3 = newOptions;
}


getMinSalary() {
    
  this.globalService.getModel("/Prospect/MinSalary").then(
    
      result => {
        
        this.valueMinSalary = result;
        this.setNewMinSalary(Number(result));
        
      },
      err => {
        console.log(err);
      
      }
    );
}



setNewCeil(newCeil: number): void {
  // Due to change detection rules in Angular, we need to re-create the options object to apply the change
  const newOptions: Options = Object.assign({}, this.options2);
  newOptions.ceil = newCeil;
  this.options2 = newOptions;
}

getMaxAge() {
    
  this.globalService.getModel("/Prospect/MaxAge").then(
    
      result => {
        
        this.valueMaxAge = result;
        this.setNewCeil(Number(result));
        
      },
      err => {
        console.log(err);
      
      }
    );
}


setNewFloor(floor:number): void {
  // Due to change detection rules in Angular, we need to re-create the options object to apply the change
  const newOptions: Options = Object.assign({}, this.options2);
  newOptions.floor = floor;
  this.options2 = newOptions;
}


getMinAge() {
    
  this.globalService.getModel("/Prospect/MinAge").then(
    
      result => {
        
        this.valueMinAge = result;
        this.setNewFloor(Number(result));
        
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

  deletelbprospect() {
   
    
    let postprospect = {
      'prospect_id': this.prospect.prospect_id,
      
      
    };
   
    //console.log(postprospect)
    this.globalService.updateModel(this.prospect.prospect_id,postprospect, "/prospect/baja").then(
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
      //prospect_link: this.prospect.nombreFuente,
      // probando
      //id_Proveedor: this.listprovider[this.requestGP.id_Proveedor].id_Proveedor,
      'prospect_link': this.prospect.idFuente,

      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
      'software_prospect': arraysoft,
      'experience_years': this.prospect.experience_years,
      'experience_level': this.prospect.experience_level,
      'email': this.prospect.email,
      'commentary': this.prospect.commentary,
      'referral_name': this.prospect.referral_name,
      'codigoMoneda': this.prospect.codigoMoneda
      
    };
   
    //console.log(postprospect)
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

  ValidateDate(Fecha){
    var momentB = moment(this.currDate,"DD/MM/YYYY");

    var _years = moment().diff(Fecha, 'years');
   
  
    if(_years < 18 ){
      //console.log(_years);
      return true;
   

   }else
   return false;
  }


  
    onFileChanged(event) {
     
      this.selectedFilef = event.target.files[0]
    }
  
 

    onFileChangec(event) {
    
      this.selectedFilec = event.target.files[0]
    }
  
  


  saveprospect() {


    this.submitted = true;

       if (this.contacto.invalid) {
           return;
       } 

     //alert('Usuario Correcto !')
   
    //console.log(this.experiencieList);
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
      'country_id': this.prospect.country_id,
      'prospect_address': this.prospect.prospect_address,
      'prospect_phonenumber': this.prospect.prospect_phonenumber,
      'prospect_cv':  this.prospect.prospect_cv,
      'prospect_photo':  this.prospect.prospect_photo,
      'prospect_link': this.prospect.nombreFuente,
      'prospect_salary': this.prospect.prospect_salary,
      'title_id': this.prospect.title_id,
      'software_prospect': arraysoft,
      'experience_years': this.prospect.experience_years,
      'experience_level': this.prospect.experience_level,
      'email': this.prospect.email,
      'commentary': this.prospect.commentary,
      'referral_name': this.prospect.referral_name,
      'codigoMoneda': this.prospect.codigoMoneda
     
    };
    //console.log(postprospect)
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

  //subir archivos
  onSelectFileCV(ev: any){
    //this.loaderFileCV = true;
    if (ev.target.files.length > 0) {
      this.fileCV = ev.target.files[0];
      console.log(ev.target.files[0])
     // this.excelName = 'gestionpagos';
      //console.log(this.excelName)
      //this.loaderFileCV = false;
      console.log('antes')
      
      this.btnSubirCv = true;
    }
  }

  onSelectFileFoto(ev: any){
    this.loaderFileFoto = true;
    if (ev.target.files.length > 0) {
      this.fileFoto = ev.target.files[0];
      console.log(ev.target.files[0])
     // this.excelName = 'gestionpagos';
      //console.log(this.excelName)
      this.loaderFileFoto = false;
      console.log('antes')
      
      this.btnSubirFoto = true;
    }
  }

  serviceFile(file, type){
      this.globalService.loadFile(file).subscribe(
        (data:any) => {
          if(type == 'cv'){
            this.loaderFileCV = false;
            this.btnSubirCv = false;
          }
          if(type == 'foto'){
            this.loaderFileFoto = false;
            this.btnSubirFoto = false;
          }

          this.toastr.info('Guardado el archivo')
        },
      );
  }

  upFileCV(){
    /*this.loaderFileO=true;
    this.btnUpO=false;*/

      this.loaderFileCV = true;
      this.btnSubirCv = false;
      this.serviceFile(this.fileCV,"cv")
      

  }

  upFileFoto(){
    this.loaderFileFoto = true;
    this.btnSubirFoto = false
    this.serviceFile(this.fileFoto,"foto")     

  }
  
    
}
