import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {DbOperationsService} from '../db-operations.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Product} from '../model';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss']
})

export class PhotosComponent {
    apiURL = "https://callousphotography.000webhostapp.com/api/uploads/"

    eventPhotos : Observable<Product>;
    foodPhotos : Observable<Product>;
    productPhotos : Observable<Product>;
    travelPhotos : Observable<Product>;

    selectedPhoto : string;
    modal: NgbModalRef;

    constructor(private db: DbOperationsService, private modalService: NgbModal){
        this.loadList();
    }

    loadList(){
        this.eventPhotos = this.db.getProducts("Event");
        this.foodPhotos = this.db.getProducts("Food");
        this.productPhotos = this.db.getProducts("Product");
        this.travelPhotos = this.db.getProducts("Travel");
    }

    showPhoto(value, dialog){
        this.selectedPhoto = value;
        this.modal = this.modalService.open(dialog);
    }
}
