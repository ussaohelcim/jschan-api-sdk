"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jschan = void 0;
const axios_1 = __importDefault(require("axios"));
const url_1 = require("url");
const custom_1 = require("./custom");
var jschan;
(function (jschan) {
    class api {
        /**
         * Creates a new api sdk.
         * Please remove the last '/' from the url.
         * 	Ex:
         * 	  https://ptchan.org   < RIGHT
         * 	  https://fatchan.org/  < **WRONG**
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
        async postThread(board_id, reply) {
            let resCode = 0;
            await axios_1.default.post(`${this.url}/forms/board/${board_id}/post`, reply, {
                method: "POST",
                headers: {
                    "User-Agent": "jschan-api-sdk",
                    "Referer": this.url,
                    "origin": this.url,
                    "Content-Type": "multipart/form-data"
                },
            })
                .then((res) => {
                resCode = res.status;
            }).catch((err) => {
                resCode = err.response.status;
            });
            return resCode;
        }
        /**
         * Returns a list of boards, max 30 per page. Unlisted boards are not included in search results. Also return the current page and maximum page with the current search and sites parameters.
         * @returns
         */
        async getBoardList(query) {
            //TODO implement queries
            const boards = await this.get(`${this.url}/boards.json`, query ? new url_1.URLSearchParams(Object.entries(query)) : undefined);
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
         * Returns a list of threads with preview replies from a page of a board.
         * @param board Board tag.
         * @param pageNumber Optional. If undefined returns the index page.
         * @returns
         */
        async getBoardPage(board, pageNumber) {
            let catalog = await this.get(`${this.url}/${board}/${pageNumber ?? 'index'}.json`);
            return catalog;
        }
        getM3uPlaylistFrom(thread) {
            const fyleTypes = [".webm", ".mp4", ".mp3"];
            const lines = [];
            let files = custom_1.custom.Thread(thread).getAllFiles();
            lines.push("#EXTM3U");
            for (let i = 0; i < files.length; i++) {
                const media = files[i];
                if (fyleTypes.includes(media.extension)) {
                    lines.push(`#EXTINF:${media.duration}, ${media.filename}`);
                    lines.push(`${this.url}/file/${media.filename}`);
                }
            }
            return lines.join('\n');
        }
        /**
         * Returns a list of threads without replies from multiple boards. Similar to board catalog pages.
         * @returns list of threads.
         */
        async getOverboardCatalog(query) {
            // const params = new URLSearchParams(query ?? '')
            const catalog = await this.get(`${this.url}/catalog.json`, query ? new url_1.URLSearchParams(Object.entries(query)) : undefined);
            return catalog;
        }
        /**
         * Returns a list of threads with preview replies from multiple boards. Similar to board index pages.
         * @returns list of threads with preview replies.
         */
        async getOverboardIndex(query) {
            const catalog = await this.get(`${this.url}/overboard.json`, query ? new url_1.URLSearchParams(Object.entries(query)) : undefined);
            return catalog;
        }
        /**@deprecated not yed implemented */
        async login(username, password) {
            //TODO get a session cookie
            throw new Error("Not yet implemented. 3==D");
        }
        /**
         *
         * @returns
         */
        async getCaptcha() {
            let r = await axios_1.default.get(`${this.url}/captcha`);
            let reqPath = r.request.path;
            let imgPath = `${this.url}${reqPath}`;
            let cookie = `captchaid=${reqPath.replace('/captcha/', '').replace('.jpg', '')}`;
            return {
                imageUrl: imgPath,
                cookie: cookie
            };
        }
        /**
         * Returns a string with the path to the thumbs directory.
         * @returns website.com/file/thumb/
         */
        getThumbPath(file) {
            return `${this.getFilesPath()}/thumb/${file.filename}`;
        }
        /**
         * Returns a string with the path to the files directory.
         * @returns website.com/file/
         */
        getFilesPath() {
            return `${this.url}/file/`;
        }
        /**
         * @todo Fix
         * @deprecated This isnt working.
         * @param thread
         * @param postAction
         * @returns
         */
        async action(thread, postAction, cookie) {
            let resCode = 0;
            await axios_1.default.post(`${this.url}/forms/board/${thread.board}/actions`, 
            // Object.entries(postAction),
            {
                method: "POST",
                headers: {
                    "User-Agent": "jschan-api-sdk",
                    "Referer": this.url,
                    "origin": this.url,
                    "Content-Type": "multipart/form-data",
                    'Cookie': cookie,
                    'x-using-xhr': true,
                    'x-using-live': true
                },
                withCredentials: true,
                data: postAction
            })
                .then((res) => {
                resCode = res.status;
            }).catch((err) => {
                resCode = Number(err.response.status);
            });
            return resCode;
        }
        async get(url, params) {
            const res = (await axios_1.default.get(url, {
                headers: {
                    "User-Agent": "jschan-api-sdk",
                    "origin": this.url
                },
                params: params ?? ''
            })).data;
            return res;
        }
    }
    jschan.api = api;
})(jschan = exports.jschan || (exports.jschan = {}));
