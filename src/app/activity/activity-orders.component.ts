import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DataService } from '../core/services/data.service';
import { IActivity, IOrder, IOrderItem } from '../shared/interfaces';

@Component({
  moduleId: module.id,
  selector: 'cm-activity-orders',
  templateUrl: 'activity-orders.component.html'
})
export class ActivityOrdersComponent implements OnInit {

  orders: IOrder[] = [];
  activity: IActivity;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
      //Subscribe to params so if it changes we pick it up.  Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        this.dataService.getActivity(id).subscribe((activity: IActivity) => {
          this.activity = activity;
        });
      });
  }

  ordersTrackBy(index: number, orderItem: any) {
    return index;
  }

}