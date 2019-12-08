import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { IActivity, IOrder, IPagedResults, IApiResponse } from '../../shared/interfaces';

@Injectable()
export class DataService {

    // Can use /api/activities and /api/orders below when running locally
    // Full domain/port is included for Docker example or if it were to run in the cloud
    port = (this.window.location.port) ? ':' + this.window.location.port : '';
    baseUrl = `${this.window.location.protocol}//${this.window.location.hostname}${this.port}`;
    activitiesBaseUrl = this.baseUrl + '/api/activities';
    activitiesUrl = this.baseUrl + '/assets/activities.json';
    ordersBaseUrl = this.baseUrl + '/api/orders';
    orders: IOrder[];

    constructor(private http: HttpClient, @Inject('Window') private window: Window) { }

    getActivities(): Observable<IActivity[]> {
        return this.http.get<IActivity[]>(this.activitiesUrl)
            .pipe(
                map(activities => {
                    return activities;
                }), 
                catchError(this.handleError)
            );
    }


    getActivity(id: number): Observable<IActivity> {
        return this.http.get<IActivity[]>(this.activitiesUrl)
            .pipe(
                map(activities => {
                    for (let activity of activities) {
                        if (activity.id === id) {
                            return activity;
                        }
                    }
                }),
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return Observable.throw(errMessage);
            // Use the following instead if using lite-server
            // return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(error || 'Node.js server error');
    }


}
