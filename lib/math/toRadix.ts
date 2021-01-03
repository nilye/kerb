import { isNumber } from "@/predicate/isNumber";

const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_"

/**
 *
 * Convert a number (in base-10) to a different base(radix).
 *
 * @param number
 * @param radix
 */
export function toRadix(number: number, radix: number){

	if (!isNumber(number) || !isNumber(radix) || radix < 0 || radix > 64) return

	let result = "",
		q = Math.floor(Math.abs(number)), // quotient
		r // remainder

	while (q > 0){
		r = q % radix
		result = digits[r] + result
		q = (q - r) / radix
	}

	return q < 0 ? '-' + result : result

}
