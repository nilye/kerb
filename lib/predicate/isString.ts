/**
 * Checks if `value` is a primitive string value, but not a `String` object.
 *
 * @param value: the value to check
 */
export function isString(value: any): value is string {
	return typeof value === 'string'
}
