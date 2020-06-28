import { NgModule }      from '@angular/core';

import { SharedModule }   from '../shared/shared.module';
import { ComeRoutingModule } from './come-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports:      [ SharedModule, ComeRoutingModule,FormsModule,ReactiveFormsModule ],
  declarations: [ ComeRoutingModule.components ]
})
export class ComeModule { }