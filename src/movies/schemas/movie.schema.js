"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MovieSchema = exports.Movie = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var Movie = /** @class */ (function () {
    function Movie() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: Number, required: true })
    ], Movie.prototype, "idTmdb");
    __decorate([
        (0, mongoose_1.Prop)({ type: Boolean, "default": false })
    ], Movie.prototype, "seen");
    Movie = __decorate([
        (0, mongoose_1.Schema)()
    ], Movie);
    return Movie;
}());
exports.Movie = Movie;
exports.MovieSchema = mongoose_1.SchemaFactory.createForClass(Movie);
