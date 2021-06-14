import { baseRandom } from "@/number/random";
import { baseSlice } from "@/array/slice";
import { swap } from "@/array/swap";

/**
 * Create a new array of shuffled values from `array`.
 * [Fisher-Yates shuffle]
 *
 * @param array
 */
export function shuffle<T = any>(
	array: T[],
): T[] {
	return baseShuffle(baseSlice(array))
}

export function baseShuffle(array){
	const length = array.length
	let index = -1
	let lastIndex = length - 1

	while (++index < length){
		const rand = baseRandom(index, lastIndex)
		swap(array, rand, index)
	}
	return array
}

