import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Rate} from '../model';
import {DbOperationsService} from '../db-operations.service';
import {Observable} from 'rxjs/Observable';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-rate-list',
    templateUrl: './rate-list.component.html',
    styleUrls: ['./rate-list.component.scss']
})

export class RateListComponent implements OnInit {
    @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<any>;
    @ViewChild('alertTemplate') alertTemplate: TemplateRef<any>;

    rows : Observable<Rate>;
    columns = [];

    loadingIndicator = true;
    editMode:boolean;
    reorderable = true;

    confirmModal: NgbModalRef;
    alertMessage:string;

    currentValue:any;
    desc:string;
    rate:string;
    package:string;
    addon:string;

    constructor(private db: DbOperationsService, private element: ElementRef, private modalService: NgbModal) {
        this.loadList();
    }

    ngOnInit() {
        this.columns = [
            {prop: 'description', name: 'Description'},
            {prop: 'rate', name: 'Rate'},
            {prop: 'package', name: 'Package'},
            {prop: 'addon', name: 'Add-on'},
            {prop: 'id', name: 'Actions', cellTemplate: this.actionsTemplate}
        ];
    }

    loadList(){
        this.rows = this.db.getRates();
    }

    edit(value){
        this.currentValue = value;
        this.editMode = (value != null) ? true : false;
        this.entryDiv(true);

        if(!this.editMode) {
            this.desc = '';
            this.rate = '';
            this.package = '';
            this.addon = '';
        }
        else{
            this.desc = this.currentValue.description;
            this.rate = this.currentValue.rate;
            this.package = this.currentValue.package;
            this.addon = this.currentValue.addon;
        }
    }

    cancel(){
        this.entryDiv(false);
    }

    entryDiv(show){
        const element: HTMLElement = this.element.nativeElement;
        const editdiv = element.getElementsByClassName('editdiv')[0];
        const listdiv = element.getElementsByClassName('listdiv')[0];
        const ngxdatatable = element.getElementsByClassName('ngx-datatable')[0];
        if(show){
            editdiv.classList.remove('collapse-div');
            listdiv.classList.add('collapse-div');
            ngxdatatable.classList.add('no-height-div');
        }
        else{
            editdiv.classList.add('collapse-div');
            listdiv.classList.remove('collapse-div');
            ngxdatatable.classList.remove('no-height-div');
        }
    }

    save() {
        let value = {"id":this.currentValue ? this.currentValue.id : 0,
            "rate": this.rate,
            "package":this.package,
            "description":this.desc,
            "addon":this.addon};

        if(this.editMode){
            this.db.updateRate(value).subscribe(
                data => {
                    this.showAlert("Update successful.");
                    this.loadList();
                    this.entryDiv(false);
                    return true;
                },
                error => {
                    this.showError();
                    return Observable.throw(error);
                }
            );
        }else {
            this.db.addRate(value).subscribe(
                data => {
                    this.showAlert("Successfully added Rate.");
                    this.loadList();
                    this.entryDiv(false);
                    return true;
                },
                error => {
                    this.showError();
                    return Observable.throw(error);
                }
            );
        }
    }

    confirmDelete(value, dialog) {
        this.confirmModal = this.modalService.open(dialog);
        this.currentValue = value;
    }

    delete() {
        this.db.deleteRate(this.currentValue).subscribe(
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
