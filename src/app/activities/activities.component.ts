import { Component, OnInit } from '@angular/core';

import { DataService } from '../core/services/data.service';
import { IActivity, IPagedResults } from '../shared/interfaces';
import { FilterService } from '../core/services/filter.service';

@Component({ 
  //moduleId: module.id,
  selector: 'cm-activities',
  templateUrl: 'activities.component.html'
})
export class ActivitiesComponent implements OnInit {

  title: string;
  filterText: string;
  activities: IActivity[] = [];
  filteredActivities: IActivity[] = [];
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  totalRecords: number = 0;
  pageSize: number = 10;

  constructor(private dataService: DataService, private filterService: FilterService) { }
  
  ngOnInit() {
    this.title = 'Tours';
    this.filterText = 'Filter Tours:';
    this.displayMode = DisplayModeEnum.Card;

    this.getActivities();
  }

  changeDisplayMode(mode: DisplayModeEnum) {
      this.displayMode = mode;
  }

  getActivities() {
    this.dataService.getActivities()
        .subscribe((response: IActivity[]) => {
          this.activities = this.filteredActivities = response;
        },
        (err: any) => console.log(err),
        () => console.log('getActivities() retrieved'));
  }

  filterChanged(data: string) {
    if (data && this.activities) {
        data = data.toUpperCase();
        const props = ['name', 'description', 'date', 'address'];
        this.filteredActivities = this.filterService.filter<IActivity>(this.activities, data, props);
    }
    else {
      this.filteredActivities = this.activities;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2
}
