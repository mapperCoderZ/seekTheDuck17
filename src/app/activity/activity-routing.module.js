"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var activity_component_1 = require("./activity.component");
var activity_details_component_1 = require("./activity-details.component");
var can_activate_guard_1 = require("./can-activate.guard");
var can_deactivate_guard_1 = require("./can-deactivate.guard");
var routes = [
    {
        path: '',
        component: activity_component_1.ActivityComponent,
        children: [
            { path: 'details', component: activity_details_component_1.ActivityDetailsComponent }
        ]
    }
];
var ActivityRoutingModule = (function () {
    function ActivityRoutingModule() {
    }
    return ActivityRoutingModule;
}());
ActivityRoutingModule.components = [activity_component_1.ActivityComponent, activity_details_component_1.ActivityDetailsComponent];
ActivityRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(routes)],
        exports: [router_1.RouterModule],
        providers: [can_activate_guard_1.CanActivateGuard, can_deactivate_guard_1.CanDeactivateGuard]
    })
], ActivityRoutingModule);
exports.ActivityRoutingModule = ActivityRoutingModule;
//# sourceMappingURL=activity-routing.module.js.map