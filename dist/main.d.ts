import { IThread, INewPost } from "jschan-api-types";
export declare namespace jschan {
    class api {
        url: string;
        constructor(root: string);
        getThread(board_id: string, postId: number): Promise<IThread>;
        /**
         * Create a new thread or reply a thread.
         * @param board_id board id. such as "br", "g", "meta"
         * @param reply Reply object, with message, file, email etc...
         * @param postId post number, such as 55555, to use as referer. If undefined, the board will be used as referer.
         */
        postThread(board_id: string, reply: INewPost, postId?: number): Promise<void>;
        getThumbPath(): string;
        getFilesPath(): string;
        get(url: string): Promise<any>;
    }
}
