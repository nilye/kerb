import { isNil } from "@/predicate/isNil";

describe('isNil', ()=>{

	test('should return `true`', () => {
		expect(isNil(null)).toBeTruthy()
		expect(isNil(undefined)).toBeTruthy()
	})

	test('should return `false`', () => {
		expect(isNil('')).toBeFalsy()
		expect(isNil([])).toBeFalsy()
		expect(isNil({})).toBeFalsy()
		expect(isNil(false)).toBeFalsy()
		expect(isNil(0)).toBeFalsy()
		expect(isNil(() => {})).toBeFalsy()
	})


})

