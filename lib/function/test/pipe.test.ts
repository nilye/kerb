import { pipe } from "../pipe";

describe('pipe', () => {

	test('should return a new function', () => {
		expect(typeof pipe(()=> void 0)).toBe('function')
	})

	test('should return initial value when no function is passed', () => {
		expect(pipe()(1)).toBe(1)
	})

	const times = (y) =>  (x) => x * y
	const plus = (y) => (x) => x + y
	const subtract = (y) =>  (x) => x - y
	const divide = (y) => (x) => x / y

	test('should chain each function with previous return value', () => {
		const piped1 = pipe(times(2), subtract(3), divide(4))
		const piped2 = pipe(times(2), times(3), plus(4))

		expect(piped1(2)).toBe(0.25)
		expect(piped2(2)).toBe(16)
	})
})
