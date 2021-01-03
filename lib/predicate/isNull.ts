/**
 * Checks if the `value` is `null`.
 *
 * @param value: the value to check
 */
export function isNull(value: any): value is null{
	return value === null
}
