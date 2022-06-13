"use strict";
exports.__esModule = true;
exports.Attachment = void 0;
var Attachment = /** @class */ (function () {
    function Attachment() {
    }
    Object.defineProperty(Attachment.prototype, "url", {
        get: function () {
            return this._url;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Attachment.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Attachment.prototype, "size", {
        get: function () {
            return this._size;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Attachment.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    return Attachment;
}());
exports.Attachment = Attachment;
