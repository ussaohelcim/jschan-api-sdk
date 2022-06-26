import axios from 'axios';
import path from 'path';
import {IThread} from "jschan-api-types"

export namespace jschan{
	export class api{
		url:string
		constructor(root:string){
			this.url = root
		}
		async getThread(board_id:string,postId:number){
			const t = (await axios.get(
				`${this.url}/${board_id}/thread/${postId}.json`
			)).data as IThread
			return t
		}
		getThumbPath(){
			return path.normalize(`${this.getFilesPath()}/thumb/`)  
		}
		getFilesPath(){
			return path.normalize(`${this.url}/file/`)
		}
	}
}
