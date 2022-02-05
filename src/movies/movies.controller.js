"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.MoviesController = void 0;
var common_1 = require("@nestjs/common");
var MoviesController = /** @class */ (function () {
    function MoviesController(moviesService) {
        this.moviesService = moviesService;
    }
    MoviesController.prototype.create = function (createMovieDto, req) {
        console.log(req.user);
        return this.moviesService.create(createMovieDto);
    };
    MoviesController.prototype.findAll = function () {
        return this.moviesService.findAll();
    };
    MoviesController.prototype.findOne = function (id) {
        return this.moviesService.findOne(+id);
    };
    MoviesController.prototype.update = function (id) {
        return this.moviesService.update(+id);
    };
    MoviesController.prototype.remove = function (id) {
        return this.moviesService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.HttpCode)(201),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Req)())
    ], MoviesController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], MoviesController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], MoviesController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], MoviesController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], MoviesController.prototype, "remove");
    MoviesController = __decorate([
        (0, common_1.Controller)('movies')
    ], MoviesController);
    return MoviesController;
}());
exports.MoviesController = MoviesController;
