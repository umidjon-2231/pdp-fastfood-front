"use strict";
exports.__esModule = true;
exports.Category = void 0;
var Category = /** @class */ (function () {
    function Category() {
    }
    Object.defineProperty(Category.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: false,
        configurable: true
    });
    return Category;
}());
exports.Category = Category;
