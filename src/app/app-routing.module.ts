import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

import { PreloadModulesStrategy } from './core/strategies/preload-modules.strategy';

const app_routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: '/welcome' },
  { path: 'activities', loadChildren: 'app/activities/activities.module#ActivitiesModule'},
  { path: 'activities/:id', loadChildren: 'app/activity/activity.module#ActivityModule'},
  { path: 'orders', loadChildren: 'app/orders/orders.module#OrdersModule'},
  { path: 'welcome', loadChildren: 'app/welcome/welcome.module#WelcomeModule'},
  { path: '**', pathMatch:'full', redirectTo: '/welcome' } //catch any unfound routes and redirect to home page
];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes, { preloadingStrategy: PreloadAllModules }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
