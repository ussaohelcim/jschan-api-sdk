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
        /**
         * Creates a new api sdk.
         * Please remove the last '/' from the url.
         * 	Ex:
         * 	  https://ptchan.org   < RIGHT
         * 	  https://fatchan.org/  < WRONG
         * ```js
         * const api = new jschan.api("https://ptchan.org")
         * ```
         * @param root the root path of a jschan instance
         */
        constructor(root) {
            this.url = root;
        }
        /**
         * Returns a thread with all replies.
         */
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
            let resCode = 0;
            await axios_1.default.post(`${this.url}/forms/board/${board_id}/post`, reply, { method: "POST", headers: {
                    "User-Agent": "jschan-api-sdk",
                    "Referer": postId ? path_1.default.normalize(`${this.url}/${board_id}/thread/${postId}.html`) : path_1.default.normalize(`${this.url}/${board_id}/index.html`),
                    "origin": this.url,
                    "Content-Type": "multipart/form-data"
                } })
                .then((res) => {
                resCode = res.status;
            }).catch((err) => {
                throw new Error("Something went wrong");
            });
            return resCode;
        }
        /**
         * Returns a list of boards, max 30 per page. Unlisted boards are not included in search results. Also return the current page and maximum page with the current search and sites parameters.
         * @returns
         */
        async getBoardList() {
            //TODO implement queries
            const boards = await this.get(`${this.url}/boards.json`);
            return boards;
        }
        /**
         * Returns a list of all threads on a board.
         * @param board board id
         * @returns a list of all threads on a board
         */
        async getBoardCatalog(board) {
            let catalog = await this.get(`${this.url}/${board}/catalog.json`);
            return catalog;
        }
        /**
         * Returns a string with the path to the thumbs directory.
         * @returns website.com/file/thumb/
         */
        getThumbPath() {
            return `${this.getFilesPath()}/thumb/`;
        }
        /**
         * Returns a string with the path to the files directory.
         * @returns website.com/file/
         */
        getFilesPath() {
            return `${this.url}/file/`;
        }
        /**
         * Returns a list of threads without replies from multiple boards. Similar to board catalog pages.
         * @returns list of threads.
         */
        async getOverboardCatalog() {
            const catalog = await this.get(`${this.url}/catalog.json`);
            return catalog;
        }
        /**
         * Returns a list of threads with preview replies from multiple boards. Similar to board index pages.
         * @returns list of threads with preview replies.
         */
        async getOverboardIndex() {
            //
            const catalog = await this.get(`${this.url}/overboard.json`);
            return catalog;
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
