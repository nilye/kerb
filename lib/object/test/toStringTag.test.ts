import { toStringTag } from "../toStringTag";

describe('toStringTag', ()=>{

	test('should return proper stringTag', () => {
		expect(toStringTag(Object)).toBe('Function')
		expect(toStringTag(Function)).toBe('Function')
		expect(toStringTag(function* (){})).toBe('GeneratorFunction')
		expect(toStringTag('foo')).toBe('String')
		expect(toStringTag([1, 2])).toBe('Array')
		expect(toStringTag(true)).toBe('Boolean')
		expect(toStringTag(undefined)).toBe('Undefined')
		expect(toStringTag(null)).toBe('Null')
		expect(toStringTag(new Map())).toBe('Map')
		expect(toStringTag(Promise.resolve())).toBe('Promise')
		expect(toStringTag(document.createElement('div'))).toBe('HTMLDivElement')

		class FooClass {
			get [Symbol.toStringTag](){
				return 'Foo'
			}
		}
		expect(toStringTag(new FooClass())).toBe('Foo')

		class Foo {}
		expect(toStringTag(new Foo())).toBe('Object')
	})


})
