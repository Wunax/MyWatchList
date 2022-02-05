"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSchema = exports.User = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var nestjs_mongoose_exclude_1 = require("nestjs-mongoose-exclude");
var movie_schema_1 = require("../../movies/schemas/movie.schema");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true, unique: true })
    ], User.prototype, "email");
    __decorate([
        (0, mongoose_1.Prop)({ type: String, required: true }),
        (0, nestjs_mongoose_exclude_1.ExcludeProperty)()
    ], User.prototype, "password");
    __decorate([
        (0, mongoose_1.Prop)({ type: [mongoose_2.Types.ObjectId], ref: movie_schema_1.Movie.name })
    ], User.prototype, "movies");
    User = __decorate([
        (0, mongoose_1.Schema)()
    ], User);
    return User;
}());
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
