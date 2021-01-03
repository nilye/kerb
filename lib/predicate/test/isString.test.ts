import { isString } from "@/predicate/isString";


describe('isString', ()=>{

	test('should return `true`', () => {
		expect(isString('a')).toBeTrue()
		expect(isString('')).toBeTrue()
	})

	test('should return `false`', () => {
		expect(isString(123)).toBeFalse()
		expect(isString({})).toBeFalse()
		expect(isString(true)).toBeFalse()
		expect(isString([1,2,3])).toBeFalse()
		expect(isString(/x/)).toBeFalse()
		expect(isString(null)).toBeFalse()
	})

	test('should return `false` from String object', () => {
		expect(isString(new String("123"))).toBeFalse()
	})
})
