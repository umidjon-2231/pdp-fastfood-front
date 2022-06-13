"use strict";
exports.__esModule = true;
exports.Human = void 0;
var tools_1 = require("../../tools");
var Human = /** @class */ (function () {
    function Human() {
    }
    Object.defineProperty(Human.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "status", {
        get: function () {
            return this._status;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "number", {
        get: function () {
            return this._number;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "birthday", {
        get: function () {
            return (0, tools_1.parseTime)(this._birthday);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "region", {
        get: function () {
            return this._region;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "lang", {
        get: function () {
            return this._lang;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Human.prototype, "photo", {
        get: function () {
            return this._photo;
        },
        enumerable: false,
        configurable: true
    });
    return Human;
}());
exports.Human = Human;
