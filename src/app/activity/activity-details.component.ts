import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { IActivity } from '../shared/interfaces';
import { DataService } from '../core/services/data.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';


@Component({
  //moduleId: module.id,
  selector: 'cm-activity-details',
  templateUrl: 'activity-details.component.html',
  styleUrls: [ 'activity-details.component.css' ]
})
export class ActivityDetailsComponent implements OnInit {
  contactForm: FormGroup;
  activity: IActivity;
  mapEnabled: boolean;
  get name() { return this.contactForm.get('name'); }

  get email() { return this.contactForm.get('email'); }
  get message() { return this.contactForm.get('message'); }
  constructor(private route: ActivatedRoute, private dataService: DataService,
    private http: HttpClient) { }

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.minLength(2)),
      email: new FormControl('', Validators.email),
      message: new FormControl('', Validators.minLength(10)),
    });
      //Subscribe to params so if it changes we pick it up. Could use this.route.parent.snapshot.params["id"] to simplify it.
      this.route.parent.params.subscribe((params: Params) => {
        let id = +params['id'];
        this.dataService.getActivity(id)
            .subscribe((activity: IActivity) => {
              this.activity = activity;
              this.mapEnabled = true;
            });
      });
  }

  onSubmit() {
    console.debug(this.contactForm.value.name)
    const body = new HttpParams()
      .set('form-name', 'contact')
      .append('name', this.contactForm.value.name)
      .append('email', this.contactForm.value.email)
      .append('message', this.contactForm.value.message)
      .append('activity', this.activity.name)
    this.http.post('/welcome', body.toString(), {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}).subscribe(
      res => {},
      err => {
        if (err instanceof ErrorEvent) {
          //client side error
          alert("Something went wrong when sending your message.");
          console.log(err.error.message);
        } else {
          //backend error. If status is 200, then the message successfully sent
          if (err.status === 200) {
            alert("Your message has been sent!");
            this.contactForm.reset();
          } else {
            alert("Something went wrong when sending your message.");
            console.log('Error status:');
            console.log(err.status);
            console.log('Error body:');
            console.log(err.error);
          };
        };
      }
    );
  };

}