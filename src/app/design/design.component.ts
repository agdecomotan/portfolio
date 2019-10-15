import {Component, OnInit} from '@angular/core';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../model';
import {Observable} from 'rxjs/Observable';
import {DbOperationsService} from '../db-operations.service';

@Component({
    selector: 'app-design',
    templateUrl: './design.component.html',
    styleUrls: ['./design.component.scss']
})

export class DesignComponent {
    apiURL = "https://callousphotography.000webhostapp.com/api/uploads/"

    invitePhotos : Observable<Product>;
    graphicsPhotos : Observable<Product>;

    selectedPhoto : string;
    modal: NgbModalRef;

    constructor(private db: DbOperationsService, private modalService: NgbModal){
        this.loadList();
    }

    loadList(){
        this.invitePhotos = this.db.getProducts("Invite");
        this.graphicsPhotos = this.db.getProducts("Graphics");
    }

    showPhoto(value, dialog){
        this.selectedPhoto = value;
        this.modal = this.modalService.open(dialog);
    }
}
