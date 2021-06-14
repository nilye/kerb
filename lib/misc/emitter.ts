import { isFunction } from "@/predicate/isFunction";

type EventType = string | symbol
type Listener<T = any> = (event: T) => void
const WILD_CARD = Symbol('emitter.wildCard')

/**
 * Event emitter
 */
export function createEmitter(){

	const store = new Map<EventType, Set<Listener>>()

	function on<T = any>(
		type: EventType | Listener<T>,
		listener: Listener<T>
	): () => void {

		if (isFunction(type)){
			listener = type
			type = WILD_CARD
		}

		if (!isFunction(listener)){
			throw new TypeError('listener must be a function')
		}

		let listeners = store.get(type)
		if (!listeners){
			store.set(type, listeners = new Set())
		}
		listeners.add(listener)

		return () => {
			listeners.delete(listener)
		}
	}

	function once<T = any>(
		type: EventType | Listener<T>,
		listener: Listener<T>
	){
		const wrapper = (...args) => {
			off(type, wrapper)
			listener.apply(this, args)
		}
		on(type, wrapper)
	}

	function off<T = any>(
		type: EventType | Listener<T>,
		listener: Listener<T>
	){

		if (isFunction(type)){
			listener = type
			type = WILD_CARD
		}

		let listeners = store.get(type)
		if (listeners){
			listeners.delete(listener)
		}
	}

	function removeAll(type: EventType){
		store.delete(type)
	}

	function listeners(type: EventType){
		const set = store.get(type)
		return set ? Array.from(set) : []
	}

	function emit<T = any>(
		type: EventType | T,
		...payload: T[]
	){
		const wildListeners = store.get(WILD_CARD)
		if (wildListeners){
			wildListeners.forEach(listener => listener.call(this, type, ...payload))
		}

		if (type){
			const listeners = store.get(type as EventType)
			if (listeners){
				listeners.forEach( listener => listener.apply(this, payload))
			}
		}
	}

	return {
		on,
		once,
		off,
		removeAll,
		listeners,
		emit
	}

}
