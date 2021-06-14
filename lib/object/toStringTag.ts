import { isObject } from "@/predicate/isObject";
import { isString } from "@/predicate/isString";

/**
 * Gets the string description of an object.
 *
 * @param value: the value to query
 */
export function toStringTag(value: any): string {

	/**
	 * if Symbol.toStringTag is available
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
	 */
	if (isObject(value) && isString(value[Symbol.toStringTag])){
		return value[Symbol.toStringTag]
	}

	/**
	 * use toString() to detect object class
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#Using_toString_to_detect_object_class
	 */
	const stringTag = Object.prototype.toString.call(value)
	return stringTag.slice(8, -1)
}
