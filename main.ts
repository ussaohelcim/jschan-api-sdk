import axios from 'axios';
import path from 'path';

import {IThread,INewPost} from "jschan-api-types"
import { createReadStream } from 'fs';

export namespace jschan{
	export class api{
		url:string

		constructor(root:string){
			this.url = root
		}
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
		async postThread(board_id:string, reply:INewPost,postId?:number){
			await axios.post(
				`${this.url}/forms/board/${board_id}/post`,
				reply,
				{method:"POST",headers:{
					"User-Agent":"jschan-api-sdk",
					"Referer": postId ? path.normalize(`${this.url}/${board_id}/thread/${postId}.html`) : path.normalize(`${this.url}/${board_id}/index.html`) ,
					"origin": this.url,
					"Content-Type": "multipart/form-data"
				}})
			.then((res)=>{
				console.log(res.status,res.statusText)
				console.log(``)
			}).catch((err)=>{
				throw new Error("Something went wrong");
			})

		}
		getThumbPath(){
			return path.normalize(`${this.getFilesPath()}/thumb/`)  
		}
		getFilesPath(){
			return path.normalize(`${this.url}/file/`)
		}
		async get(url:string){
			const res = (await axios.get(
				url,{headers:{
					"User-Agent":"jschan-api-sdk",
					"origin": this.url
				}}
			)).data
		
			return res
		}
	}
}
