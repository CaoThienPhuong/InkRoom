"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LunchTimeComponent = void 0;
var period_mixing_modal_component_1 = require("./period-mixing-modal/period-mixing-modal.component");
var core_1 = require("@angular/core");
var ej2_angular_grids_1 = require("@syncfusion/ej2-angular-grids");
var LunchTimeComponent = /** @class */ (function () {
    function LunchTimeComponent(accountService, lunchTimeService, modalService, alertify) {
        this.accountService = accountService;
        this.lunchTimeService = lunchTimeService;
        this.modalService = modalService;
        this.alertify = alertify;
        this.fieldsBuilding = { text: "name", value: "name" };
        this.fieldsRole = { text: "name", value: "name" };
        this.editSettings = {
            showDeleteConfirmDialog: false,
            allowEditing: false,
            allowAdding: true,
            allowDeleting: true,
            mode: "Normal"
        };
        this.password = "";
        this.roleID = 0;
        this.locale = 'de-DE';
        this.passwordFake = "aRlG8BBHDYjrood3UqjzRl3FubHFI99nEPCahGtZl9jvkexwlJ";
        this.pageSettings = { pageCount: 20, pageSizes: true, pageSize: 10 };
    }
    LunchTimeComponent.prototype.ngOnInit = function () {
        this.getAllUsers();
        this.getBuildingByLunchTime();
        this.toolbarAccount = [
            // "Add",
            // "Delete",
            // "Cancel",
            "ExcelExport",
            "Search",
        ];
    };
    LunchTimeComponent.prototype.tooltips = function (data) {
        if (data) {
            return data;
        }
        else {
            return "";
        }
    };
    // life cycle ejs-grid
    LunchTimeComponent.prototype.createdUsers = function () { };
    LunchTimeComponent.prototype.actionBegin = function (args) {
        if (args.requestType === "save" && args.action === "add") {
            this.user = {
                id: 0,
                username: args.data.Username,
                password: this.password,
                email: args.data.Email,
                roleid: 2,
                employeeID: args.data.EmployeeID,
                isLeader: false,
                systemCode: 4
            };
            if (this.roleID !== 0) {
                this.create();
            }
            else {
                this.alertify.error("Please Select Role !");
                args.cancel = true;
            }
        }
        if (args.requestType === "save" && args.action === "edit") {
            this.user = {
                id: args.data.ID,
                username: args.data.Username,
                password: this.password || "",
                email: args.data.Email || "",
                roleid: 2,
                systemCode: 4,
                employeeID: args.data.EmployeeID,
                isLeader: false
            };
            // this.roleID = args.data.RoleID;
            this.mapRoleUser(this.userID, this.roleID);
            this.update();
            this.mapBuildingUser(this.userID, this.buildingID);
        }
        if (args.requestType === "delete") {
            this["delete"](args.data[0].ID);
        }
    };
    LunchTimeComponent.prototype.toolbarClick = function (args) {
        switch (args.item.text) {
            case "Excel Export":
                this.grid.excelExport({ hierarchyExportMode: "All" });
                break;
            default:
                break;
        }
    };
    LunchTimeComponent.prototype.actionComplete = function (args) {
        if (args.requestType === "edit") {
            args.form.elements.namedItem("ID").disabled = true;
            args.form.elements.namedItem("Password").disabled = true;
        }
        if (args.requestType === "add") {
            args.form.elements.namedItem("ID").disabled = true;
        }
    };
    // end life cycle ejs-grid
    // api
    LunchTimeComponent.prototype.onChangeBuilding = function (args, data) {
        this.userID = data.ID;
        this.buildingID = args.itemData.id;
    };
    LunchTimeComponent.prototype.onChangeRole = function (args, data) {
        this.userID = data.ID;
        this.roleID = args.itemData.id;
    };
    LunchTimeComponent.prototype.getBuildings = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.accountService.getBuildings().subscribe(function (result) {
                _this.buildings = result || [];
                res(result);
            }, function (error) {
                rej(error);
            });
        });
    };
    LunchTimeComponent.prototype.getRoleUser = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.accountService.getAllRoleUser().subscribe(function (result) {
                _this.roles = result || [];
                res(result);
            }, function (error) {
                rej(error);
            });
        });
    };
    LunchTimeComponent.prototype.getRoles = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.accountService.getAllRole().subscribe(function (result) {
                _this.roleData = result || [];
                res(result);
            }, function (error) {
                rej(error);
            });
        });
    };
    LunchTimeComponent.prototype.openPeriodModal = function (data) {
        var modalRef = this.modalService.open(period_mixing_modal_component_1.PeriodMixingModalComponent, {
            size: "xl"
        });
        modalRef.componentInstance.title = " ( *The lunch time of " + data.name + " building: " + data.lunchTime + ")";
        modalRef.componentInstance.buildingLunchTimeId = data.id;
        modalRef.result.then(function (result) { }, function (reason) { });
    };
    LunchTimeComponent.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getBuildings()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getRoleUser()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getRoles()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.getBuildingUsers()];
                    case 4:
                        _a.sent();
                        this.accountService.getAllUsers(1, 10000).subscribe(function (res) {
                            var users = res.result.map(function (item) {
                                return {
                                    ID: item.ID,
                                    Username: item.Username,
                                    Password: _this.passwordFake + item.ID,
                                    Email: item.Email,
                                    EmployeeID: item.EmployeeID,
                                    Status: _this.StatusTemplate(item.ID),
                                    RoleID: _this.RoleIDTempate(item.ID),
                                    RoleName: _this.RoleTempate(item.ID),
                                    BuildingName: _this.buildingTempate(item.ID)
                                };
                            });
                            _this.userData = users;
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        this.alertify.error(error_1 + "");
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    LunchTimeComponent.prototype.getBuildingByLunchTime = function () {
        var _this = this;
        this.lunchTimeService.getBuilingByLunchTime().subscribe(function (res) {
            _this.buildingData = res;
        });
    };
    LunchTimeComponent.prototype.getBuildingUsers = function () {
        var _this = this;
        return new Promise(function (res, rej) {
            _this.accountService.getBuildingUsers().subscribe(function (result) {
                _this.buildingUsers = result;
                res(result);
            }, function (err) {
                rej(err);
            });
        });
    };
    LunchTimeComponent.prototype.mapBuildingUser = function (userid, buildingid) {
        var _this = this;
        if (userid !== undefined && buildingid !== undefined) {
            this.accountService
                .mapBuildingUser(userid, buildingid)
                .subscribe(function (res) {
                if (res.status) {
                    _this.alertify.success(res.message);
                    _this.getBuildingUsers();
                    _this.getAllUsers();
                }
                else {
                    _this.alertify.success(res.message);
                }
            });
        }
    };
    LunchTimeComponent.prototype.mapRoleUser = function (userid, roleid) {
        var _this = this;
        if (userid !== undefined && roleid !== undefined) {
            this.accountService.mapRoleUser(userid, roleid).subscribe(function (res) {
                if (res.status) {
                    _this.getAllUsers();
                }
                else {
                    _this.alertify.success(res.message);
                }
            });
        }
    };
    LunchTimeComponent.prototype["delete"] = function (id) {
        var _this = this;
        this.accountService.deleteUser(id).subscribe(function (res) {
            _this.alertify.success("The user has been deleted!");
            _this.getAllUsers();
        });
    };
    LunchTimeComponent.prototype.create = function () {
        var _this = this;
        this.accountService.createUser(this.user).subscribe(function (res) {
            _this.alertify.success("The user has been created!");
            if (res > 0) {
                _this.mapRoleUser(res, _this.roleID);
                _this.mapBuildingUser(res, _this.buildingID);
                _this.getAllUsers();
                _this.password = "";
            }
        });
    };
    LunchTimeComponent.prototype.update = function () {
        var _this = this;
        this.accountService.updateUser(this.user).subscribe(function (res) {
            _this.alertify.success("The user has been updated!");
            _this.getAllUsers();
            _this.password = "";
        });
    };
    // end api
    // template ejs-grid
    LunchTimeComponent.prototype.buildingTempate = function (userid) {
        var buildingUser = this.buildingUsers.filter(function (item) { return item.userID === userid; });
        if (buildingUser.length === 0) {
            return "#N/A";
        }
        var buildingID = buildingUser[0].buildingID || 0;
        var building = this.buildings.filter(function (item) { return item.id === buildingID; });
        if (building.length === 0) {
            return "#N/A";
        }
        var buildingName = building[0].name;
        return buildingName || "#N/A";
    };
    LunchTimeComponent.prototype.RoleTempate = function (userid) {
        var roleUser = this.roles.filter(function (item) { return item.userID === userid; });
        if (roleUser.length === 0) {
            return "#N/A";
        }
        var roleID = roleUser[0].roleID || 0;
        var roel = this.roleData.filter(function (item) { return item.id === roleID; });
        if (roel.length === 0) {
            return "#N/A";
        }
        var roleName = roel[0].name;
        return roleName || "#N/A";
    };
    LunchTimeComponent.prototype.RoleIDTempate = function (userid) {
        var roleUser = this.roles.filter(function (item) { return item.userID === userid; });
        if (roleUser.length === 0) {
            return "#N/A";
        }
        var roleID = roleUser[0].roleID || 0;
        var roleName = roleID;
        return roleName || "#N/A";
    };
    LunchTimeComponent.prototype.StatusTemplate = function (userid) {
        var roleUser = this.roles.filter(function (item) { return item.userID === userid; });
        if (roleUser.length === 0) {
            return "#N/A";
        }
        var stt = roleUser[0].status || 0;
        var Status = stt;
        return Status || "#N/A";
    };
    // end template ejs-grid
    LunchTimeComponent.prototype.NO = function (index) {
        return ((this.grid.pageSettings.currentPage - 1) * this.pageSettings.pageSize + Number(index) + 1);
    };
    LunchTimeComponent.prototype.blockAccount = function (data) {
        var _this = this;
        this.accountService.blockAccount(data.ID).subscribe(function (res) {
            if (res.status) {
                _this.alertify.success(res.message);
                _this.getAllUsers();
            }
            else {
                _this.alertify.success(res.message);
            }
        });
    };
    __decorate([
        core_1.ViewChild("periodModal")
    ], LunchTimeComponent.prototype, "periodModal");
    __decorate([
        core_1.ViewChild("grid")
    ], LunchTimeComponent.prototype, "grid");
    LunchTimeComponent = __decorate([
        core_1.Component({
            selector: 'app-lunch-time',
            templateUrl: './lunch-time.component.html',
            styleUrls: ['./lunch-time.component.css'],
            providers: [ej2_angular_grids_1.ToolbarService, ej2_angular_grids_1.EditService, ej2_angular_grids_1.PageService]
        })
    ], LunchTimeComponent);
    return LunchTimeComponent;
}());
exports.LunchTimeComponent = LunchTimeComponent;
