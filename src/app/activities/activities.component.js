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
var data_service_1 = require("../core/services/data.service");
var filter_service_1 = require("../core/services/filter.service");
var ActivitiesComponent = (function () {
    function ActivitiesComponent(dataService, filterService) {
        this.dataService = dataService;
        this.filterService = filterService;
        this.activities = [];
        this.filteredActivities = [];
        this.displayModeEnum = DisplayModeEnum;
        this.totalRecords = 0;
        this.pageSize = 10;
    }
    ActivitiesComponent.prototype.ngOnInit = function () {
        this.title = 'Activities';
        this.filterText = 'Filter Activities:';
        this.displayMode = DisplayModeEnum.Card;
        this.getActivitiesPage(1);
    };
    ActivitiesComponent.prototype.changeDisplayMode = function (mode) {
        this.displayMode = mode;
    };
    ActivitiesComponent.prototype.pageChanged = function (page) {
        this.getActivitiesPage(page);
    };
    ActivitiesComponent.prototype.getActivitiesPage = function (page) {
        var _this = this;
        this.dataService.getActivitiesPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe(function (response) {
            _this.activities = _this.filteredActivities = response.results;
            _this.totalRecords = response.totalRecords;
        }, function (err) { return console.log(err); }, function () { return console.log('getActivitiesPage() retrieved activities for page: ' + page); });
    };
    ActivitiesComponent.prototype.filterChanged = function (data) {
        if (data && this.activities) {
            data = data.toUpperCase();
            var props = ['name', 'description', 'city'];
            this.filteredActivities = this.filterService.filter(this.activities, data, props);
        }
        else {
            this.filteredActivities = this.activities;
        }
    };
    return ActivitiesComponent;
}());
ActivitiesComponent = __decorate([
    core_1.Component({
        selector: 'cm-activities',
        templateUrl: 'activities.component.html'
    }),
    __metadata("design:paramtypes", [data_service_1.DataService, filter_service_1.FilterService])
], ActivitiesComponent);
exports.ActivitiesComponent = ActivitiesComponent;
var DisplayModeEnum;
(function (DisplayModeEnum) {
    DisplayModeEnum[DisplayModeEnum["Card"] = 0] = "Card";
    DisplayModeEnum[DisplayModeEnum["Grid"] = 1] = "Grid";
    DisplayModeEnum[DisplayModeEnum["Map"] = 2] = "Map";
})(DisplayModeEnum || (DisplayModeEnum = {}));
//# sourceMappingURL=activities.component.js.map