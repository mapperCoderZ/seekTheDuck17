import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, NoPreloading } from '@angular/router';

const app_routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'activities/:id', data: { preload: true }, loadChildren: () => import('./activity/activity.module').then(m => m.ActivityModule) },
  { path: 'activities', loadChildren: () => import('./activities/activities.module').then(m => m.ActivitiesModule) },
  { path: 'come', data: { preload: true }, loadChildren: () => import('./come/come.module').then(m => m.ComeModule) },
  { path: 'welcome', loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: '**', pathMatch: 'full', redirectTo: '/welcome' } // catch any unfound routes and redirect to home page

];

@NgModule({
  imports: [ RouterModule.forRoot(app_routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }