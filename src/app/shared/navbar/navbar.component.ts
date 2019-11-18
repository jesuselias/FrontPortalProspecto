import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import { GlobalService } from "app/pages/providers/global.service";


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [

  { path: '/dashboard',          title: 'Dashboard',      icon:'nc-single-02',  class: '' },
  { path: '/user',          title: 'User',      icon:'nc-single-02',  class: '' },
  { path: '/software',         title: 'Software',        icon:'nc-tile-56',    class: '' },
  { path: '/usuario',         title: 'Usuario',        icon:'nc-tile-56',    class: '' },
  { path: '/title',         title: 'title',        icon:'nc-tile-56',    class: '' },


];

@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    private sidebarVisible: boolean;

    navbar:any;

    public isCollapsed = true;
    @ViewChild("navbar-cmp", {static: false}) button;

    constructor(private globalService: GlobalService,location:Location, private renderer : Renderer, private element : ElementRef, private router: Router,public  route: ActivatedRoute) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.navbar=[];
    }

    ngOnInit(){
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.router.events.subscribe((event) => {
        this.sidebarClose();
       });

       this.selectfunicones();

      //  this.route
      //  .queryParams
      //  .subscribe(params => {
      //    console.log((params));
      //      this.navbar=params;

      //    });
    }

    selectfunicones(){
      //localStorage.getItem('funcioneslogin');
     this.navbar= JSON.parse(localStorage.getItem('funcioneslogin'))
     //this.navbar.push({});
     console.log(this.navbar)
    }


   
    public salir(){
      let logged= localStorage.getItem("logged");
      if(logged=="true"){
        return localStorage.clear();
        
      }
    }
    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }
      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
      }
      sidebarOpen() {
          const toggleButton = this.toggleButton;
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          setTimeout(function(){
              toggleButton.classList.add('toggled');
          }, 500);

          html.classList.add('nav-open');
          if (window.innerWidth < 991) {
            mainPanel.style.position = 'fixed';
          }
          this.sidebarVisible = true;
      };
      sidebarClose() {
          const html = document.getElementsByTagName('html')[0];
          const mainPanel =  <HTMLElement>document.getElementsByClassName('main-panel')[0];
          if (window.innerWidth < 991) {
            setTimeout(function(){
              mainPanel.style.position = '';
            }, 500);
          }
          this.toggleButton.classList.remove('toggled');
          this.sidebarVisible = false;
          html.classList.remove('nav-open');
      };
      collapse(){
        this.isCollapsed = !this.isCollapsed;
        const navbar = document.getElementsByTagName('nav')[0];
        console.log(navbar);
        if (!this.isCollapsed) {
          navbar.classList.remove('navbar-transparent');
          navbar.classList.add('bg-white');
        }else{
          navbar.classList.add('navbar-transparent');
          navbar.classList.remove('bg-white');
        }

      }

}
