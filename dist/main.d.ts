import { IThread, INewPost, IBoardList, IBoardQuery, IOverboardQuery, IFile, IPost, IOverboardIndex, IPostAction } from "jschan-api-types";
export declare namespace jschan {
    class api {
        url: string;
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
        postThread(board_id: string, reply: INewPost): Promise<number>;
        /**
         * Returns a list of boards, max 30 per page. Unlisted boards are not included in search results. Also return the current page and maximum page with the current search and sites parameters.
         * @returns
         */
        getBoardList(query?: IBoardQuery): Promise<IBoardList>;
        /**
         * Returns a list of all threads on a board.
         * @param board board id
         * @returns a list of all threads on a board
         */
        getBoardCatalog(board: string): Promise<IPost[]>;
        /**
         * Returns a list of threads with preview replies from a page of a board.
         * @param board Board tag.
         * @param pageNumber Optional. If undefined returns the index page.
         * @returns
         */
        getBoardPage(board: string, pageNumber?: number): Promise<IThread[]>;
        getM3uPlaylistFrom(thread: IThread): string;
        /**
         * Returns a list of threads without replies from multiple boards. Similar to board catalog pages.
         * @returns list of threads.
         */
        getOverboardCatalog(query?: IOverboardQuery): Promise<IPost[]>;
        /**
         * Returns a list of threads with preview replies from multiple boards. Similar to board index pages.
         * @returns list of threads with preview replies.
         */
        getOverboardIndex(query?: IOverboardQuery): Promise<IOverboardIndex>;
        /**@deprecated not yed implemented */
        login(username: string, password: string): Promise<void>;
        /**
         *
         * @returns
         */
        getCaptcha(): Promise<{
            imageUrl: string;
            cookie: string;
        }>;
        /**
         * Returns a string with the path to the thumbs directory.
         * @returns website.com/file/thumb/
         */
        getThumbPath(file: IFile): string;
        /**
         * Returns a string with the path to the files directory.
         * @returns website.com/file/
         */
        getFilesPath(): string;
        /**
         * @todo Fix
         * @deprecated This isnt working.
         * @param thread
         * @param postAction
         * @returns
         */
        action(thread: IThread, postAction: IPostAction, cookie: string): Promise<number>;
        private get;
    }
}
