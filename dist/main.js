"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jschan = void 0;
const axios_1 = __importDefault(require("axios"));
const path_1 = __importDefault(require("path"));
var jschan;
(function (jschan) {
    class api {
        constructor(root) {
            this.url = root;
        }
        async getThread(board_id, postId) {
            const t = await this.get(`${this.url}/${board_id}/thread/${postId}.json`);
            return t;
        }
        /**
         * Create a new thread or reply a thread.
         * @param board_id board id. such as "br", "g", "meta"
         * @param reply Reply object, with message, file, email etc...
         * @param postId post number, such as 55555, to use as referer. If undefined, the board will be used as referer.
         */
        async postThread(board_id, reply, postId) {
            await axios_1.default.post(`${this.url}/forms/board/${board_id}/post`, reply, { method: "POST", headers: {
                    "User-Agent": "jschan-api-sdk",
                    "Referer": postId ? path_1.default.normalize(`${this.url}/${board_id}/thread/${postId}.html`) : path_1.default.normalize(`${this.url}/${board_id}/index.html`),
                    "origin": this.url,
                    "Content-Type": "multipart/form-data"
                } })
                .then((res) => {
                console.log(res.status, res.statusText);
                console.log(``);
            }).catch((err) => {
                throw new Error("Something went wrong");
            });
        }
        getThumbPath() {
            return path_1.default.normalize(`${this.getFilesPath()}/thumb/`);
        }
        getFilesPath() {
            return path_1.default.normalize(`${this.url}/file/`);
        }
        async get(url) {
            const res = (await axios_1.default.get(url, { headers: {
                    "User-Agent": "jschan-api-sdk",
                    "origin": this.url
                } })).data;
            return res;
        }
    }
    jschan.api = api;
})(jschan = exports.jschan || (exports.jschan = {}));
