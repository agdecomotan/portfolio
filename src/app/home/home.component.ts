import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DbOperationsService} from '../db-operations.service';
import {Observable} from 'rxjs/Observable';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    @ViewChild('alertTemplate') alertTemplate: TemplateRef<any>;
    alertMessage:string;

    name:string;
    email:string;
    contact:string;
    message:string;
    datecreated:string;

    model = {
        left: true,
        middle: false,
        right: false
    };
    constructor(private db: DbOperationsService,  private modalService: NgbModal) { }

    ngOnInit() {}

    sendMessage(){
        this.db.addProduct(null).subscribe(
            data => {
                this.showAlert("Successfully send message!");
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
