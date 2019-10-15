import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {DbOperationsService} from '../db-operations.service';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})

export class LandingComponent implements OnInit {
    @ViewChild('alertTemplate') alertTemplate: TemplateRef<any>;
    alertMessage: string;

    name: string;
    email: string;
    contact: string;
    message: string;

    constructor(private db: DbOperationsService, private modalService: NgbModal) {
    }

    ngOnInit() {
    }

    sendMessage() {
        let value = {
            name: this.name,
            email: this.email,
            contact: this.contact,
            message: this.message
        }
        this.db.addMessage(value).subscribe(
            data => {
                this.name= "";
                this.email= "";
                this.contact= "";
                this.message= "";
                this.showAlert("Successfully send message!");
                return true;
            },
            error => {
                this.showError();
                return Observable.throw(error);
            }
        );
    }

    showAlert(value) {
        this.alertMessage = value;
        this.modalService.open(this.alertTemplate);
    }

    showError() {
        this.alertMessage = "Error encountered.";
        this.modalService.open(this.alertTemplate);
    }
}