"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PeriodMixingService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var environment_1 = require("../../../environments/environment");
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
    })
};
var PeriodMixingService = /** @class */ (function () {
    function PeriodMixingService(http) {
        this.http = http;
        this.baseUrl = environment_1.environment.apiUrlEC;
        this.messageSource = new rxjs_1.BehaviorSubject(0);
        this.currentMessage = this.messageSource.asObservable();
    }
    // method này để change source message
    PeriodMixingService.prototype.changeMessage = function (message) {
        this.messageSource.next(message);
    };
    // rename(edit) { return this.http.put(`${this.baseUrl}Building/Update`, edit); }
    // getBuildingsAsTreeView() {
    //   return this.http.get(`${this.baseUrl}Building/GetAllAsTreeView`);
    // }
    // createMainBuilding(Building) { return this.http.post(`${this.baseUrl}Building/CreateMainBuilding`, Building); }
    PeriodMixingService.prototype.createPeriodMixing = function (PeriodMixing) { return this.http.post(this.baseUrl + "PeriodMixing/CreatePeriodMixing", PeriodMixing); };
    PeriodMixingService.prototype.getPeriodMixingByBuilding = function (buildingId) {
        return this.http.get(this.baseUrl + "PeriodMixing/GetPeriodMixingByBuilding/" + buildingId);
    };
    PeriodMixingService.prototype.updatePeriodMixing = function (PeriodMixing) { return this.http.put(this.baseUrl + "PeriodMixing/UpdatePeriodMixing", PeriodMixing); };
    PeriodMixingService.prototype["delete"] = function (id) { return this.http["delete"](this.baseUrl + "PeriodMixing/Delete/" + id); };
    PeriodMixingService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PeriodMixingService);
    return PeriodMixingService;
}());
exports.PeriodMixingService = PeriodMixingService;
