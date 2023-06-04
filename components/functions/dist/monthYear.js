"use strict";
exports.__esModule = true;
var monthYear = function () {
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
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = months[d.getUTCMonth()];
    return month + " " + year;
};
exports["default"] = monthYear;
