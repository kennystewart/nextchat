"use strict";
exports.__esModule = true;
var Currency = function (string) {
    var arr = string.split(",");
    var cur = "";
    arr.forEach(function (i) {
        var t = "";
        if (i == "1") {
            t = "\u0024";
        }
        else if (i == "2") {
            t = "\u20AC";
        }
        else if (i == "3") {
            t = "\u00A3";
        }
        else if (i == "4") {
            t = "\u20BF"; // BTC
        }
        else if (i == "5") {
            t = "R"; // Rand
        }
        else if (i == "6") {
            t = "m\u20BF"; // mBTC
        }
        else if (i == "7") {
            t = "FUN";
        }
        cur = cur + "/" + t;
    });
    var str = cur.substring(1);
    return str;
};
exports["default"] = Currency;
