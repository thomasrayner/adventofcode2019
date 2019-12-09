"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var fs = require('fs');
var fileName = "C:\\temp\\day7.txt";
var fileContents = fs.readFileSync(fileName, 'utf-8');
var tapeString = fileContents.split(',');
var tape = tapeString.map(Number);
function day7(inTape, userInput) {
    var runTape = __spread(inTape);
    var index = 0;
    var scoopOver = new Map([[1, 4], [2, 4], [3, 2], [4, 2], [5, 3], [6, 3], [7, 4], [8, 4], [99, 0]]);
    var inputGiven = false;
    while (true) {
        var scoop = 0;
        var pointerChanged = false;
        var rawOpcode = runTape[index].toString();
        var opcode = parseInt(rawOpcode);
        var parameterMode = false; // 0 = position mode
        var a = b = c = 0;
        if (opcode > 100) {
            parameterMode = true; // immediate mode
            opcode = parseInt(rawOpcode.substring((rawOpcode.length - 2)));
            var c = rawOpcode.length >= 3 ? parseInt(rawOpcode.substring((rawOpcode.length - 3), (rawOpcode.length - 2))) : 0;
            var b = rawOpcode.length >= 4 ? parseInt(rawOpcode.substring((rawOpcode.length - 4), (rawOpcode.length - 3))) : 0;
            var a = rawOpcode.length >= 5 ? parseInt(rawOpcode.substring((rawOpcode.length - 5), (rawOpcode.length - 4))) : 0;
        }
        scoop = scoopOver.get(opcode);
        if (opcode == 99) {
            break;
        }
        var inputOneIndex = (parameterMode && c == 1) ? index + 1 : runTape[index + 1];
        var inputTwoIndex = 0; // need to initialize, won't be used in this state
        if ([1, 2, 3, 4, 5, 6, 7, 8].indexOf(opcode) > -1) {
            inputTwoIndex = (parameterMode && b == 1) ? index + 2 : runTape[index + 2];
        }
        if ([1, 2, 7, 8].indexOf(opcode) > -1) {
            // params that have an instruction writes to will never be in immediate mode
            var outputIndex = tape[index + 3];
        }
        switch (opcode % 10) {
            case 1: {
                // add
                runTape[outputIndex] = runTape[inputOneIndex] + runTape[inputTwoIndex];
                break;
            }
            case 2: {
                // multiply
                runTape[outputIndex] = runTape[inputOneIndex] * runTape[inputTwoIndex];
                break;
            }
            case 3: {
                // input
                runTape[runTape[index + 1]] = inputGiven ? userInput[1] : userInput[0]; //userInput.shift() as number;
                inputGiven = true;
                break;
            }
            case 4: {
                // output
                if (runTape[inputOneIndex] != 0) {
                    return runTape[inputOneIndex];
                }
                break;
            }
            case 5: {
                // jump-if-true
                if (runTape[inputOneIndex] != 0) {
                    pointerChanged = true;
                    index = runTape[inputTwoIndex];
                }
                break;
            }
            case 6: {
                // jump-if-false
                if (runTape[inputOneIndex] === 0) {
                    pointerChanged = true;
                    index = runTape[inputTwoIndex];
                }
                break;
            }
            case 7: {
                // less-than
                runTape[outputIndex] = (runTape[inputOneIndex] < runTape[inputTwoIndex]) ? 1 : 0;
                break;
            }
            case 8: {
                // equals
                runTape[outputIndex] = (runTape[inputOneIndex] == runTape[inputTwoIndex]) ? 1 : 0;
                break;
            }
        }
        if (!pointerChanged) {
            index = index + scoop;
        }
    }
    return 0;
}
function combinations(from, to) {
    function settings(ignore) {
        var _loop_1, i;
        if (ignore === void 0) { ignore = []; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _loop_1 = function (i) {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(ignore.findIndex(function (ti) { return ti === i; }) === -1)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, i];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    };
                    i = from;
                    _a.label = 1;
                case 1:
                    if (!(i <= to)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    }
    var _a, _b, a, _c, _d, b, _e, _f, c, _g, _h, d, _j, _k, e, e_1_1, e_2_1, e_3_1, e_4_1, e_5_1;
    var e_5, _l, e_4, _m, e_3, _o, e_2, _p, e_1, _q;
    return __generator(this, function (_r) {
        switch (_r.label) {
            case 0:
                _r.trys.push([0, 29, 30, 31]);
                _a = __values(settings()), _b = _a.next();
                _r.label = 1;
            case 1:
                if (!!_b.done) return [3 /*break*/, 28];
                a = _b.value;
                _r.label = 2;
            case 2:
                _r.trys.push([2, 25, 26, 27]);
                _c = (e_4 = void 0, __values(settings([a]))), _d = _c.next();
                _r.label = 3;
            case 3:
                if (!!_d.done) return [3 /*break*/, 24];
                b = _d.value;
                _r.label = 4;
            case 4:
                _r.trys.push([4, 21, 22, 23]);
                _e = (e_3 = void 0, __values(settings([a, b]))), _f = _e.next();
                _r.label = 5;
            case 5:
                if (!!_f.done) return [3 /*break*/, 20];
                c = _f.value;
                _r.label = 6;
            case 6:
                _r.trys.push([6, 17, 18, 19]);
                _g = (e_2 = void 0, __values(settings([a, b, c]))), _h = _g.next();
                _r.label = 7;
            case 7:
                if (!!_h.done) return [3 /*break*/, 16];
                d = _h.value;
                _r.label = 8;
            case 8:
                _r.trys.push([8, 13, 14, 15]);
                _j = (e_1 = void 0, __values(settings([a, b, c, d]))), _k = _j.next();
                _r.label = 9;
            case 9:
                if (!!_k.done) return [3 /*break*/, 12];
                e = _k.value;
                return [4 /*yield*/, [a, b, c, d, e]];
            case 10:
                _r.sent();
                _r.label = 11;
            case 11:
                _k = _j.next();
                return [3 /*break*/, 9];
            case 12: return [3 /*break*/, 15];
            case 13:
                e_1_1 = _r.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 15];
            case 14:
                try {
                    if (_k && !_k.done && (_q = _j.return)) _q.call(_j);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 15:
                _h = _g.next();
                return [3 /*break*/, 7];
            case 16: return [3 /*break*/, 19];
            case 17:
                e_2_1 = _r.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 19];
            case 18:
                try {
                    if (_h && !_h.done && (_p = _g.return)) _p.call(_g);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 19:
                _f = _e.next();
                return [3 /*break*/, 5];
            case 20: return [3 /*break*/, 23];
            case 21:
                e_3_1 = _r.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 23];
            case 22:
                try {
                    if (_f && !_f.done && (_o = _e.return)) _o.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 23:
                _d = _c.next();
                return [3 /*break*/, 3];
            case 24: return [3 /*break*/, 27];
            case 25:
                e_4_1 = _r.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 27];
            case 26:
                try {
                    if (_d && !_d.done && (_m = _c.return)) _m.call(_c);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 27:
                _b = _a.next();
                return [3 /*break*/, 1];
            case 28: return [3 /*break*/, 31];
            case 29:
                e_5_1 = _r.sent();
                e_5 = { error: e_5_1 };
                return [3 /*break*/, 31];
            case 30:
                try {
                    if (_b && !_b.done && (_l = _a.return)) _l.call(_a);
                }
                finally { if (e_5) throw e_5.error; }
                return [7 /*endfinally*/];
            case 31: return [2 /*return*/];
        }
    });
}
function findHighestSignal1(newTape) {
    var e_6, _a;
    var program = Object.assign([], newTape);
    ;
    var max = 0;
    try {
        for (var _b = __values(combinations(0, 4)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 5), a = _d[0], b = _d[1], c = _d[2], d = _d[3], e = _d[4];
            var oa = day7(program, [a, 0]);
            var ob = day7(program, [b, oa]);
            var oc = day7(program, [c, ob]);
            var od = day7(program, [d, oc]);
            var oe = day7(program, [e, od]);
            if (oe > max) {
                max = oe;
            }
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return max;
}
;
function findHighestSignal2(newTape) {
    var e_7, _a;
    var program = Object.assign([], newTape);
    ;
    var max = 0;
    try {
        for (var _b = __values(combinations(5, 9)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 5), a = _d[0], b = _d[1], c = _d[2], d = _d[3], e = _d[4];
            var oa = day7(program, [a, 0]);
            var ob = day7(program, [b, oa]);
            var oc = day7(program, [c, ob]);
            var od = day7(program, [d, oc]);
            var oe = day7(program, [e, od]);
            if (oe > max) {
                max = oe;
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return max;
}
;
var highest1 = findHighestSignal1(tape);
console.log("Pt 1: " + highest1);
var highest2 = findHighestSignal2(tape);
console.log("Pt 2: " + highest2);
//# sourceMappingURL=main.js.map