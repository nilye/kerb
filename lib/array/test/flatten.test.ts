import { flatten, flattenDeep } from "../flatten";

describe('flatten', () => {
	test('no depth', () => {
		expect(flatten([1,[2],[3,[4]]])).toEqual([1,2,3,[4]])
	})

	test('specified depth', () => {
		const arr = [1,[2],[3,[4]]]
		expect(flatten(arr, 1)).toEqual([1,2,3,[4]])
		expect(flatten(arr, 2)).toEqual([1,2,3,4])
	})

	test('infinity depth', () => {
		const arr = [1,2,[3,4,[5,6,[7,8,[9,10]]]]]
		expect(flatten(arr, Infinity)).toEqual([1,2,3,4,5,6,7,8,9,10])
		expect(flattenDeep(arr)).toEqual([1,2,3,4,5,6,7,8,9,10])
	})
})
