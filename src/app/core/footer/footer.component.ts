import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { LoggerService } from '../services/logger.service';

@Component({
    selector: 'cm-footer',
    templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

    isCollapsed: boolean;

    constructor(private router: Router,
        private logger: LoggerService) { }

    ngOnInit() {
    }

}
