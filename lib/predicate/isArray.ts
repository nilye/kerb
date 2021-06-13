/**
 * Check if `value` is Array.
 *
 * @param value: the value to check
 */
export function isArray<T = any>(value: any): value is Array<T> {
	return Array.isArray(value)
}
