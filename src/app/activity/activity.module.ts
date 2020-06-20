import { NgModule }      from '@angular/core';

import { SharedModule }   from '../shared/shared.module';
import { ActivityRoutingModule } from './activity-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:      [ ActivityRoutingModule, SharedModule, FormsModule,ReactiveFormsModule ],
  declarations: [ ActivityRoutingModule.components ]
})
export class ActivityModule { }