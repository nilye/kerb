import { isFunction } from "./isFunction";

function isFunctionToString(fn){
	console.log(Object.prototype.toString.call(fn) )
	return Object.prototype.toString.call(fn) === '[object Function]'
}

function isFunctionInstance(fn){
	return (fn instanceof Function)
}

function isFunctionTypeof(value){
	return typeof value === 'function'
}

describe('isFunction', ()=>{


	test('performance', () => {
		expect(isFunction(setTimeout)).toBe(true)
	})

})
