/**
 * Checks if `value` is `undefined`
 *
 * @param value
 */
export function isUndefined(value: any): value is undefined {
	return value === undefined
}
