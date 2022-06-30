import axios from 'axios';

import { IThread, INewPost, IBoardList, IBoardQuery, IOverboardQuery, IFile, IFilter, IBoard, IPost, IThreadOverboard, IOverboardIndex} from "jschan-api-types"
import { URLSearchParams } from 'url';

import {custom} from "./custom"

export namespace jschan{
	export class api{
		url:string

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
		constructor(root:string){
			this.url = root
		}
		/**
		 * Returns a thread with all replies.
		 */
		async getThread(board_id:string,postId:number){
			const t = await this.get(`${this.url}/${board_id}/thread/${postId}.json`) as IThread
			return t
		}
		/**
		 * Create a new thread or reply a thread.
		 * @param board_id board id. such as "br", "g", "meta"
		 * @param reply Reply object, with message, file, email etc...
		 * @param postId post number, such as 55555, to use as referer. If undefined, the board will be used as referer.
		 */
		async postThread(board_id:string, reply:INewPost){
			let resCode = 0
			
			await axios.post(
				`${this.url}/forms/board/${board_id}/post`,
				reply,
				{
					method:"POST",
					headers:{
						"User-Agent":"jschan-api-sdk",
						"Referer": this.url,
						"origin": this.url,
						"Content-Type": "multipart/form-data"
					},
				})
			.then((res)=>{
				resCode = res.status
			}).catch((err)=>{
				throw new Error(err);
			})
			return resCode
		}
		/**
		 * Returns a list of boards, max 30 per page. Unlisted boards are not included in search results. Also return the current page and maximum page with the current search and sites parameters.
		 * @returns 
		 */
		async getBoardList(query?:IBoardQuery){
			//TODO implement queries
			const boards = await this.get(
				`${this.url}/boards.json`,
				query ? new URLSearchParams(Object.entries(query)) : undefined
			) as IBoardList
			return boards 
		}
		/**
		 * Returns a list of all threads on a board.
		 * @param board board id
		 * @returns a list of all threads on a board
		 */
		async getBoardCatalog(board:string){			 
			let catalog = await this.get(`${this.url}/${board}/catalog.json`) as IPost[]
			return catalog 
		}

		/**
		 * Returns a list of threads with preview replies from a page of a board.
		 * @param board Board tag.
		 * @param pageNumber Optional. If undefined returns the index page.
		 * @returns 
		 */
		async getBoardPage(board:string,pageNumber?:number){			 
			let catalog = await this.get(`${this.url}/${board}/${pageNumber ?? 'index'}.json`) as IThread[]
			return catalog 
		}

		getM3uPlaylistFrom(thread:IThread){
			const fyleTypes = [".webm",".mp4",".mp3"]
			const lines:string[] = []
			let files = custom.Thread(thread).getAllFiles()

			lines.push("#EXTM3U")

			for (let i = 0; i < files.length; i++) {
				const media = files[i];

				if(fyleTypes.includes(media.extension))
				{
					lines.push(`#EXTINF:${media.duration}, ${media.filename}`)
					lines.push(`${this.url}/file/${media.filename}`)
				}

			}

			return lines.join('\n')
		}
		
		/**
		 * Returns a list of threads without replies from multiple boards. Similar to board catalog pages.
		 * @returns list of threads.
		 */
		async getOverboardCatalog(query?:IOverboardQuery){
			// const params = new URLSearchParams(query ?? '')
			const catalog = await this.get(
				`${this.url}/catalog.json`,
				query ? new URLSearchParams(Object.entries(query)) : undefined
			) as IPost[]
			return catalog
		}
		/**
		 * Returns a list of threads with preview replies from multiple boards. Similar to board index pages.
		 * @returns list of threads with preview replies.
		 */
		async getOverboardIndex(query?:IOverboardQuery){
			const catalog = await this.get(
				`${this.url}/overboard.json`,
				query ? new URLSearchParams(Object.entries(query)) : undefined
			) as IOverboardIndex
			return catalog
		}
		/**@deprecated not yed implemented */
		async login(username:string,password:string){
			//TODO get a session cookie
			throw new Error("Not yet implemented. 3==D");
		}
		/**@deprecated not yed implemented */
		async getCaptcha(){
			throw new Error("Not yet implemented. 3==D");
		}

		/**
		 * Returns a string with the path to the thumbs directory.
		 * @returns website.com/file/thumb/
		 */
		getThumbPath(file:IFile){
			return `${this.getFilesPath()}/thumb/${file.filename}`
		}
		/**
		 * Returns a string with the path to the files directory.
		 * @returns website.com/file/
		 */
		getFilesPath(){
			return `${this.url}/file/`
		}

		private async get(url:string,params?:URLSearchParams){
			const res = (await axios.get(
				url,{
					headers:{
					"User-Agent":"jschan-api-sdk",
					"origin": this.url
					},
					params:params ?? ''
				}
			)).data
		
			return res
		}
	}
	
}
