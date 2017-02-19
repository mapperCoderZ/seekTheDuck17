"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var activities_routing_module_1 = require("./activities-routing.module");
var ActivitiesModule = (function () {
    function ActivitiesModule() {
    }
    return ActivitiesModule;
}());
ActivitiesModule = __decorate([
    core_1.NgModule({
        imports: [activities_routing_module_1.ActivitiesRoutingModule, shared_module_1.SharedModule],
        declarations: [activities_routing_module_1.ActivitiesRoutingModule.components]
    })
], ActivitiesModule);
exports.ActivitiesModule = ActivitiesModule;
//# sourceMappingURL=activities.module.js.map