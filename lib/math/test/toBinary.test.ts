import { toRadix } from "../toRadix";

describe('to binary', () => {

	test('should return correct value', () => {
		expect(toRadix(1023, 3)).toBe('1101220')
		expect(toRadix(256*256*256-1, 16)).toBe('FFFFFF')
		expect(toRadix(21127, 3)).toBe('1001222111')
		expect(toRadix(21127, 8)).toBe('51207')
		expect(toRadix(21127, 16)).toBe('5287')
		expect(toRadix(21127, 36)).toBe('GAV')
		expect(toRadix(534325234, 64)).toBe('VsIVo')
		expect(toRadix(2875993350591, 64)).toBe('fsUZ-6_')
		expect(toRadix(7159047702620056984, 64)).toBe('6DQ2_IClgm0')
	})

	test('should not return value', () => {
		expect(toRadix('123', 64)).toBeUndefined()
		expect(toRadix(3521443, 104)).toBeUndefined()
		expect(toRadix(43214321, -1)).toBeUndefined()
		expect(toRadix(43214321, '421')).toBeUndefined()
	})

})

