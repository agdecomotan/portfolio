import {Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DbOperationsService} from '../db-operations.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    @ViewChild('alertTemplate') alertTemplate: TemplateRef<any>;

    user:string;
    pass:string;

    constructor(private element : ElementRef, private db: DbOperationsService, private modalService: NgbModal, private router: Router) { }

    ngOnInit() {
        const element: HTMLElement = this.element.nativeElement.parentElement;
        const navbar = element.getElementsByClassName('navbar')[0];
        navbar.classList.add('navbar-transparent');
    }

    login() {
        this.db.getUser({username:this.user, password:this.pass })
            .subscribe(
            data => {
                localStorage.setItem('user', data['username']);
                this.router.navigate(['/product-list']);
            },
            error =>
                this.modalService.open(this.alertTemplate)
        );
    }

    showError(){
        this.modalService.open(this.alertTemplate);
    }
}

