import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IActivity, IPagedResults } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
    //moduleId: module.id,
    selector: 'cm-come',
    templateUrl: 'come.component.html'
})
export class ComeComponent implements OnInit {

    constructor() { }
 
    ngOnInit() { 

    }

}