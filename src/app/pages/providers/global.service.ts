import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from 'rxjs';

import { NgxSpinnerService } from "ngx-spinner";

const httpOptionsDefault = {
    headers: new HttpHeaders({

        // 'accessToken':localStorage.getItem('accessToken'),

        //'Authorization': 'Basic '+btoa('jchiquin:12345'),
        'Content-Type': 'application/json',

    })
};

@Injectable({
    providedIn: 'root'
})

export class GlobalService {

    apiBaseUrl: String = '';
    ModelId;
    Model: any = {};
    tipo: String;

    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;

    constructor(public http: HttpClient, private toastr: ToastrService,private spinner: NgxSpinnerService) {
        this.apiBaseUrl = 'https://consultorestmapi.azurewebsites.net/api'; //endpoint local
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
       
    }

    

    getHeaderClear() {
        const httpOptions = {
            headers: new HttpHeaders({
            })
        };

        return httpOptions;
    }


    getModel(tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(this.apiBaseUrl + "" + tipo, httpOptions).subscribe(data => {
                resolve(data);
               //console.log(data);
                

            }, err => {
                console.log(err);
                //return this.toastr.error('Usuario no registrado')

            })
        })
    }
    getUser(tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(this.apiBaseUrl + "" + tipo, httpOptions).subscribe(data => {
                resolve(data);
               //console.log(data);
                

            }, err => {
                console.log(err);
                return this.toastr.error('No existe Usuario o Contraseña Invalida')

            })
        })
    }


    getModel_Id(id: String, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(this.apiBaseUrl + "" + tipo + '/' + id, httpOptions).subscribe((data: any) => {


                resolve(data);


            }, (err: any) => {
                console.log({ id: id, tipo: tipo, httpOptions: httpOptions });


            })
        })
    }

    addModel(model, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.post(this.apiBaseUrl + "" + tipo, model, httpOptions).subscribe((data: any) => {
               // console.log(data);
                this.showNotification('bottom', 'right', 2, "Datos guardados con exito");



                resolve(data);
            }, (err: any) => {
                console.log(err);
                this.showNotification('bottom', 'right', 4, err);

            })
        })
    }

    addLogin(model, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.post(this.apiBaseUrl + "" + tipo, model, httpOptions).subscribe((data: any) => {
               // console.log(data);
                this.showNotification('bottom', 'right', 2, "Bienvenido al Sistema");
                resolve(data);
            }, err => {
                this.spinner.hide();
                console.log(err);
                return this.toastr.error('No existe Usuario o Contraseña Invalida')
                
             } )

        })
    }

    addfilter(model, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.post(this.apiBaseUrl + "" + tipo, model, httpOptions).subscribe((data: any) => {
               // console.log(data);
               // this.showNotification('bottom', 'right', 2, "Datos guardados con exito");



                resolve(data);
            }, (err: any) => {
                console.log(err);
               // this.showNotification('bottom', 'right', 4, err);

            })
        })
    }

    updateModel(id, model, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.put(this.apiBaseUrl + "" + tipo + '/' + id, model, httpOptions).subscribe((data: any) => {
               // console.log(data);
                this.showNotification('bottom', 'right', 2, "Datos Actualizados con exito");



                resolve(data);
            }, (err: any) => {
                console.log(err);
                this.showNotification('bottom', 'right', 4, err);

            })
        })
    }

    removeModel(id, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.delete(this.apiBaseUrl + "" + tipo + '/' + id, httpOptions).subscribe((data: any) => {
               // console.log(data);
                this.showNotification('bottom', 'right', 2, "Datos Eliminados con exito");



                resolve(data);
            }, (err: any) => {
                console.log(err);
                this.showNotification('bottom', 'right', 4, err);

            })
        })
    }


    getModel_Id_Notification(id: String, tipo: String, httpOptions = httpOptionsDefault) {

        return new Promise(resolve => {
            this.http.get(this.apiBaseUrl + "" + tipo + '/' + id, httpOptions).subscribe((data: any) => {
                resolve(data);

            }, (err: any) => {
                // console.log(err);

            })
        })
    }




    showNotification(from, align, color, text) {
        
    
        switch (color) {
          case 1:
            this.toastr.info(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+text+'</b></span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-info alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 2:
            this.toastr.success(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+text+'</b></span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 3:
            this.toastr.warning(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+text+'</b></span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-warning alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 4:
            this.toastr.error(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+text+'</b></span>',
              "",
              {
                timeOut: 4000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          case 5:
            this.toastr.show(
                '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message"><b>'+text+'</b></span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-primary alert-with-icon",
                positionClass: "toast-" + from + "-" + align
              }
            );
            break;
          default:
            break;
        }
      }
}
