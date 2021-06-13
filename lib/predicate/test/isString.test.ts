import { isString } from "@/predicate/isString";


describe('isString', ()=>{

	test('should return `true`', () => {
		expect(isString('a')).toBeTruthy()
		expect(isString('')).toBeTruthy()
	})

	test('should return `false`', () => {
		expect(isString(123)).toBeFalsy()
		expect(isString({})).toBeFalsy()
		expect(isString(true)).toBeFalsy()
		expect(isString([1,2,3])).toBeFalsy()
		expect(isString(/x/)).toBeFalsy()
		expect(isString(null)).toBeFalsy()
	})

	test('should return `false` from String object', () => {
		expect(isString(new String("123"))).toBeFalsy()
	})
})
