import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../core/services/data.service';
import { IActivity, IPagedResults } from '../shared/interfaces';
import { TrackByService } from '../core/services/trackby.service';

@Component({
    //moduleId: module.id,
    selector: 'cm-come',
    templateUrl: 'come.component.html'
})
export class ComeComponent implements OnInit {
    contactForm: FormGroup;

    get name() { return this.contactForm.get('name'); }

    get email() { return this.contactForm.get('email'); }
    get message() { return this.contactForm.get('message'); }
    constructor(
        private http: HttpClient) { }
 
    ngOnInit() { 
        this.contactForm = new FormGroup({
          name: new FormControl('', Validators.minLength(2)),
          email: new FormControl('', Validators.email),
          message: new FormControl('', Validators.minLength(10)),
        });

    }

    onSubmit() {
        console.debug(this.contactForm.value.name)
        const body = new HttpParams()
          .set('form-name', 'contact')
          .append('name', this.contactForm.value.name)
          .append('email', this.contactForm.value.email)
          .append('message', this.contactForm.value.message)
          .append('activity', 'unknown')
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