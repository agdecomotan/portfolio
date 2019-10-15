import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {DbOperationsService} from '../../db-operations.service';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    confirmModal: NgbModalRef;

    constructor(public location: Location, private element : ElementRef, private db: DbOperationsService, private modalService: NgbModal) {
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };

    isAdmin() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/product-list' || titlee === '/rate-list' || titlee === '/messages' ) {
            return true;
        }
        else {
            return false;
        }
    }

    isAdminLogin() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if( titlee === '/admin') {
            return true;
        }
        else {
            return false;
        }
    }

    confirmLogout(dialog){
        this.confirmModal = this.modalService.open(dialog);
    }

    logout(){
        this.db.logoutUser();
        this.confirmModal.close();
    }
}
