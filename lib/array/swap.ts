/**
 * Swap two elements in an array (or object).
 *
 * @param obj
 * @param a
 * @param b
 */
export function swap(
	obj: any,
	a: keyof [],
	b: keyof []
){
	obj[a] = [obj[b], obj[b] = obj[a]][0]
}
