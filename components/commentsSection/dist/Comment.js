"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var DisplayDate_1 = require("../functions/DisplayDate");
var UpvoteIcon_1 = require("../common/UpvoteIcon");
var DownvoteIcon_1 = require("../common/DownvoteIcon");
var AnnotationIcon_1 = require("../common/AnnotationIcon");
var Comments = function (comments) {
    var commentsLoop = comments.comments;
    //console.log(comments); update
    var style = {
        profileImage: "object-contain",
        profileImageContainer: "h-[1.2rem] w-[1.2rem] overflow-hidden rounded-full relative",
        postInfoContainer: "flex gap-[.4rem]",
        icon: "text-[#818384]",
        icons: "flex flex-row items-center gap-[.4rem]",
        commentContainer: "my-[1rem] flex flex-col gap-[1rem]",
        commentsWrapper: "bg-[#1A1A1B] p-4",
        reply: "flex items-center gap-[.2rem] text-[#818384]"
    };
    var auth = "Author";
    var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAHVJREFUKFNjrKura/j06RP/+/fvBT5+/CiATjP29/cXgCQ+fPjA/+HDBxCNghnnzp2b8OnTJ7BOZJNgChnXr18fAONgM4lx9+7dDl++fBF49+4dyAQMkxjPnz9vgG4vskmM9+/fV0BWgG4SI8hx2FwPEgOZBACHNbSCBLKzegAAAABJRU5ErkJggg==";
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: style.commentsWrapper }, commentsLoop && commentsLoop.map(function (comment, id) {
            var _a, _b, _c, _d, _e;
            return (React.createElement("div", { key: comment.id, className: style.commentContainer },
                React.createElement("div", { className: style.postInfoContainer },
                    React.createElement("div", { className: style.profileImageContainer },
                        React.createElement(image_1["default"], { src: (_b = (_a = comment.author) === null || _a === void 0 ? void 0 : _a.image) !== null && _b !== void 0 ? _b : img, className: style.profileImage, alt: (_c = comment.author.name) !== null && _c !== void 0 ? _c : auth, fill: true })),
                    React.createElement("span", null, (_e = (_d = comment.author) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : auth),
                    React.createElement("span", null, "\u2022"),
                    React.createElement("span", null, DisplayDate_1["default"](comment.createdAt))),
                React.createElement("div", null, comment.content),
                React.createElement("div", { className: style.icons },
                    React.createElement("span", { className: style.icon },
                        React.createElement(UpvoteIcon_1.UpvoteIcon, null)),
                    React.createElement("span", null, "0"),
                    React.createElement("span", { className: style.icon },
                        React.createElement(DownvoteIcon_1.DownvoteIcon, null)),
                    React.createElement("span", { className: style.reply },
                        React.createElement(AnnotationIcon_1.AnnotationIcon, null),
                        React.createElement("span", null, "Reply")),
                    React.createElement("span", { className: style.icon }, "Give"),
                    React.createElement("span", { className: style.icon }, "Share"))));
        }))));
};
exports["default"] = Comments;
