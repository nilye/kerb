import { isFunction } from "@/predicate/isFunction";

type EventType = string | symbol
type Listener<T = any> = (event: T) => void
const WILD_CARD = Symbol('emitter.wildCard')

/**
 * Event emitter
 */
export function createEmitter(){

	const store = new Map<EventType, Set<Listener>>()


	/**
	 * Add a listener of the given event `type`.
	 *
	 * ex: pass just the listener to listen to all events
	 * `emitter.on(function(){ ... })`
	 *
	 * @param type
	 * @param listener
	 */
	function on<T = any>(
		type: EventType | Listener<T>,
		listener?: Listener<T>
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


	/**
	 * Add a listener of the given event `type`, and only invoke once.
	 * @param type
	 * @param listener
	 */
	function once<T = any>(
		type: EventType | Listener<T>,
		listener?: Listener<T>
	){
		const remover = () => {
			stopRemover()
			stop()
		}
		const stop = on(type, listener)
		const stopRemover = on(type, remover)
		return stop
	}


	/**
	 * remove a `listener` of the given event `type`
	 * @param type
	 * @param listener
	 */
	function off<T = any>(
		type: EventType | Listener<T>,
		listener?: Listener<T>
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


	/**
	 * remove all listeners of the given event `type`
	 * @param type
	 */
	function removeAll(type?: EventType){
		if (!type) type = WILD_CARD
		store.delete(type)
	}


	/**
	 * get all listeners of the given  event `type`
	 * @param type
	 */
	function listeners(type?: EventType){
		if (!type) type = WILD_CARD
		const set = store.get(type)
		return set ? Array.from(set) : []
	}


	/**
	 * emit event of a certain `type`
	 * @param type
	 * @param payload
	 */
	function emit<T = any>(
		type?: EventType | T,
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

	// return emitter object
	return {
		on,
		once,
		off,
		removeAll,
		listeners,
		emit
	}

}
