import { isUndefined } from "@/predicate/isUndefined";

/**
 * Return a random number between `lower` and `upper` bounds inclusively.
 *
 * @param lower
 * @param upper
 */
export function random(lower: number, upper: number): number{
	if (isUndefined(lower) && isUndefined(upper)){
		lower = 0
		upper = 1
	} else {
		lower = +lower
		if (isUndefined(upper)){
			upper = lower
			lower = 0
		} else {
			upper = +upper
		}
	}

	if (lower > upper){
		lower = [upper, upper = lower][0]
	}

	return baseRandom(lower, upper)
}


export function baseRandom(
	lower: number,
	upper: number
): number{
	return lower + Math.floor(Math.random() * (upper - lower + 1))
}
