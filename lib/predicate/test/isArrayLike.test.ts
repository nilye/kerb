import { isArrayLike } from "../isArrayLike";

describe('isArrayLike', () => {
	test('should return `true`', function() {
		expect(isArrayLike([1,2,3])).toBeTruthy()
		expect(isArrayLike([])).toBeTruthy()
		expect(isArrayLike([arguments])).toBeTruthy()
		expect(isArrayLike({0: 'a', 1: 'a', length: 2})).toBeTruthy()
		expect(isArrayLike(new Uint8Array(2))).toBeTruthy()
		expect(isArrayLike(new Int32Array(2))).toBeTruthy()
	})

	test('should return `false`', () => {
		expect(isArrayLike(function(){})).toBeFalsy()
		expect(isArrayLike(new Date())).toBeFalsy()
		expect(isArrayLike({})).toBeFalsy()
		expect(isArrayLike(1)).toBeFalsy()
	})
})
