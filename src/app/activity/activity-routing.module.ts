import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ActivityComponent }   from './activity.component';
import { ActivityDetailsComponent } from './activity-details.component';
import { CanActivateGuard } from './can-activate.guard';
import { CanDeactivateGuard } from './can-deactivate.guard';

const routes: Routes = [
  { 
    path: '', 
    component: ActivityComponent,
    children: [
      { path:'details', component: ActivityDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
  providers:    [ CanActivateGuard, CanDeactivateGuard ]
})
export class ActivityRoutingModule {
  static components = [ ActivityComponent, ActivityDetailsComponent ];
}

