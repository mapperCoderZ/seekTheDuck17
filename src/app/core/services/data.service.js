"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/throw");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.activitiesBaseUrl = '/api/activities';
        this.ordersBaseUrl = '/api/orders';
    }
    DataService.prototype.getActivities = function () {
        var _this = this;
        return this.http.get(this.activitiesBaseUrl)
            .map(function (res) {
            var activities = res.json();
            _this.calculateActivitiesOrderTotal(activities);
            return activities;
        })
            .catch(this.handleError);
    };
    DataService.prototype.getActivitiesPage = function (page, pageSize) {
        var _this = this;
        return this.http.get(this.activitiesBaseUrl + "/page/" + page + "/" + pageSize)
            .map(function (res) {
            var totalRecords = +res.headers.get('X-InlineCount');
            var activities = res.json();
            _this.calculateActivitiesOrderTotal(activities);
            return {
                results: activities,
                totalRecords: totalRecords
            };
        })
            .catch(this.handleError);
    };
    DataService.prototype.getActivity = function (id) {
        var _this = this;
        return this.http.get(this.activitiesBaseUrl + '/' + id)
            .map(function (res) {
            var activity = res.json();
            _this.calculateActivitiesOrderTotal([activity]);
            return activity;
        })
            .catch(this.handleError);
    };
    DataService.prototype.insertActivity = function (activity) {
        return this.http.post(this.activitiesBaseUrl, activity)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.updateActivity = function (activity) {
        return this.http.put(this.activitiesBaseUrl + '/' + activity.id, activity)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    DataService.prototype.deleteActivity = function (id) {
        return this.http.delete(this.activitiesBaseUrl + '/' + id)
            .map(function (res) { return res.json().status; })
            .catch(this.handleError);
    };
    DataService.prototype.handleError = function (error) {
        console.error('server error:', error);
        if (error instanceof http_1.Response) {
            var errMessage = '';
            try {
                errMessage = error.json().error;
            }
            catch (err) {
                errMessage = error.statusText;
            }
            return Observable_1.Observable.throw(errMessage);
        }
        return Observable_1.Observable.throw(error || 'Node.js server error');
    };
    DataService.prototype.createObservable = function (data) {
        return Observable_1.Observable.create(function (observer) {
            observer.next(data);
            observer.complete();
        });
    };
    DataService.prototype.calculateActivitiesOrderTotal = function (activities) {
        for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
            var activity = activities_1[_i];
            if (activity && activity.orders) {
                var total = 0;
                for (var _a = 0, _b = activity.orders; _a < _b.length; _a++) {
                    var order = _b[_a];
                    total += order.itemCost;
                }
                activity.orderTotal = total;
            }
        }
    };
    return DataService;
}());
DataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DataService);
exports.DataService = DataService;
//# sourceMappingURL=data.service.js.map