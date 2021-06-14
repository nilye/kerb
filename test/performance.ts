export function perform(fn: Function){
	const t0 = performance.now()
	fn()
	const t1 = performance.now()
	return t1 - t0
}

export function repeat(fn: Function, times: number = 100){
	return perform(()=>{
		for (let i = 0; i< times; i++){
			fn()
		}
	})
}
