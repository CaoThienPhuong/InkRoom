"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ECModule = exports.HttpLoaderFactory = void 0;
var work_list_component_1 = require("./work-list/work-list.component");
var setting_workplan_component_1 = require("./setting-workplan/setting-workplan.component");
var totalChemicalModal_component_1 = require("./schedule-detail-workplan/totalChemicalModal/totalChemicalModal.component");
var totalInkModal_component_1 = require("./schedule-detail-workplan/totalInkModal/totalInkModal.component");
var print_qrcode_glue_workplan_component_1 = require("./schedule-detail-workplan/print-qrcode-glue-workplan/print-qrcode-glue-workplan.component");
var print_qrcode_workplan_component_1 = require("./schedule-detail-workplan/print-qrcode-workplan/print-qrcode-workplan.component");
var detail_directive_1 = require("./../../_core/_directive/detail.directive");
var schedule_detail_workplan_component_1 = require("./schedule-detail-workplan/schedule-detail-workplan.component");
var process_component_1 = require("./process/process.component");
var chemical_modal_component_1 = require("./chemical/chemical-modal/chemical-modal.component");
// Angular
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var ngx_spinner_1 = require("ngx-spinner");
// Components Routing
var ec_routing_module_1 = require("./ec-routing.module");
var ng_select_1 = require("@ng-select/ng-select");
var glue_component_1 = require("./glue/glue.component");
var glue_modal_component_1 = require("./glue/glue-modal/glue-modal.component");
var ej2_angular_dropdowns_1 = require("@syncfusion/ej2-angular-dropdowns");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
// Import ngx-barcode module
var ej2_angular_barcode_generator_1 = require("@syncfusion/ej2-angular-barcode-generator");
var ej2_angular_charts_1 = require("@syncfusion/ej2-angular-charts");
var ej2_angular_buttons_1 = require("@syncfusion/ej2-angular-buttons");
var ej2_angular_grids_1 = require("@syncfusion/ej2-angular-grids");
var ej2_angular_treegrid_1 = require("@syncfusion/ej2-angular-treegrid");
var ej2_angular_buttons_2 = require("@syncfusion/ej2-angular-buttons");
var suppiler_component_1 = require("./suppiler/suppiler.component");
var building_component_1 = require("./building/building.component");
var building_user_component_1 = require("./building-user/building-user.component");
var ej2_angular_calendars_1 = require("@syncfusion/ej2-angular-calendars");
var account_component_1 = require("./account/account.component");
var building_modal_component_1 = require("./building/building-modal/building-modal.component");
var ej2_angular_barcode_generator_2 = require("@syncfusion/ej2-angular-barcode-generator");
var ej2_angular_inputs_1 = require("@syncfusion/ej2-angular-inputs");
var http_1 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var ej2_angular_navigations_1 = require("@syncfusion/ej2-angular-navigations");
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var focus_directive_1 = require("./focus.directive");
var select_directive_1 = require("./select.directive");
var search_directive_1 = require("./search.directive");
var select_text_directive_1 = require("./select.text.directive");
var ej2_angular_popups_1 = require("@syncfusion/ej2-angular-popups");
var ngx_chips_1 = require("ngx-chips");
var ej2_angular_calendars_2 = require("@syncfusion/ej2-angular-calendars");
var ng2_search_filter_1 = require("ng2-search-filter");
var select_qrcode_directive_1 = require("./select.qrcode.directive");
var schedule_detail_component_1 = require("./schedule-detail/schedule-detail.component");
var ink_component_1 = require("./ink/ink.component");
var ink_modal_component_1 = require("./ink/ink-modal/ink-modal.component");
var chemical_component_1 = require("./chemical/chemical.component");
var schedule_component_1 = require("./schedule/schedule.component");
var ej2_angular_buttons_3 = require("@syncfusion/ej2-angular-buttons");
var ngx_pretty_checkbox_1 = require("ngx-pretty-checkbox");
var schedule_status_component_1 = require("./schedule-status/schedule-status.component");
var treament_way_component_1 = require("./treament-way/treament-way.component");
var stock_component_1 = require("./stock/stock.component");
var print_qrcode_component_1 = require("./ink/print-qrcode/print-qrcode.component");
var chemical_print_qrcode_component_1 = require("./chemical/chemical-print-qrcode/chemical-print-qrcode.component");
var workplan_component_1 = require("./workplan/workplan.component");
var ngx_color_picker_1 = require("ngx-color-picker");
var ngx_textarea_autosize_1 = require("ngx-textarea-autosize");
var lunch_time_component_1 = require("./lunch-time/lunch-time.component");
var period_mixing_modal_component_1 = require("./lunch-time/period-mixing-modal/period-mixing-modal.component");
var kendo_angular_dateinputs_1 = require("@progress/kendo-angular-dateinputs");
var lang = localStorage.getItem('lang');
var defaultLang;
if (lang) {
    defaultLang = lang;
}
else {
    defaultLang = 'vi';
}
var ECModule = /** @class */ (function () {
    function ECModule() {
    }
    ECModule = __decorate([
        core_1.NgModule({
            imports: [
                ngx_color_picker_1.ColorPickerModule,
                ngx_textarea_autosize_1.TextareaAutosizeModule,
                ej2_angular_navigations_1.ToolbarModule,
                ngx_chips_1.TagInputModule,
                ngx_pretty_checkbox_1.NgxPrettyCheckboxModule,
                ej2_angular_buttons_2.ButtonModule,
                ej2_angular_buttons_3.CheckBoxModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                ngx_spinner_1.NgxSpinnerModule,
                ec_routing_module_1.ECRoutingModule,
                ng_select_1.NgSelectModule,
                ej2_angular_dropdowns_1.DropDownListModule,
                ng_bootstrap_1.NgbModule,
                ej2_angular_charts_1.ChartAllModule,
                ej2_angular_charts_1.AccumulationChartAllModule,
                ej2_angular_charts_1.RangeNavigatorAllModule,
                ej2_angular_barcode_generator_1.BarcodeGeneratorAllModule,
                ej2_angular_barcode_generator_2.QRCodeGeneratorAllModule,
                ej2_angular_barcode_generator_1.DataMatrixGeneratorAllModule,
                ej2_angular_buttons_1.SwitchModule,
                ej2_angular_inputs_1.MaskedTextBoxModule,
                ej2_angular_calendars_1.DatePickerModule,
                ej2_angular_treegrid_1.TreeGridAllModule,
                ej2_angular_grids_1.GridAllModule,
                ej2_angular_buttons_1.RadioButtonModule,
                ej2_angular_popups_1.TooltipModule,
                kendo_angular_dateinputs_1.TimePickerModule,
                ng2_search_filter_1.Ng2SearchPipeModule,
                ej2_angular_calendars_2.DateTimePickerModule,
                core_2.TranslateModule.forChild({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_1.HttpClient]
                    },
                    defaultLanguage: defaultLang
                }),
            ],
            declarations: [
                glue_component_1.GlueComponent,
                glue_modal_component_1.GlueModalComponent,
                suppiler_component_1.SuppilerComponent,
                building_component_1.BuildingComponent,
                building_modal_component_1.BuildingModalComponent,
                building_user_component_1.BuildingUserComponent,
                account_component_1.AccountComponent,
                focus_directive_1.AutofocusDirective,
                select_text_directive_1.SelectTextDirective,
                detail_directive_1.DetailDirective,
                select_directive_1.AutoSelectDirective,
                search_directive_1.SearchDirective,
                select_qrcode_directive_1.SelectQrCodeDirective,
                schedule_detail_component_1.ScheduleDetailComponent,
                schedule_detail_workplan_component_1.ScheduleDetailWorkplanComponent,
                ink_component_1.InkComponent,
                ink_modal_component_1.InkModalComponent,
                chemical_component_1.ChemicalComponent,
                chemical_modal_component_1.ChemicalModalComponent,
                schedule_component_1.ScheduleComponent,
                schedule_status_component_1.ScheduleStatusComponent,
                treament_way_component_1.TreamentWayComponent,
                stock_component_1.StockComponent,
                print_qrcode_component_1.PrintQrcodeComponent,
                chemical_print_qrcode_component_1.ChemicalPrintQrcodeComponent,
                workplan_component_1.WorkplanComponent,
                process_component_1.ProcessComponent,
                print_qrcode_workplan_component_1.PrintQrcodeWorkplanComponent,
                print_qrcode_glue_workplan_component_1.PrintQrcodeGlueWorkplanComponent,
                totalInkModal_component_1.TotalInkModalComponent,
                totalChemicalModal_component_1.TotalChemicalModalComponent,
                setting_workplan_component_1.SettingWorkplanComponent,
                work_list_component_1.WorkListComponent,
                lunch_time_component_1.LunchTimeComponent,
                period_mixing_modal_component_1.PeriodMixingModalComponent
            ]
        })
    ], ECModule);
    return ECModule;
}());
exports.ECModule = ECModule;
