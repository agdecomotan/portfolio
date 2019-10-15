import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Product, Rate} from './model';
import {Router} from '@angular/router';

interface ItemsResponse {
    data: Product[];
}

@Injectable()
export class DbOperationsService {
    apiURL = "https://callousphotography.000webhostapp.com/api/";
    //apiURL = "/wis/api/";

    constructor(private http: HttpClient, private router: Router) {
    }

    //Product
    getProducts(value?) : Observable<Product> {
        const url = this.apiURL + 'api/product/get.php';
        if(value) {
            const params = new HttpParams()
                .set('category', value);
            return this.http.get<Product>(url, {params});
        }
        else{
            return this.http.get<Product>(url);
        }
    }

    updateProduct(value) {
        const url = this.apiURL + 'api/product/update.php';
        return this.http.post(url, value);
    }

    addProduct(value) {
        const url = this.apiURL + 'api/product/add.php';
        return this.http.post(url, value);
    }

    deleteProduct(value) {
        const url = this.apiURL + 'api/product/delete.php';
        return this.http.post(url, value);
    }

    postFile(fileToUpload: File) {
        const url = this.apiURL + 'upload-image.php';
        const formData: FormData = new FormData();
        formData.append('fileToUpload', fileToUpload, fileToUpload.name);
        return this.http.post(url, formData).subscribe(
            (r)=>{console.log("Uploaded image.")}
        );
    }

    //User

    getUser(value) {
        const url = this.apiURL + 'api/user/get.php';
        const params = new HttpParams()
            .set('username', value['username'])
            .set('password', value['password']);
        return this.http.get(url, {params});
    }

    logoutUser(){
        localStorage.clear();
        this.router.navigate(['/admin']);
    }

    //Message
    addMessage(value) {
        const url = this.apiURL + 'api/message/add.php';
        return this.http.post(url, value);
    }

    getMessages() : Observable<any> {
        const url = this.apiURL + 'api/message/get.php';
        return this.http.get<any>(url);
     }

    deleteMessage(value) {
        const url = this.apiURL + 'api/message/delete.php';
        return this.http.post(url, value);
    }

    //Rate
    getRates() : Observable<Rate> {
        const url = this.apiURL + 'api/rate/get.php';
        return this.http.get<Rate>(url);
    }

    updateRate(value) {
        const url = this.apiURL + 'api/rate/update.php';
        return this.http.post(url, value);
    }

    addRate(value) {
        const url = this.apiURL + 'api/rate/add.php';
        return this.http.post(url, value);
    }

    deleteRate(value) {
        const url = this.apiURL + 'api/rate/delete.php';
        return this.http.post(url, value);
    }
}
