"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.custom = void 0;
var custom;
(function (custom) {
    function Thread(thread) {
        let CT = Object.create(thread);
        CT.filter = (filter) => {
            throw new Error("Not yet implemented");
        };
        CT.getAllFiles = () => {
            let files = [];
            CT.files.forEach((f) => {
                files.push(f);
            });
            CT.replies.forEach((r) => {
                r.files.forEach((f) => {
                    files.push(f);
                });
            });
            return files;
        };
        return CT;
    }
    custom.Thread = Thread;
})(custom = exports.custom || (exports.custom = {}));
