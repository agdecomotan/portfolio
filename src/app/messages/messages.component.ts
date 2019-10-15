import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DbOperationsService} from '../db-operations.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})

export class MessagesComponent implements OnInit {
    @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<any>;
    @ViewChild('alertTemplate') alertTemplate: TemplateRef<any>;

    rows : Observable<any>;
    columns = [];

    confirmModal: NgbModalRef;
    alertMessage:string;
    currentValue:any;

    constructor(private db: DbOperationsService, private modalService: NgbModal){
        this.loadList();
    }

    ngOnInit() {
        this.columns = [
            {prop: 'datecreated', name: 'Date'},
            {prop: 'name', name: 'Name'},
            {prop: 'email', name: 'Email Address'},
            {prop: 'contact', name: 'Contact Number'},
            {prop: 'message', name: 'Message'},
            {prop: 'id', name: 'Actions', cellTemplate: this.actionsTemplate}
        ];
    }

    loadList(){
        this.rows = this.db.getMessages();
    }

    confirmDelete(value, dialog) {
        this.confirmModal = this.modalService.open(dialog);
        this.currentValue = value;
    }

    delete() {
        this.db.deleteMessage(this.currentValue).subscribe(
            data => {
                this.confirmModal.close();
                this.showAlert("Delete successful.");
                this.loadList();
                return true;
            },
            error => {
                this.showError();
                return Observable.throw(error);
            }
        );
    }

    showAlert(value){
        this.alertMessage = value;
        this.modalService.open(this.alertTemplate);
    }

    showError(){
        this.alertMessage = "Error encountered.";
        this.modalService.open(this.alertTemplate);
    }
}
