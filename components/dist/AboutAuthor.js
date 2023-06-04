"use strict";
exports.__esModule = true;
var react_1 = require("react");
var fc_1 = require("react-icons/fc");
var ri_1 = require("react-icons/ri");
var ai_1 = require("react-icons/ai");
var Author = function (props) {
    return (react_1["default"].createElement("div", { id: "author", className: "flex flex-col border border-gray-200 p-3 rounded-lg" },
        react_1["default"].createElement("h5", { className: "text-base" }, "ABOUT THE AUTHOR"),
        react_1["default"].createElement("div", { className: "flex items-center" },
            react_1["default"].createElement("div", null,
                react_1["default"].createElement(fc_1.FcBusinessman, { className: "text-6xl" })),
            react_1["default"].createElement("div", { className: "flex flex-col" },
                react_1["default"].createElement("h5", { className: "text-3xl" }, props.data.author),
                react_1["default"].createElement("div", { className: "flex text-sm space-x-4 my-2" },
                    react_1["default"].createElement("span", { className: "flex items-center" },
                        react_1["default"].createElement(ri_1.RiMailLine, null),
                        "Email"),
                    react_1["default"].createElement("span", { className: "flex items-center" },
                        react_1["default"].createElement(ai_1.AiFillLinkedin, null),
                        "Linkedin")))),
        react_1["default"].createElement("p", { className: "my-6" }, props.data.authorText)));
};
exports["default"] = Author;
