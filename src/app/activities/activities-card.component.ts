import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { IActivity } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({ 
  //moduleId: module.id,
  selector: 'cm-activities-card',
  templateUrl: 'activities-card.component.html',
  styleUrls: [ 'activities-card.component.css' ],
  //Add [@flyInOut]="'in'" into template on card
  // animations: [
  //   trigger('flyInOut', [
  //     state('in', style({transform: 'translateX(0)', opacity: 1})),
  //     transition('void => *', [
  //       style({transform: 'translateX(25%)', opacity: 0}),
  //       animate(300)
  //     ]),
  //     transition('* => void', [
  //       animate(300, style({transform: 'translateX(-25%)', opacity: 1}))
  //     ])
  //   ])
  // ],
  //When using OnPush detectors, then the framework will check an OnPush 
  //component when any of its input properties changes, when it fires 
  //an event, or when an observable fires an event ~ Victor Savkin (Angular Team)
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class ActivityCardComponent implements OnInit {
  
  @Input() activities: IActivity[] = [];
  constructor(public trackbyService: TrackByService) {
    
   }
  ngOnInit() {
  } 

  getImgPath(activity:IActivity){
    return require('../../images/'+activity.picture+'.png');
  }
} 

