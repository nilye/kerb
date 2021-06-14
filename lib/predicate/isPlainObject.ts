import { isObject } from "@/predicate/isObject";
import { toStringTag } from "@/object/toStringTag";

/**
 * Checks if `value` is a plain object, which is created by the `{}` object literal notation or `Object` constructor.
 *
 * @param value: the value to check
 */
export function isPlainObject(value: any): value is object {
	if (!isObject(value) || toStringTag(value) !== 'Object'){
		return false
	}

	const getProtoOf = Object.getPrototypeOf

	if (getProtoOf(value) === null){
		return true
	}

	let proto = value
	while (getProtoOf(proto) !== null){
		proto = getProtoOf(proto)
	}

	return getProtoOf(value) === Object.prototype
}
