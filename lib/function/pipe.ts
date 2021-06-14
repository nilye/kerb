/**
 * Create a function that chains multiple functions `fns` together, flows left-to-right and calls each function with the output of the last one.
 * @param fns
 */
import { isFunction } from "@/predicate/isFunction";

export function pipe(...fns: Function[]){
	const length = fns.length
	let index = length
	while (index--){
		if (!isFunction(fns[index])){
			throw new TypeError('arguments of `pipe` expected a function')
		}
	}

	return function(...args: any[]){
		let index = 0
		if (!length) return args[0]
		let result = fns[index].apply(this, args)
		while (++index < length){
			result = fns[index].call(this, result)
		}
		return result
	}
}
