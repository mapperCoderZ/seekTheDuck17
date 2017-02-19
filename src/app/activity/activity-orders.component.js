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
var router_1 = require("@angular/router");
var data_service_1 = require("../core/services/data.service");
var ActivityOrdersComponent = (function () {
    function ActivityOrdersComponent(route, dataService) {
        this.route = route;
        this.dataService = dataService;
        this.orders = [];
    }
    ActivityOrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            var id = +params['id'];
            _this.dataService.getActivity(id).subscribe(function (activity) {
                _this.activity = activity;
            });
        });
    };
    ActivityOrdersComponent.prototype.ordersTrackBy = function (index, orderItem) {
        return index;
    };
    return ActivityOrdersComponent;
}());
ActivityOrdersComponent = __decorate([
    core_1.Component({
        selector: 'cm-activity-orders',
        templateUrl: 'activity-orders.component.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, data_service_1.DataService])
], ActivityOrdersComponent);
exports.ActivityOrdersComponent = ActivityOrdersComponent;
//# sourceMappingURL=activity-orders.component.js.map