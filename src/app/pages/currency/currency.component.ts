import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from '../providers/global.service';
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
 // moduleId: module.id,
})
export class CurrencyComponent implements OnInit {

  currencyForm: FormGroup;
  submitted = false;
  mensaje: string;
  existe: boolean;
  loaderExport = false;
  index:any;
  pageActual: number = 1;
  currencyList: any;
  bsModalRef: BsModalRef;
  currency: any;
  titleModal: string="";
  save: boolean=false;
  edit: boolean=false;
  disabled = true;
  seeExport = true;

  constructor(private globalService: GlobalService,
              private bsModalService: BsModalService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService,
              private toastr: ToastrService,
              public http: HttpClient) { }

  ngOnInit() {
    this.getCurrency();
  }

  OpenCurrencyModal(template: TemplateRef<any>, option, item) {
    //console.log(item);
    //console.log("algo")
    this.currency=[]
   
    if(option==="save"){
      this.titleModal='Crear Software';
      this.disabled = false;
      this.currencyForm = this.formBuilder.group({
        codigoMoneda: ['', Validators.required],
        descripcionMoneda: ['', Validators.required], 
              
      });  
      
      this.titleModal='Crear Moneda';
      this.save=true;
    }else
    if(option==="edit"){
      this.titleModal='Editar Moneda';
      
        
      this.currencyForm = this.formBuilder.group({
        codigoMoneda: ['', Validators.required],
        descripcionMoneda: ['', Validators.required],  
              
      });  

      this.disabled = true;
      this.edit=true;
      this.currency=this.currencyList.filter(data=>data.codigoMoneda==item.codigoMoneda);
      this.currency=this.currency[0];
      //console.log(this.software);
       
    }else
    if(option==='delete'){
      //this.software=this.softwareList;
      this.currency=this.currencyList.filter(data=>data.codigoMoneda==item.codigoMoneda);
      this.currency=this.currency[0]

    }
    this.bsModalRef = this.bsModalService.show(template);
    
  }

  public initialValues(){
    let logged= localStorage.getItem("logged");
    if(logged!="true"){
      return location.href='#';
    }
  }

  checkCurrencyid(id) 
  {
     let item;
    // console.log(this.softwareList)
      for(item of this.currencyList)
      {

    //  console.log(item)
       if(item.codigoMoneda==id)
          return item.currency_code;
      }

  }

  getExportCurrency() {
   this.loaderExport = true;
   this.seeExport = false;

    return this.http.get('https://consultorestmapi.azurewebsites.net/api/excel/exportMoneda',{responseType: 'blob'})
      .subscribe(data => {
        saveAs(data), 
        this.loaderExport = false,
        this.seeExport = true
      }
    );
    

}
 

  getCurrency() {
      this.globalService.getModel("/moneda").then(
          result => {
            this.currencyList = result;
            //console.log(this.currencyList)
          },
          err => {
            console.log(err);
          }
        );
  }

  deleteCurrency() {
    this.globalService.removeModel(this.currency.codigoMoneda,"/moneda").then(
      result => {
        //console.log(result);
        this.getCurrency();
      },
      err => {
        console.log(err);
      }
    );
    
    this.onClose()
  }

  editCurrency() {
    //console.log(this.software)
    
    let postCurrency = {
      'codigoMoneda': this.currency.currency_code,
      'descripcionMoneda': this.currency.descripcionMoneda,
      
    };

    this.globalService.updateModel(this.currency.codigoMoneda,postCurrency,"/moneda").then(
      result => {
        //console.log(result);
        this.getCurrency();
      },
      err => {
        console.log(err);
      }
    );
   
    this.onClose()
  }


  saveCurrency() {
    //  validacion para que no se repita el nombre del software
    /*const software = new FormData();
    const datos = new FormData();

    if (this.contacto.get('software_name').valid) {
      software.append('software_name', this.contacto.get('software_name').value);
    }*/

   

    //console.log(this.software)
    this.submitted = true;

    if (this.currencyForm.invalid) {
        return;
    }
    let postSoftware = {
      'codigoMoneda': this.currency.codigoMoneda,
      'descripcionMoneda': this.currency.descripcionMoneda,
    };

    this.globalService.addModel(postSoftware,"/moneda").then(
      result => {
        this.existe = true;
        //console.log(result);
        this.getCurrency();
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
  get f() { return this.currencyForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.currencyForm.invalid) {
        return;
    }

    
  }

}
