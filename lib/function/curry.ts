import { slice } from "@/array/slice";
import { isNil } from "@/predicate/isNil";
import { isNumber } from "@/predicate/isNumber";

/**
 * `curry` translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).
 * `arity` of `fn` my be specified additionally.
 * `curry.placeholder` may be used as a placeholder for provided arguments.
 *
 * @param fn
 * @param arity
 */
export function curry(
	fn: Function,
	arity?: number
){

	if (isNil(arity) || !isNumber(arity)){
		arity = fn.length
	}

	return function curried(...args: any[]){
		let length = args.length

		for (let i = 0; i < length; i++){
			if (args[i] === curry.placeholder) {
				length = i + 1
				break
			}
		}

		if (length < arity){
			return function(...partials: any[]){
				partials = concatCurryArgs(args, partials)
				return curried.apply(this, partials)
			}
		}
		return fn.apply(this, args)
	}
}
curry.placeholder = Symbol('curry.placeholder')

function concatCurryArgs(a, b){
	const args = []
	const _ = curry.placeholder
	let i = 0, j = 0
	while (i < a.length && j < b.length){
		if (a[i] === _){
			args.push(b[j] === _ ? _ : b[j])
			j ++
		} else {
			args.push(a[i])
		}
		i ++
	}

	while (j < b.length){
		args.push(b[j])
		j++
	}

	while (i < a.length){
		args.push(a[i])
		i++
	}

	return args
}
