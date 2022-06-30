import { IThread, IFilter, IFile, IBoard, IBoardList } from "jschan-api-types"

export namespace custom{
	export function Thread(thread:IThread):ICustomThread{
		let CT = Object.create(thread) as ICustomThread
	
		CT.filter = (filter:IFilter) =>{
			throw new Error("Not yet implemented");
		}
	
		
		CT.getAllFiles = ()=>{
			let files:IFile[] = []
	
			CT.files.forEach((f)=>{
				files.push(f)
			})
			CT.replies.forEach((r)=>{
				r.files.forEach((f)=>{
					files.push(f)
				})
			})
	
			return files
		}
	
		return CT 
	}
	
}

interface ICustomThread extends IThread{
	/**
	 * @todo 
	 * @deprecated 
	 * @param filter 
	 * @returns a thread without the filtered stuff.
	 */
	filter(filter:IFilter):IThread
	/**
	 * 
	 * @returns Array with all filenames ex: ['file.webm','img.jpg']
	 */
	getAllFiles():IFile[]
}
