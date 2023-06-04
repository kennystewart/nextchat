"use strict";
exports.__esModule = true;
var DisplayDate = function (date) {
    var months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    var d = date.date;
    try {
        d.getUTCFullYear();
    }
    catch (e) {
        return 'error';
    }
    var year = d.getUTCFullYear();
    var month = months[d.getUTCMonth()];
    var day = d.getUTCDay();
    return month + ", " + day + " " + year;
};
exports["default"] = DisplayDate;
