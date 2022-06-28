import { IThread, INewPost, IBoardList } from "jschan-api-types";
export declare namespace jschan {
    class api {
        url: string;
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
        constructor(root: string);
        /**
         * Returns a thread with all replies.
         */
        getThread(board_id: string, postId: number): Promise<IThread>;
        /**
         * Create a new thread or reply a thread.
         * @param board_id board id. such as "br", "g", "meta"
         * @param reply Reply object, with message, file, email etc...
         * @param postId post number, such as 55555, to use as referer. If undefined, the board will be used as referer.
         */
        postThread(board_id: string, reply: INewPost, postId?: number): Promise<number>;
        /**
         * Returns a list of boards, max 30 per page. Unlisted boards are not included in search results. Also return the current page and maximum page with the current search and sites parameters.
         * @returns
         */
        getBoardList(): Promise<IBoardList>;
        /**
         * Returns a list of all threads on a board.
         * @param board board id
         * @returns a list of all threads on a board
         */
        getBoardCatalog(board: string): Promise<IThread[]>;
        /**
         * Returns a string with the path to the thumbs directory.
         * @returns website.com/file/thumb/
         */
        getThumbPath(): string;
        /**
         * Returns a string with the path to the files directory.
         * @returns website.com/file/
         */
        getFilesPath(): string;
        /**
         * Returns a list of threads without replies from multiple boards. Similar to board catalog pages.
         * @returns list of threads.
         */
        getOverboardCatalog(): Promise<IThread[]>;
        /**
         * Returns a list of threads with preview replies from multiple boards. Similar to board index pages.
         * @returns list of threads with preview replies.
         */
        getOverboardIndex(): Promise<IThread[]>;
        private get;
    }
}
