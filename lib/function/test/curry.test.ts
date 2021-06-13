import { curry } from "../curry";

describe('curry', () => {

	function join(a, b, c, d) {
		return Array.prototype.join.call(arguments, '_')
	}

	test('no arity', () => {
		const curriedJoin = curry(join)
		expect(curriedJoin(1)(2)(3)(4)).toBe('1_2_3_4')
		expect(curriedJoin(1, 2)(3, 4)).toBe('1_2_3_4')
		expect(curriedJoin(1, 2, 3, 4)).toBe('1_2_3_4')
	})

	test('specified arity', () => {
		const curriedJoin = curry(join, 3)
		expect(curriedJoin(1)(2)(3)).toBe('1_2_3')
		expect(curriedJoin(1, 2)(3)).toBe('1_2_3')
		expect(curriedJoin(1, 2, 3)).toBe('1_2_3')
	})

	test('with placeholder', () => {
		expect(curry).toHaveProperty('placeholder')

		const curriedJoin = curry(join)
		const _ = curry.placeholder
		expect(curriedJoin(1, 2)(3)(4)).toBe('1_2_3_4')
		expect(curriedJoin(_, 2)(1, 3)(4)).toBe('1_2_3_4')
		expect(curriedJoin(_, _, _, 4)(1)(_, 3)(2) ).toBe('1_2_3_4')
		expect(curriedJoin(_, _, _, _)(1)(_, _, 4)(_, 3)(2) ).toBe('1_2_3_4')

		const curried = curry(join)(1, 2)
		expect(curried(3)(4)).toBe('1_2_3_4')
		expect(curried(3, 5)).toBe('1_2_3_5')

	})

	test('curried function with a `length` of `0`', function() {
		const curriedJoin = curry(join)
		expect(curriedJoin.length).toBe(0)
		expect(curriedJoin(1).length).toBe(0)
		expect(curriedJoin(1, 2).length).toBe(0)
	});
})
