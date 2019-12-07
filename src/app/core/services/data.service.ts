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
    ordersBaseUrl = this.baseUrl + '/api/orders';
    orders: IOrder[];

    constructor(private http: HttpClient, @Inject('Window') private window: Window) { }

    getActivities(): Observable<IActivity[]> {
        return this.http.get<IActivity[]>(this.activitiesBaseUrl)
            .pipe(
                map(activities => {
                    this.calculateActivitiesOrderTotal(activities);
                    return activities;
                }),
                catchError(this.handleError)
            );
    }
    getActivitiesPage(page: number, pageSize: number): Observable<IPagedResults<IActivity[]>> {
        return this.http.get<IActivity[]>(
            `${this.activitiesBaseUrl}/page/${page}/${pageSize}`,
            { observe: 'response' })
            .pipe(
                map(res => {
                    const totalRecords = +res.headers.get('X-InlineCount');
                    const activities = res.body as IActivity[];
                    this.calculateActivitiesOrderTotal(activities);
                    return {
                        results: activities,
                        totalRecords: totalRecords
                    };
                }),
                catchError(this.handleError)
            );
    }


    getActivity(id: number): Observable<IActivity> {
        return this.http.get<IActivity>(this.activitiesBaseUrl + '/' + id)
            .pipe(
                map(activity => {
                    this.calculateActivitiesOrderTotal([activity]);
                    return activity;
                }),
                catchError(this.handleError)
            );
    }

    insertActivity(activity: IActivity): Observable<IActivity> {
        return this.http.post<IActivity>(this.activitiesBaseUrl, activity)
            .pipe(catchError(this.handleError));
    }

    updateActivity(activity: IActivity): Observable<boolean> {
        return this.http.put<IApiResponse>(this.activitiesBaseUrl + '/' + activity.id, activity)
            .pipe(
                map(res => res.status),
                catchError(this.handleError)
            );
    }

    deleteActivity(id: number): Observable<boolean> {
        return this.http.delete<IApiResponse>(this.activitiesBaseUrl + '/' + id)
            .pipe(
                map(res => res.status),
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

    calculateActivitiesOrderTotal(activities: IActivity[]) {
        for (const activity of activities) {
            if (activity && activity.orders) {
                let total = 0;
                for (const order of activity.orders) {
                    total += order.itemCost;
                }
                activity.orderTotal = total;
            }
        }
    }

    // Not using now but leaving since they show how to create
    // and work with custom observables

    // Would need following import added:
    // import { Observer } from 'rxjs';

    // createObservable(data: any): Observable<any> {
    //     return Observable.create((observer: Observer<any>) => {
    //         observer.next(data);
    //         observer.complete();
    //     });
    // }

}
