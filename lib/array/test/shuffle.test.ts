import { shuffle } from "../shuffle";

describe('shuffle', () => {
	const array = [1,2,3]

	test('should return a new array', () => {
		expect(shuffle(array)).not.toStrictEqual(array)
	})

	test('should contain the same elements', () => {
		expect(shuffle(array).sort()).toEqual(array)
	})

	test('should pass standard deviation', () => {
		/**
		 * https://bigfrontend.dev/problem/can-you-shuffle-an-array
		 */
		const count = new Map()
		const total = 100000
		for (let i = 0; i < total; i++) {
			let arr = [1, 2, 3, 4]
			arr = shuffle(arr)

			const result = arr.join('_')
			if (count.has(result)) {
				count.set(result, count.get(result) + 1)
			} else {
				count.set(result, 1)
			}
		}

 		// calculate the standard deviation
		const avg = total / 24

		let d = 0
		for (let i of count.values()) {
			d += (i - avg) ** 2
		}

		const sd = Math.sqrt( d / 24)
		console.log(sd)
		expect(sd).toBeLessThanOrEqual(100)
	})
})
