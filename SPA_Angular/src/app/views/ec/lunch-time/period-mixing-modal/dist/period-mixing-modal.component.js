"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PeriodMixingModalComponent = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var PeriodMixingModalComponent = /** @class */ (function () {
    function PeriodMixingModalComponent(activeModal, periodMixingService, alertify, datePipe, translateService) {
        this.activeModal = activeModal;
        this.periodMixingService = periodMixingService;
        this.alertify = alertify;
        this.datePipe = datePipe;
        this.translateService = translateService;
        this.dateNow = new Date;
        this.startTime = new Date(new Date().setHours(0, 0, 0, 0));
        this.endTime = new Date(new Date().setHours(0, 0, 0, 0));
        this.editSettings = {
            showDeleteConfirmDialog: false,
            allowEditing: true,
            allowAdding: true,
            allowDeleting: true,
            mode: "Normal"
        };
        this.toolbar = [
            "Add",
            "Delete",
            "Cancel",
            "ExcelExport",
            "Search",
        ];
        this.pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
    }
    PeriodMixingModalComponent.prototype.ngOnInit = function () {
        this.getPeriodMixingByBuilding();
    };
    PeriodMixingModalComponent.prototype.getPeriodMixingByBuilding = function () {
        var _this = this;
        this.periodMixingService.getPeriodMixingByBuilding(this.buildingLunchTimeId).subscribe(function (res) {
            _this.periodMixingData = res;
        });
    };
    PeriodMixingModalComponent.prototype.updateModel = function (item) {
        this.startTime = new Date(item.startTime);
        this.endTime = new Date(item.endTime);
    };
    PeriodMixingModalComponent.prototype.update = function () {
        var _this = this;
        this.periodMixingService.updatePeriodMixing(this.periodMixingUpdate).subscribe(function (res) {
            if (res.status) {
                _this.alertify.success(_this.translateService.instant(res.message));
                _this.getPeriodMixingByBuilding();
            }
            else {
                _this.alertify.error(_this.translateService.instant(res.message));
                _this.getPeriodMixingByBuilding();
            }
        });
    };
    PeriodMixingModalComponent.prototype.create = function () {
        var _this = this;
        this.periodMixingService.createPeriodMixing(this.periodMixingAdd).subscribe(function (res) {
            if (res.status) {
                _this.alertify.success(_this.translateService.instant(res.message));
                _this.getPeriodMixingByBuilding();
            }
            else {
                _this.alertify.error(_this.translateService.instant(res.message));
                _this.getPeriodMixingByBuilding();
            }
        });
    };
    PeriodMixingModalComponent.prototype.actionBegin = function (args) {
        if (args.requestType === "beginEdit") {
            var item = args.rowData;
            this.updateModel(item);
        }
        if (args.requestType === "save" && args.action === "add") {
            this.periodMixingAdd = {
                id: 0,
                buildingID: this.buildingLunchTimeId,
                isOvertime: false,
                startTime: this.datePipe.transform(this.startTime, "yyyy-MM-dd HH:mm"),
                endTime: this.datePipe.transform(this.endTime, "yyyy-MM-dd HH:mm"),
                createdTime: this.datePipe.transform(this.dateNow, "yyyy-MM-dd HH:mm"),
                updatedTime: null,
                deletedTime: null,
                isDelete: false,
                createdBy: 0,
                deletedBy: 0,
                updatedBy: 0
            };
            this.create();
            this.startTime = new Date(new Date().setHours(0, 0, 0, 0));
            this.endTime = new Date(new Date().setHours(0, 0, 0, 0));
        }
        if (args.requestType === "save" && args.action === "edit") {
            this.periodMixingUpdate = {
                id: args.data.id,
                buildingID: args.data.buildingID,
                isOvertime: args.data.isOvertime,
                startTime: this.datePipe.transform(this.startTime, "yyyy-MM-dd HH:mm"),
                endTime: this.datePipe.transform(this.endTime, "yyyy-MM-dd HH:mm"),
                createdTime: args.data.createdTime,
                updatedTime: this.datePipe.transform(this.dateNow, "yyyy-MM-dd HH:mm"),
                deletedTime: args.data.deletedTime,
                isDelete: args.data.isDelete,
                createdBy: args.data.createdBy,
                deletedBy: args.data.deletedBy,
                updatedBy: args.data.updateBy
            };
            this.update();
            this.startTime = new Date(new Date().setHours(0, 0, 0, 0));
            this.endTime = new Date(new Date().setHours(0, 0, 0, 0));
        }
        if (args.requestType === "delete") {
            this["delete"](args.data[0].id);
        }
    };
    PeriodMixingModalComponent.prototype.actionComplete = function (args) {
        // if (args.requestType === "edit") {
        //   (args.form.elements.namedItem("ID") as HTMLInputElement).disabled = true;
        //   (args.form.elements.namedItem(
        //     "Password"
        //   ) as HTMLInputElement).disabled = true;
        // }
        // if (args.requestType === "add") {
        //   (args.form.elements.namedItem("ID") as HTMLInputElement).disabled = true;
        // }
        //console.log(args)
    };
    PeriodMixingModalComponent.prototype.toolbarClick = function (args) {
        switch (args.item.text) {
            case "Excel Export":
                this.grid.excelExport({ hierarchyExportMode: "All" });
                break;
            default:
                break;
        }
    };
    PeriodMixingModalComponent.prototype["delete"] = function (id) {
        var _this = this;
        this.alertify["delete"]("Delete Project", 'Are you sure you want to delete this Period Mixing ID "' + id + '" ?')
            .then(function (result) {
            if (result) {
                _this.periodMixingService["delete"](id).subscribe(function (res) {
                    if (res) {
                        _this.alertify.success("Delete successfully");
                        _this.getPeriodMixingByBuilding();
                        return;
                    }
                    _this.alertify.error("Delete failed");
                });
            }
        })["catch"](function (err) {
            _this.getPeriodMixingByBuilding();
            _this.grid.refresh();
        });
    };
    PeriodMixingModalComponent.prototype.NO = function (index) {
        return ((this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1);
    };
    __decorate([
        core_1.Input()
    ], PeriodMixingModalComponent.prototype, "title");
    __decorate([
        core_1.Input()
    ], PeriodMixingModalComponent.prototype, "buildingLunchTimeId");
    __decorate([
        core_1.ViewChild("grid")
    ], PeriodMixingModalComponent.prototype, "grid");
    PeriodMixingModalComponent = __decorate([
        core_1.Component({
            selector: 'app-period-mixing-modal',
            templateUrl: './period-mixing-modal.component.html',
            styleUrls: ['./period-mixing-modal.component.css'],
            providers: [common_1.DatePipe]
        })
    ], PeriodMixingModalComponent);
    return PeriodMixingModalComponent;
}());
exports.PeriodMixingModalComponent = PeriodMixingModalComponent;
