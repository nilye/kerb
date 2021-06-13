import { isObject } from "@/predicate/isObject";
import { getStringTag } from "@/object/getStringTag";

/**
 * Checks if `value` is a plain object, which is created by the `{}` object literal notation or `Object` constructor.
 *
 * @param value: the value to check
 */
export function isPlainObject(value: any): value is object {
	if (!isObject(value) || getStringTag(value) !== 'Object'){
		return false
	}

	const getPrototypeOf = Object.getPrototypeOf

	if (getPrototypeOf(value) === null){
		return true
	}

	let proto = value
	while (getPrototypeOf(proto) !== null){
		proto = getPrototypeOf(proto)
	}

	return getPrototypeOf(value) === proto
}
