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
var sorter_service_1 = require("../core/services/sorter.service");
var trackby_service_1 = require("../core/services/trackby.service");
var ActivitiesGridComponent = (function () {
    function ActivitiesGridComponent(sorterService, trackbyService) {
        this.sorterService = sorterService;
        this.trackbyService = trackbyService;
        this.activities = [];
    }
    ActivitiesGridComponent.prototype.ngOnInit = function () {
    };
    ActivitiesGridComponent.prototype.sort = function (prop) {
        this.sorterService.sort(this.activities, prop);
    };
    return ActivitiesGridComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ActivitiesGridComponent.prototype, "activities", void 0);
ActivitiesGridComponent = __decorate([
    core_1.Component({
        selector: 'cm-activities-grid',
        templateUrl: 'activities-grid.component.html',
        styleUrls: ['activities-grid.component.css'],
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [sorter_service_1.SorterService, trackby_service_1.TrackByService])
], ActivitiesGridComponent);
exports.ActivitiesGridComponent = ActivitiesGridComponent;
//# sourceMappingURL=activities-grid.component.js.map