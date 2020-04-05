'use strict'

class MathExtended {
	// получить ближайшее к заданному числу "круглое" число (кратное 10 или равное половине от него)
	static getOrder(N) {
		
		let _N = Math.abs(N)		
		const N0 = _N
		let result = 1
		
		if( _N > 1) {
			while(_N > 1) {
				_N /= 10
				result *= 10
			}
		} else {
			while(_N < 0.1) {
				_N *= 10
				result /= 10
			}
		}
		const result_10 = result * 0.1
		while( result > N0 + result_10 ) {
			result -= result_10
		}
		
		return result * Math.sign(N)
	}
	// число находится в диапазоне
	static inRange(x, x0, x1) {
		return (x > x0) && (x < x1)
	}
}