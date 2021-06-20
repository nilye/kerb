import { createEmitter } from "../emitter";

describe('emitter', () => {

	const emitter = createEmitter()

	test('should return an object with expected methods', () => {
		const expectedMethods = ['on', 'once', 'off', 'removeAll', 'listeners', 'emit']

		for (let m of expectedMethods){
			expect(emitter).toHaveProperty(m)
			expect(emitter[m]).toBeInstanceOf(Function)
		}
	})

	test('should be able to add, get listeners and keep listeners to be unique', () => {
		const cb = () => {}
		emitter.on('a', cb)
		emitter.on('a', cb)

		const listeners = emitter.listeners('a')
		expect(listeners?.length).toBe(1)
		expect(listeners[0]).toBe(cb)
	})

	test('should be able to remove listeners', () => {
		const mockCb = jest.fn(() => {})
		emitter.on('b', mockCb)
		emitter.off('b', mockCb)
		emitter.emit('b')

		const listeners = emitter.listeners('b')
		expect(listeners?.length).toBe(0)
		expect(mockCb.mock.calls.length).toBe(0)
	})

	test('`on` method should return an `off` method', () => {
		const mockCb = jest.fn(() => {})
		const off = emitter.on('b', mockCb)
		off()
		emitter.emit('b')

		expect(off).toBeInstanceOf(Function)
		expect(mockCb.mock.calls.length).toBe(0)
	})

	test('should be able to add listeners and listen to events', () => {
		const mockCb = jest.fn(x => x)

		emitter.on('c', mockCb)
		emitter.emit('c', 1)
		emitter.emit('c', true)
		emitter.emit('c', 'value')

		expect(mockCb.mock.calls.length).toBe(3)
		expect(mockCb.mock.calls[0][0]).toBe(1)
		expect(mockCb.mock.calls[1][0]).toBe(true)
		expect(mockCb.mock.calls[2][0]).toBe('value')
	})

	test('should be able to emit events with arbitrary number of arguments', () => {
		const mockCb = jest.fn((...args) => [...args])

		emitter.on('d', mockCb)
		emitter.emit('d', 1)
		emitter.emit('d', 1, 2)
		emitter.emit('d', 1, 2, 3)
		emitter.emit('d', 1, 2, 3, 4, 5, 6, 7, 8)

		expect(mockCb.mock.calls.length).toBe(4)
		expect(mockCb.mock.calls[0][0]).toBe(1)
		expect(mockCb.mock.calls[0].length).toBe(1)
		expect(mockCb.mock.calls[1].length).toBe(2)
		expect(mockCb.mock.calls[2].length).toBe(3)
		expect(mockCb.mock.calls[3].length).toBe(8)
		expect(mockCb.mock.results[3].value).toEqual([1,2,3,4,5,6,7,8])
	})

	test('should be able to add a listener that only invoke once', () => {
		const mockCb = jest.fn(() => {})

		emitter.once('e', mockCb)
		emitter.emit('e')
		emitter.emit('e')
		expect(mockCb.mock.calls.length).toBe(1)
		expect(emitter.listeners('e').length).toBe(0)


		const mockCbToRemove = jest.fn(() => {})
		const off = emitter.once('e', mockCbToRemove)
		off()
		emitter.emit('e')

		expect(off).toBeInstanceOf(Function)
		expect(mockCbToRemove.mock.calls.length).toBe(0)
		expect(emitter.listeners('e').length).toBe(0)
	})

	test('should be able to add an once listener and remove it before it invokes', () => {
		const mockCb = jest.fn(() => {})
		emitter.once('f', mockCb)
		emitter.off('f', mockCb)
		emitter.emit('f')

		expect(mockCb.mock.calls.length).toBe(0)
		expect(emitter.listeners('f').length).toBe(0)
	})

	test('should be able to remove all listeners', () => {
		const mockCb = jest.fn(() => {})
		emitter.on('g', mockCb)
		emitter.on('g', () => {})
		emitter.on('g', () => {})
		emitter.removeAll('g')
		emitter.emit('g')

		expect(emitter.listeners('g').length).toBe(0)
		expect(mockCb.mock.calls.length).toBe(0)
	})

	test('should be able to add, emit, and remove listeners to all events', () => {
		const mockCb = jest.fn(() => {})
		const mockCbAll = jest.fn((...args) => {})

		emitter.on('h', mockCb)
		emitter.on(mockCbAll)
		emitter.emit('h', 1)
		emitter.emit(1)
		emitter.emit()

		expect(mockCb.mock.calls.length).toBe(1)
		expect(mockCbAll.mock.calls.length).toBe(3)
		expect(mockCbAll.mock.calls[0][0]).toBe('h')
		expect(mockCbAll.mock.calls[0][1]).toBe(1)
		expect(mockCbAll.mock.calls[1][0]).toBe(1)
		expect(mockCbAll.mock.calls[2][0]).toBeUndefined()

		emitter.on(() => {})
		expect(emitter.listeners().length).toBe(2)

		emitter.off(mockCbAll)
		expect(emitter.listeners().length).toBe(1)

		emitter.removeAll()
		expect(emitter.listeners().length).toBe(0)

	})
})
