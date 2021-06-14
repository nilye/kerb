/**
 * Slice an `array like object` from `start` to `end`. (not include end)
 *
 * @param arrayLike
 * @param start
 * @param end
 */
import { isArrayLike } from "@/predicate/isArrayLike";
import { isNil } from "@/predicate/isNil";

export function slice<T = any>(
	array: any,
	start?: number,
	end?: number
): T[] {
	if (!isArrayLike(array)) return []
	const length = isNil(array) ? 0 : array.length
	if (!length) return []

	start = isNil(start) ? 0 : +start
	end = isNil(end) ? length : +end
	if (start > end){
		return array
	}

	return baseSlice(array, start, end)
}


export function baseSlice(array, ...args: number[]){
	return Array.prototype.slice.apply(array, args)
}
