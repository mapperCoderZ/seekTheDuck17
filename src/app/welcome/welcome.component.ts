
import { DataService } from '../core/services/data.service';
import { Component, OnInit } from '@angular/core';
import { IWelcome } from '../shared/interfaces';

@Component({
    //moduleId: module.id,
    selector: 'cm-about',
    templateUrl: 'welcome.component.html'
})
export class WelcomeComponent implements OnInit {

    constructor(private dataService: DataService) { }
 
    welcome: IWelcome;
    title: String;
    ngOnInit() { 
        this.getWelcomePage();
        this.title="test"

    }

    getWelcomePage() {
        this.dataService.getWelcomePage()
            .subscribe((response: IWelcome) => {
              this.welcome = response;
            },
            (err: any) => console.log(err),
            () => console.log('GetWelcomePage() retrieved')); 
      }
}