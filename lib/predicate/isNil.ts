/**
 * Checks if `value` is `null` or `undefined`.
 *
 * @param value: the value to check
 */
export function isNil(value: any): value is null | undefined {
	// tips: undefined == null
	return value == null
}

