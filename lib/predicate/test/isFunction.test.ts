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
		expect(isFunction(setTimeout)).toBeTruthy()
		expect(isFunction(() => {})).toBeTruthy()
		expect(isFunction(async () => {})).toBeTruthy()
		expect(isFunction(Object)).toBeTruthy()
		expect(isFunction(function *() { yield 1})).toBeTruthy()
		expect(isFunction(function(){})).toBeTruthy()
		expect(isFunction(Array.prototype.push)).toBeTruthy()
		expect(isFunction(new Function('void 0'))).toBeTruthy()
		expect(isFunction(new Proxy(() => void 0, {}))).toBeTruthy()
	})

	test('should return `false`', () => {
		expect(isFunction(123)).toBeFalsy()
		expect(isFunction('function')).toBeFalsy()
		expect(isFunction(null)).toBeFalsy()
		expect(isFunction({})).toBeFalsy()
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

