"use strict";
exports.__esModule = true;
exports.HumanType = exports.Language = exports.Region = exports.HumanStatus = exports.PayType = exports.ORDER_STATUS = void 0;
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS["NEW"] = "NEW";
    ORDER_STATUS["CLOSED"] = "CLOSED";
    ORDER_STATUS["SENT"] = "SENT";
    ORDER_STATUS["ACCEPTED"] = "ACCEPTED";
})(ORDER_STATUS = exports.ORDER_STATUS || (exports.ORDER_STATUS = {}));
var PayType;
(function (PayType) {
    PayType["CASH"] = "CASH";
    PayType["PAYME"] = "PAYME";
    PayType["CLICK"] = "CLICK";
})(PayType = exports.PayType || (exports.PayType = {}));
var HumanStatus;
(function (HumanStatus) {
    HumanStatus["BLOCKED"] = "BLOCKED";
    HumanStatus["ACTIVE"] = "ACTIVE";
    HumanStatus["DELETED"] = "DELETED";
})(HumanStatus = exports.HumanStatus || (exports.HumanStatus = {}));
var Region;
(function (Region) {
    Region["TASHKENT"] = "TASHKENT";
    Region["TASHKENT_REGION"] = "TASHKENT_REGION";
    Region["SAMARKAND"] = "SAMARKAND";
    Region["BUKHARA"] = "BUKHARA";
})(Region = exports.Region || (exports.Region = {}));
var Language;
(function (Language) {
    Language["RUSSIA"] = "RUSSIAN";
    Language["UZBEK"] = "UZBEK";
})(Language = exports.Language || (exports.Language = {}));
var HumanType;
(function (HumanType) {
    HumanType["ADMIN"] = "ADMIN";
    HumanType["CLIENT"] = "CLIENT";
    HumanType["OPERATOR"] = "OPERATOR";
    HumanType["COURIER"] = "COURIER";
})(HumanType = exports.HumanType || (exports.HumanType = {}));
