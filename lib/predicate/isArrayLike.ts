import { isNumber } from "@/predicate/isNumber";
import { isArray } from "@/predicate/isArray";

/**
 * What is Array Like Object in JavaScript
 * https://dev.to/capscode/what-is-array-like-object-in-javascript-3f5m
 *
 * Checking if an object is array-like
 * https://stackoverflow.com/questions/24048547/checking-if-an-object-is-array-like
 */

/**
 *
 *
 * @param value
 */
export function isArrayLike(value: any): boolean {
	return isArray(value) || (
		value != null &&
		// Function is object, and has `length` property, but it is not array like.
		typeof value === 'object' &&
		// non-negative length property to know the number of elements in it
		isNumber(value.length) &&
		value.length > -1 &&
		value.length <= Number.MAX_SAFE_INTEGER
	)
}

