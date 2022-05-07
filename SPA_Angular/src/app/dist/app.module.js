"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = exports.HttpLoaderFactory = exports.tokenGetter = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var angular_jwt_1 = require("@auth0/angular-jwt");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var layout_component_1 = require("./views/layout/layout/layout.component");
var header_component_1 = require("./views/layout/header/header.component");
var footer_component_1 = require("./views/layout/footer/footer.component");
var breadcrumb_component_1 = require("./views/layout/breadcrumb/breadcrumb.component");
var login_component_1 = require("./views/login/login.component");
var p404_component_1 = require("./views/p404/p404.component");
var p500_component_1 = require("./views/p500/p500.component");
// service
var alertify_service_1 = require("./_core/_service/alertify.service");
var auth_service_1 = require("./_core/_service/auth.service");
var auth_guard_1 = require("./_core/_guards/auth.guard");
var ngx_spinner_1 = require("ngx-spinner");
// handle err
var error_interceptor_1 = require("./_core/_service/error.interceptor");
function tokenGetter() {
    return localStorage.getItem('token');
}
exports.tokenGetter = tokenGetter;
// resolvers
var ej2_angular_dropdowns_1 = require("@syncfusion/ej2-angular-dropdowns");
var ej2_angular_dropdowns_2 = require("@syncfusion/ej2-angular-dropdowns");
var animations_1 = require("@angular/platform-browser/animations");
var safe_pipe_1 = require("safe-pipe");
// module
var ngx_moment_1 = require("ngx-moment");
var ngx_infinite_scroll_1 = require("ngx-infinite-scroll");
var user_resolvers_1 = require("./_core/_resolvers/user.resolvers");
var basic_auth_interceptor_1 = require("./_core/_helper/basic-auth.interceptor");
var role_resolvers_1 = require("./_core/_resolvers/role.resolvers");
var angular_mentions_1 = require("angular-mentions");
var ej2_angular_inputs_1 = require("@syncfusion/ej2-angular-inputs");
var ngx_image_cropper_1 = require("ngx-image-cropper");
var avatar_modal_component_1 = require("./views/layout/header/avatar-modal/avatar-modal.component");
var preview_modal_component_1 = require("./views/layout/header/preview-modal/preview-modal.component");
var glue_resolver_1 = require("./_core/_resolvers/glue.resolver");
var http_2 = require("@angular/common/http");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                layout_component_1.LayoutComponent,
                header_component_1.HeaderComponent,
                footer_component_1.FooterComponent,
                breadcrumb_component_1.BreadcrumbComponent,
                login_component_1.LoginComponent,
                p404_component_1.P404Component,
                p500_component_1.P500Component,
                avatar_modal_component_1.AvatarModalComponent,
                preview_modal_component_1.PreviewModalComponent,
            ],
            imports: [
                ngx_spinner_1.NgxSpinnerModule,
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                common_1.CommonModule,
                ej2_angular_dropdowns_1.MultiSelectAllModule,
                ej2_angular_dropdowns_1.DropDownListAllModule,
                ej2_angular_dropdowns_2.MultiSelectModule,
                http_1.HttpClientModule,
                safe_pipe_1.SafePipeModule,
                ngx_moment_1.MomentModule,
                ngx_infinite_scroll_1.InfiniteScrollModule,
                angular_mentions_1.MentionModule,
                ngx_image_cropper_1.ImageCropperModule,
                ej2_angular_inputs_1.UploaderModule,
                core_2.TranslateModule.forRoot({
                    loader: {
                        provide: core_2.TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [http_2.HttpClient]
                    },
                    defaultLanguage: 'vi'
                }),
                angular_jwt_1.JwtModule.forRoot({
                    config: {
                        tokenGetter: tokenGetter
                    }
                })
            ],
            providers: [
                alertify_service_1.AlertifyService,
                auth_guard_1.AuthGuard,
                ngx_spinner_1.NgxSpinnerService,
                error_interceptor_1.ErrorInterceptorProvider,
                user_resolvers_1.UserResolver,
                role_resolvers_1.RoleResolver,
                auth_service_1.AuthService,
                glue_resolver_1.GlueResolver,
                { provide: http_1.HTTP_INTERCEPTORS, useClass: basic_auth_interceptor_1.BasicAuthInterceptor, multi: true }
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
