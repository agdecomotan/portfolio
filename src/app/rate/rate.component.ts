import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Rate} from '../model';
import {DbOperationsService} from '../db-operations.service';

@Component({
    selector: 'app-rate',
    templateUrl: './rate.component.html',
    styleUrls: ['./rate.component.scss']
})

export class RateComponent  {
    rates : Observable<Rate>;

    constructor(private db: DbOperationsService){
        this.loadList();
    }

    loadList(){
        this.rates = this.db.getRates();
    }
}
