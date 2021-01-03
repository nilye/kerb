import { isFunction } from "@/predicate/isFunction";
import { repeat } from "@test/performance";

function isFunctionToString(fn){
	return Object.prototype.toString.call(fn) === '[object Function]'
}

function isFunctionInstance(fn){
	return (fn instanceof Function)
}

function isFunctionTypeof(value){
	return typeof value === 'function'
}

describe('isFunction', ()=>{

	test('should return `true`', () => {
		expect(isFunction(setTimeout)).toBeTrue()
		expect(isFunction(() => {})).toBeTrue()
		expect(isFunction(async () => {})).toBeTrue()
		expect(isFunction(Object)).toBeTrue()
		expect(isFunction(function *() { yield 1})).toBeTrue()
		expect(isFunction(function(){})).toBeTrue()
		expect(isFunction(Array.prototype.push)).toBeTrue()
		expect(isFunction(new Function('void 0'))).toBeTrue()
		expect(isFunction(new Proxy(() => void 0, {}))).toBeTrue()
	})

	test('should return `false`', () => {
		expect(isFunction(123)).toBeFalse()
		expect(isFunction('function')).toBeFalse()
		expect(isFunction(null)).toBeFalse()
		expect(isFunction({})).toBeFalse()
	})

	const methods = {
		isFunctionTypeof,
		isFunctionInstance,
		isFunctionToString
	}

	Object.keys(methods).forEach((k)=>{
		const dur = repeat('', methods[k], 1E4)
		test(`performance: ${k} - ${dur.toFixed(3)}ms`, () => {})
	})

})

