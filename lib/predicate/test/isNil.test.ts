import { isNil } from "@/predicate/isNil";

describe('isNil', ()=>{

	test('should return `true`', () => {
		expect(isNil(null)).toBeTrue()
		expect(isNil(undefined)).toBeTrue()
	})

	test('should return `false`', () => {
		expect(isNil('')).toBeFalse()
		expect(isNil([])).toBeFalse()
		expect(isNil({})).toBeFalse()
		expect(isNil(false)).toBeFalse()
		expect(isNil(0)).toBeFalse()
		expect(isNil(() => {})).toBeFalse()
	})


})
