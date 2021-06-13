import { isNil } from "./isNil";
import { isFunction } from "./isFunction";

/**
 * Check if `value` is iterable. In order to be iterable, an object must implement the `Symbol.iterator` method.
 *
 * @param value: the value to check
 */
export function isIterable<T = any>(value: any): value is Iterable<T>{
	if (isNil(value)){
		return false
	}
	return isFunction(value[Symbol.iterator])
}
