

import { Component, OnInit, AfterViewInit } from '@angular/core';
import noUiSlider from "nouislider";
import { SliderType } from "igniteui-angular";
import { GlobalService } from "../pages/providers/global.service";




export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [

    { path: '/dashboard',          title: 'Dashboard',      icon:'nc-single-02',  class: '' },
    { path: '/user',          title: 'User',      icon:'nc-single-02',  class: '' },
  
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})



export class SidebarComponent implements OnInit {

    public menuItems: any[];
    public sliderType = SliderType;
    public priceRange: PriceRange = new PriceRange(200, 800);
    public exp: Exp = new Exp(200, 800);
    public lexp: Lexp = new Lexp(200, 800);
    public age: Age = new Age(200, 800);
    software1: any;
    selectedSoftware;
    softwareList: any;
    softwares: any;
    softwareTest:any;
    cityTest:any;
    countryTest:any;
    countryList:any;
    cityList:any;
    age_min:any;
    age_max:any;
    exp_min:any;
    exp_max:any;
    exp_level_min:any;
    exp_level_max:any;
    salary_min:any;
    salary_max:any;
    levelTest:any;
    constructor(private globalService: GlobalService) {
      this.software1 = [];
      this.levelTest = [];
      this.softwareList = [];
      this.softwares=[];
      this.cityTest = [];
      this.softwareTest = [];
      this.countryTest = [];
      this.exp_min = [];
      this.exp_max = [];
      this.exp_level_min = [];
      this.exp_level_max = [];
      this.age_min = [];
      this. age_max = [];
      this.salary_min = [];
      this.salary_max = [];
     
      
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

    showcity() {
    
      this.globalService.getModel("/country/" + this.countryTest.country_id + "/city").then(
        result => {
          this.cityList = result;
        },
        err => {
          console.log(err);
    
        }
      );
    }

    selectSoft(event){
      localStorage.setItem("soft", JSON.stringify(this.softwares))
    }
    selectSoftware(){
      localStorage.getItem('softwareslogin');
     this.software1= JSON.parse(localStorage.getItem('softwareslogin'))
    }
    selectCity(event){
  
      localStorage.setItem("city", this.cityTest)
    }
    selectCountry(event){

    localStorage.setItem("country", this.countryTest.country_id)
    }
    selectYearsExp(event){
     
      this.exp_min = event.value.lower;
      this.exp_max = event.value.upper;
      localStorage.setItem("exp_min", this.exp_min);
      localStorage.setItem("exp_max", this.exp_max);
    }

    selectLevelExp(event){
      localStorage.setItem("expierenceLevel", this.levelTest )
    }

    selectAgeExp(event){
     //console.log(this.age_min)
      this.age_min = event.value.lower;
      this.age_max = event.value.upper;
      localStorage.setItem("age_min", this.age_min);
      localStorage.setItem("age_max", this.age_max);
    }

    selectSalaryExp(event){
      this.salary_min = event.value.lower;
      this.salary_max = event.value.upper;
      localStorage.setItem("salary_min", this.salary_min);
      localStorage.setItem("salary_max",  this.salary_max);
    }
   

    getSotware() {
      this.softwares=[];

      this.globalService.getModel("/software").then(
          result => {
            //console.log(result);
            this.softwareList = result;
           
            this.softwareList.map(item=>{
              this.software1.push({ id: item.software_id, name: item.software_name})
            })
            console.log(this.software1);
          },
          err => {
            console.log(err);
          }
        );
  }

  getCountry() {
    this.globalService.getModel("/Country").then(
        result => {
          //console.log(result);
          this.countryList = result;
      
        },
        err => {
          console.log(err);
        }
      );
  }
  getCity() {
  this.globalService.getModel("/City").then(
      result => {
        //console.log(result);
        this.cityList = result;
    
      },
      err => {
        console.log(err);
      }
    );
  }

    ngOnInit() {
      this.selectSoftware();
      this.getSotware();
      this.getCity();
      this.getCountry();
        this.menuItems = ROUTES.filter(menuItem => menuItem);


        
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