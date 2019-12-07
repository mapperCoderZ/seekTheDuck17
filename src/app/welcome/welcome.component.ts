import { Component, OnInit } from '@angular/core';
@Component({
    //moduleId: module.id,
    selector: 'cm-about',
    templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements OnInit {
    public canardImg: any = require('../../images/canard.png');

    constructor() { }
 
    ngOnInit() { 

    }

}