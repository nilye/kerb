/**
 * Checks if `value` is a primitive number value, but not a `Number` object.
 *
 * @param value: the value to check
 */
export function isNumber(value: any): value is number {
	return typeof value === 'number'
}
