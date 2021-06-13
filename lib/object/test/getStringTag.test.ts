import { getStringTag } from "../getStringTag";

describe('getStringTag', ()=>{

	test('should return proper stringTag', () => {
		expect(getStringTag(Object)).toBe('Function')
		expect(getStringTag(Function)).toBe('Function')
		expect(getStringTag(function* (){})).toBe('GeneratorFunction')
		expect(getStringTag('foo')).toBe('String')
		expect(getStringTag([1, 2])).toBe('Array')
		expect(getStringTag(true)).toBe('Boolean')
		expect(getStringTag(undefined)).toBe('Undefined')
		expect(getStringTag(null)).toBe('Null')
		expect(getStringTag(new Map())).toBe('Map')
		expect(getStringTag(Promise.resolve())).toBe('Promise')
		expect(getStringTag(document.createElement('div'))).toBe('HTMLDivElement')

		class FooClass {
			get [Symbol.toStringTag](){
				return 'Foo'
			}
		}
		expect(getStringTag(new FooClass())).toBe('Foo')
	})


})
