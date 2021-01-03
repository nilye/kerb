/**
 * Checks if `value` is a primitive boolean value, but not a `Boolean` object.
 *
 * @param value
 */
export function isBoolean(value: any): value is boolean {
	return typeof value === 'boolean'
}
