"use strict";
exports.__esModule = true;
exports.Filial = void 0;
var tools_1 = require("../../tools");
var Filial = /** @class */ (function () {
    function Filial() {
    }
    Object.defineProperty(Filial.prototype, "start", {
        get: function () {
            return (0, tools_1.parseTime)(this._start);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filial.prototype, "address", {
        get: function () {
            return this._address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filial.prototype, "end", {
        get: function () {
            return (0, tools_1.parseTime)(this._end);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filial.prototype, "intended", {
        get: function () {
            return this._intended;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filial.prototype, "nameRu", {
        get: function () {
            return this._nameRu;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filial.prototype, "nameUz", {
        get: function () {
            return this._nameUz;
        },
        enumerable: false,
        configurable: true
    });
    return Filial;
}());
exports.Filial = Filial;
