import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable }    from 'rxjs/Observable';

import { ActivityEditComponent } from './activity-edit.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<ActivityEditComponent> {

  canDeactivate(
    component: ActivityEditComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    console.log(`ActivityId: ${route.parent.params['id']} URL: ${state.url}`);

    //Check with component to see if we're able to deactivate
    return component.canDeactivate();
  }
}