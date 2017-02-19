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
var forms_1 = require("@angular/forms");
var data_service_1 = require("../core/services/data.service");
var modal_service_1 = require("../core/modal/modal.service");
var growler_service_1 = require("../core/growler/growler.service");
var ActivityEditComponent = (function () {
    function ActivityEditComponent(router, route, dataService, growler, modalService) {
        this.router = router;
        this.route = route;
        this.dataService = dataService;
        this.growler = growler;
        this.modalService = modalService;
        this.activity = {
            id: 0,
            name: '',
            description: '',
            picture: '',
            address: '',
            city: ''
        };
        this.operationText = 'Insert';
    }
    ActivityEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.parent.params.subscribe(function (params) {
            var id = +params['id'];
            if (id !== 0) {
                _this.operationText = 'Update';
                _this.getActivity(id);
            }
        });
    };
    ActivityEditComponent.prototype.getActivity = function (id) {
        var _this = this;
        this.dataService.getActivity(id).subscribe(function (activity) {
            _this.activity = activity;
        });
    };
    ActivityEditComponent.prototype.submit = function () {
        var _this = this;
        if (this.activity.id === 0) {
            this.dataService.insertActivity(this.activity)
                .subscribe(function (insertedActivity) {
                if (insertedActivity) {
                    _this.activityForm.form.markAsPristine();
                    _this.router.navigate(['/activities']);
                }
                else {
                    var msg = 'Unable to insert activity';
                    _this.growler.growl(msg, growler_service_1.GrowlerMessageType.Danger);
                    _this.errorMessage = msg;
                }
            }, function (err) { return console.log(err); });
        }
        else {
            this.dataService.updateActivity(this.activity)
                .subscribe(function (status) {
                if (status) {
                    _this.activityForm.form.markAsPristine();
                    _this.growler.growl('Operation performed successfully.', growler_service_1.GrowlerMessageType.Success);
                }
                else {
                    var msg = 'Unable to update activity';
                    _this.growler.growl(msg, growler_service_1.GrowlerMessageType.Danger);
                    _this.errorMessage = msg;
                }
            }, function (err) { return console.log(err); });
        }
    };
    ActivityEditComponent.prototype.cancel = function (event) {
        event.preventDefault();
        this.router.navigate(['/activities']);
    };
    ActivityEditComponent.prototype.delete = function (event) {
        var _this = this;
        event.preventDefault();
        this.dataService.deleteActivity(this.activity.id)
            .subscribe(function (status) {
            if (status) {
                _this.router.navigate(['/activities']);
            }
            else {
                _this.errorMessage = 'Unable to delete activity';
            }
        }, function (err) { return console.log(err); });
    };
    ActivityEditComponent.prototype.canDeactivate = function () {
        if (!this.activityForm.dirty) {
            return true;
        }
        var modalContent = {
            header: 'Lose Unsaved Changes?',
            body: 'You have unsaved changes! Would you like to leave the page and lose them?',
            cancelButtonText: 'Cancel',
            OKButtonText: 'Leave'
        };
        return this.modalService.show(modalContent);
    };
    return ActivityEditComponent;
}());
__decorate([
    core_1.ViewChild('activityForm'),
    __metadata("design:type", forms_1.NgForm)
], ActivityEditComponent.prototype, "activityForm", void 0);
ActivityEditComponent = __decorate([
    core_1.Component({
        selector: 'cm-activity-edit',
        templateUrl: 'activity-edit.component.html',
        styleUrls: ['activity-edit.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        router_1.ActivatedRoute,
        data_service_1.DataService,
        growler_service_1.GrowlerService,
        modal_service_1.ModalService])
], ActivityEditComponent);
exports.ActivityEditComponent = ActivityEditComponent;
//# sourceMappingURL=activity-edit.component.js.map