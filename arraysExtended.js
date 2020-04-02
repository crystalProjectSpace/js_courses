'use strict'

class ArrayExtended extends Array {
	getExtrems() {
		const lMax = this.length
		console.log(this[0])
		const result = {min: this[0], max: this[0]}
		
		for(let i = 1; i < lMax; i++) {
			if(this[i] < result.min) {
				result.min = this[i]
			} else if (this[i] > result.max) {
				result.max = this[i]
			}
		}
		
		return result
	}
		
	static getInterval(x0, x1, N) {
		const result = new ArrayExtended()
		
		const delta = (x1 - x0) / N
		let x = x0
		for(let i = 0; i < N; i++) {
			result.push(x)
			x += delta
		}
		return result
	}	
	
}