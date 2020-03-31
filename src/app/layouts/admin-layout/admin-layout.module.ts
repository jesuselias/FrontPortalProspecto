import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import {SoftwareComponent} from '../../pages/software/software.component';
import {RoleComponent} from '../../pages/role/role.component';
import { TitleComponent } from '../../pages/title/title.component';
import { UsuarioComponent } from '../../pages/usuario/usuario.component';
import { ProspectiComponent } from '../../pages/prospecti/prospecti.component';
import { CurrencyComponent } from "../../pages/currency/currency.component";

import {AssignmentComponent} from '../../pages/assignment/assignment.component';
import { NgxMultiselectModule } from '@ngx-lib/multiselect';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { 
	IgxInputGroupModule,
	IgxSliderModule
 } from "igniteui-angular";

 import { Ng5SliderModule } from 'ng5-slider';

 import { NgxSpinnerModule } from "ngx-spinner";

 import { FileUploadModule } from 'ng2-file-upload'

@NgModule({
  imports: [
    CommonModule,NgxPaginationModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    NgxMultiselectModule,
    NgbModalModule,IgxInputGroupModule,
    IgxSliderModule,Ng5SliderModule,NgxSpinnerModule,
    FileUploadModule
  ],
  declarations: [
    DashboardComponent,
    ProspectiComponent,
    UserComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    SoftwareComponent,
    RoleComponent,
    TitleComponent,
    AssignmentComponent,
    UsuarioComponent,
    CurrencyComponent
   
  ],
  
  
  providers: [BsModalService],
})

export class AdminLayoutModule {}
