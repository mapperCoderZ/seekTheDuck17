import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cm-app-component',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate([''])
  }
}