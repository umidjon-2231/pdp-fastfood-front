"use strict";
exports.__esModule = true;
exports.Delivery = void 0;
var Delivery = /** @class */ (function () {
    function Delivery() {
    }
    Object.defineProperty(Delivery.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Delivery.prototype, "longitude", {
        get: function () {
            return this._longitude;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Delivery.prototype, "latitude", {
        get: function () {
            return this._latitude;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Delivery.prototype, "address", {
        get: function () {
            return this._address;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Delivery.prototype, "courier", {
        get: function () {
            return this._courier;
        },
        enumerable: false,
        configurable: true
    });
    return Delivery;
}());
exports.Delivery = Delivery;
