/**
 * Checks if `value` is a function.
 *
 * @param value: the value to check
 * @return boolean
 */
export function isFunction(value: any): value is Function {
	return typeof value === 'function'
}

