"use strict";
exports.__esModule = true;
exports.Order = exports.OrderProduct = void 0;
var OrderProduct = /** @class */ (function () {
    function OrderProduct() {
    }
    Object.defineProperty(OrderProduct.prototype, "product", {
        get: function () {
            return this._product;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrderProduct.prototype, "count", {
        get: function () {
            return this._count;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrderProduct.prototype, "price", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrderProduct.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        enumerable: false,
        configurable: true
    });
    return OrderProduct;
}());
exports.OrderProduct = OrderProduct;
var Order = /** @class */ (function () {
    function Order() {
    }
    Object.defineProperty(Order.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "time", {
        get: function () {
            return this._time;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "orderStatus", {
        get: function () {
            return this._orderStatus;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "client", {
        get: function () {
            return this._client;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "amount", {
        get: function () {
            return this._amount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "filial", {
        get: function () {
            return this._filial;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "delivery", {
        get: function () {
            return this._delivery;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "payType", {
        get: function () {
            return this._payType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "operator", {
        get: function () {
            return this._operator;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Order.prototype, "products", {
        get: function () {
            return this._products;
        },
        enumerable: false,
        configurable: true
    });
    return Order;
}());
exports.Order = Order;
