import { isNull } from "@/predicate/isNull";
import { isFunction } from "@/predicate/isFunction";

/**
 * Checks if `value` is the language type of `Object`
 * @param value
 */
export function isObject<T = object>(value: any): value is T {
	/**
	 * Is function also a object?
	 * http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types
	 * https://stackoverflow.com/questions/3449596/every-object-is-a-function-and-every-function-is-object-which-is-correct
	 */
	return !isNull(value) && (typeof value === 'object' || isFunction(value))
}
