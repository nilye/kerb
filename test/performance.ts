export function perform(name: string, fn: Function){
	const t0 = performance.now()
	fn()
	const t1 = performance.now()
	return t1 - t0
}

export function repeat(name: string, fn: Function, times: number = 100){
	return perform(name, ()=>{
		for (let i = 0; i< times; i++){
			fn()
		}
	})
}
