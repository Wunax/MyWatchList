"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var auth_module_1 = require("./auth/auth.module");
var users_module_1 = require("./users/users.module");
var mongoose_1 = require("@nestjs/mongoose");
var serve_static_1 = require("@nestjs/serve-static");
var path_1 = require("path");
var core_1 = require("@nestjs/core");
var auth_guard_1 = require("./auth/guards/auth.guard");
var movies_module_1 = require("./movies/movies.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({ isGlobal: true }),
                serve_static_1.ServeStaticModule.forRoot({
                    rootPath: (0, path_1.join)(__dirname, '..', 'client/dist')
                }),
                mongoose_1.MongooseModule.forRootAsync({
                    inject: [config_1.ConfigService],
                    useFactory: function (config) { return ({
                        useNewUrlParser: true,
                        uri: config.get('MONGODB_URI')
                    }); }
                }),
                auth_module_1.AuthModule,
                users_module_1.UsersModule,
                movies_module_1.MoviesModule,
            ],
            providers: [{ provide: core_1.APP_GUARD, useClass: auth_guard_1.AuthGuard }]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
