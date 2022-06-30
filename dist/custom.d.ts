import { IThread, IFilter, IFile } from "jschan-api-types";
export declare namespace custom {
    function Thread(thread: IThread): ICustomThread;
}
interface ICustomThread extends IThread {
    /**
     * @todo
     * @deprecated
     * @param filter
     * @returns a thread without the filtered stuff.
     */
    filter(filter: IFilter): IThread;
    /**
     *
     * @returns Array with all filenames ex: ['file.webm','img.jpg']
     */
    getAllFiles(): IFile[];
}
export {};
