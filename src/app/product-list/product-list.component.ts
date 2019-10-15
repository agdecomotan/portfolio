import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DbOperationsService} from '../db-operations.service';
import {Observable} from 'rxjs/Observable';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../model';

@Component({
selector: 'app-product-list',
templateUrl: './product-list.component.html',
styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit {
    @ViewChild('actionsTemplate') actionsTemplate: TemplateRef<any>;
    @ViewChild('alertTemplate') alertTemplate: TemplateRef<any>;

    apiURL = "https://callousphotography.000webhostapp.com/api/uploads/";

    rows : Observable<Product>;
    columns = [];


    loadingIndicator = true;
    fileToUpload: File = null;
    editMode:boolean;
    reorderable = true;

    confirmModal: NgbModalRef;
    alertMessage:string;

    currentValue:any;
    title:string;
    desc:string;
    cat:string;
    photo:string;
    photoSrc:string;

    constructor(private db: DbOperationsService, private element: ElementRef, private modalService: NgbModal) {
       this.loadList();
    }

    ngOnInit() {
        this.columns = [
            {prop: 'title', name: 'Product Name'},
            {prop: 'description', name: 'Description'},
            {prop: 'category', name: 'Category'},
            {prop: 'id', name: 'Actions', cellTemplate: this.actionsTemplate}
        ];
    }

    loadList(){
        this.rows = this.db.getProducts();
    }

    uploadPhoto() {
        this.db.postFile(this.fileToUpload);
    }

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
    }

    edit(value){
        this.currentValue = value;
        this.editMode = (value != null) ? true : false;
        this.entryDiv(true);

        this.fileToUpload = null;

        if(!this.editMode) {
            this.title = '';
            this.desc = '';
            this.cat = '';
            this.photo = '';
            this.photoSrc = '';
        }
        else{
            this.title = this.currentValue.title;
            this.desc = this.currentValue.description;
            this.cat = this.currentValue.category;
            this.photo = this.currentValue.photo;
            this.photoSrc = this.apiURL + this.photo;
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
        if(this.fileToUpload){
            this.photo = this.fileToUpload.name;
            this.uploadPhoto();
        }

        let value = {"id":this.currentValue ? this.currentValue.id : 0,"title": this.title,"category":this.cat,"description":this.desc,"photo":this.photo};

        if(this.editMode){
            this.db.updateProduct(value).subscribe(
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
            this.db.addProduct(value).subscribe(
                data => {
                    this.showAlert("Successfully added Product.");
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
        this.db.deleteProduct(this.currentValue).subscribe(
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
