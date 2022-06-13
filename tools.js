"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.logout = exports.webSocketConnection = exports.sleep = exports.parseTime = exports.checkToken = exports.getToken = exports.getCookie = exports.setCookie = void 0;
var axios_1 = require("axios");
var react_toastify_1 = require("react-toastify");
function setCookie(cname, cvalue, maxAge) {
    var d = new Date();
    d.setTime(d.getTime() + (maxAge * 1000));
    var expires = "expires=" + d.toUTCString();
    if (maxAge === 0) {
        expires = 'Thu, 01 Jan 1970 00:00:00 UTC';
    }
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
exports.setCookie = setCookie;
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
exports.getCookie = getCookie;
function getToken() {
    var _a, _b;
    return (_b = (_a = localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem("token")) !== null && _a !== void 0 ? _a : getCookie("token")) !== null && _b !== void 0 ? _b : "";
}
exports.getToken = getToken;
function checkToken(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var token, req, res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    token = void 0;
                    if (ctx.req) {
                        token = ctx.req['cookies'].token;
                    }
                    else {
                        token = localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem("token");
                        if (token === null) {
                            token = getCookie("token");
                        }
                    }
                    return [4 /*yield*/, axios_1["default"].get(process.env.NEXT_PUBLIC_SERVER_URL + "client/me", {
                            headers: {
                                "Accept": "application/json",
                                "Authorization": 'Bearer ' + token
                            }
                        })];
                case 1:
                    req = _a.sent();
                    if (req.status === 200) {
                        res = req.data;
                        return [2 /*return*/, {
                                props: {
                                    user: res.data,
                                    token: token
                                },
                                success: true
                            }];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    return [3 /*break*/, 3];
                case 3:
                    if (ctx.req) {
                        ctx.res.writeHead(302, { Location: '/' }).end();
                    }
                    else {
                        window.location.href = '/';
                    }
                    return [2 /*return*/, { success: false }];
            }
        });
    });
}
exports.checkToken = checkToken;
function parseTime(time) {
    return new Date(time);
}
exports.parseTime = parseTime;
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
exports.sleep = sleep;
function webSocketConnection(errorCallback, headers, afterConnect) {
    if (errorCallback === void 0) { errorCallback = function () {
        if (react_toastify_1.toast.isActive("websocket_default_error")) {
            react_toastify_1.toast.error("Error websocket connection! Try to reload page", {
                toastId: "websocket_default_error"
            });
        }
    }; }
    if (headers === void 0) { headers = {}; }
    if (afterConnect === void 0) { afterConnect = function () {
    }; }
    return __awaiter(this, void 0, void 0, function () {
        var socket, stompClient, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    socket = new SockJS(process.env.NEXT_PUBLIC_SERVER_URL + 'ws');
                    stompClient = Stomp.over(socket);
                    error = false;
                    if (process.env.NODE_ENV === "production") {
                        stompClient.debug = false;
                    }
                    stompClient.connect(__assign({ Authorization: getToken() }, headers), afterConnect, function (e) {
                        error = true;
                        if (errorCallback) {
                            errorCallback();
                        }
                    });
                    _a.label = 1;
                case 1:
                    if (!(!stompClient.connected && !error)) return [3 /*break*/, 3];
                    return [4 /*yield*/, sleep(100)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, stompClient];
            }
        });
    });
}
exports.webSocketConnection = webSocketConnection;
function logout() {
    localStorage.removeItem("token");
    setCookie("token", "", -1);
    window.location.href = '/';
}
exports.logout = logout;
