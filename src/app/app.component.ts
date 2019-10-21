import {Component, Inject, Renderer} from '@angular/core';
import {Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {DOCUMENT} from '@angular/platform-browser';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor( private renderer : Renderer, private router: Router, @Inject(DOCUMENT,) private document: any) {}
}
