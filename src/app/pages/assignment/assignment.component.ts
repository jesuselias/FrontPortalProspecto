import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";

import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { GlobalService } from "../providers/global.service";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {


  ngOnInit() {
    this.getAssignment();
  }


  title = 'AngularCRUDExample';
  UserList: any;
  index:any;
  HardwareList: any;
  SoftwareList: any;
  AssignmentList: any;
  assignment: any;
  bsModalRef: BsModalRef;
  user: any;
  titleModal: string = "";
  save: boolean = false;
  edit: boolean = false;
  constructor(private globalService: GlobalService, private bsModalService: BsModalService) {
    this.user = [];
    this.assignment = [];
    this.AssignmentList = [];
  }
  OpenAssignmentModal(template: TemplateRef<any>, option, index: number) {
    this.user = [];


    if (option === "save") {
      this.assignment = [];
      this.titleModal = 'Assignment';
      this.save = true;
    } else
      if (option === "edit") {
        this.titleModal = 'Assignment';
        this.save = true;
        //console.log(this.UserList[index])
        this.user = this.UserList[index];
        this.assignment.UserID = this.user.id
        this.showAssignment();
        //console.log(this.user);
      } else
        if (option === 'delete') {

          this.assignment.hardwareID = this.AssignmentList[index].hardwareID;
          this.assignment.softwareID = this.AssignmentList[index].softwareID;
        }

    this.AssignmentList = [];
    this.bsModalRef = this.bsModalService.show(template);

  }

  getAssignment() {
    this.globalService.getModel("/users").then(
      result => {
        //console.log(result);
        this.UserList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );


    this.globalService.getModel("/hardware").then(
      result => {
        //console.log(result);
        this.HardwareList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
    this.globalService.getModel("/software").then(
      result => {
        //console.log(result);
        this.SoftwareList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );
  }

  showAssignment() {
    console.log(this.assignment);
    this.globalService.getModel("/assignment/user/" + this.assignment.UserID).then(
      result => {
        //console.log(result);
        this.AssignmentList = result;
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );


  }

  deleteAssignment(index) {
    this.assignment.hardwareID = this.AssignmentList[index].hardwareID;
    this.assignment.softwareID = this.AssignmentList[index].softwareID;
    //console.log(this.assignment);
    let postAss = {
      "userID": this.assignment.UserID,
      "softwareID": this.assignment.SoftwareID,
      "hardwareID": this.assignment.HardwareID,
    };

    this.globalService.addModel(postAss, "/assignment/delete").then(
      result => {
        //console.log(result);
        // this.getAssignment();
        this.showAssignment();
      },
      err => {
        console.log(err);

        //this.loader.dismiss();
      }
    );
   
   this.save=true;
  }

  editAssignment(index) {
    //console.log(this.user)

    let postUser = {
      'id': this.user.id,
      'userName': this.user.userName,
      'Name': this.user.name,
      'lastName': this.user.lastName,
      'Age': this.user.age,
      'lastSessionDateTime': '2019-08-05T15:02:29.393'
    };

    this.globalService.updateModel(this.user.id, postUser, "/users").then(
      result => {
        //console.log(result);
        this.getAssignment();
      },
      err => {
        console.log(err);
        //this.loader.dismiss();
      }
    );

    this.onClose()
  }


  saveAssignment() {
    //console.log(this.assignment)

    let postAss = {
      "userID": this.assignment.UserID,
      "softwareID": this.assignment.SoftwareID,
      "hardwareID": this.assignment.HardwareID,
    };
    //console.log(postAss);

    this.globalService.addModel(postAss, "/assignment").then(
      result => {
        //console.log(result);
        //this.getAssignment();
        this.showAssignment();
      },
      err => {
        console.log(err);
      }
    );
    this.assignment.SoftwareID = null;
    this.assignment.HardwareID = null;

  }

  onClose() {
    this.edit = false;
    this.save = false;
    this.bsModalRef.hide();
  }


}
