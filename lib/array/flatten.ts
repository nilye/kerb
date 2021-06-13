import { isArray } from "@/predicate/isArray";

export function flatten<T = any>(
	array: T[],
	depth: number = 1
){
	return baseFlatten(array, depth)
}

function baseFlatten(array, depth, result?){
	result = result || []
	for (let i of array){
		if (depth > 0 && isArray(i)){
			if (depth > 1){
				baseFlatten(i, depth - 1, result)
			} else {
				Array.prototype.push.apply(result, i)
			}
		} else {
			result.push(i)
		}
	}

	return result
}
