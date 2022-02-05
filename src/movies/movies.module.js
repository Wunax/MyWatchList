"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MoviesModule = void 0;
var common_1 = require("@nestjs/common");
var movies_service_1 = require("./movies.service");
var movies_controller_1 = require("./movies.controller");
var mongoose_1 = require("@nestjs/mongoose");
var movie_schema_1 = require("./schemas/movie.schema");
var axios_1 = require("@nestjs/axios");
var MoviesModule = /** @class */ (function () {
    function MoviesModule() {
    }
    MoviesModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: movie_schema_1.Movie.name, schema: movie_schema_1.MovieSchema }]),
                axios_1.HttpModule,
            ],
            controllers: [movies_controller_1.MoviesController],
            providers: [movies_service_1.MoviesService]
        })
    ], MoviesModule);
    return MoviesModule;
}());
exports.MoviesModule = MoviesModule;
