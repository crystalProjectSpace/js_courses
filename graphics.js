'use strict'

class grapher {
	constructor() {
		
		this.handler = null // ассоциированный элемент канвас
		this.context = null // графический контекст
		// стиль линии
		this.lineStyle = {
			width: 1,
			color: '#000000'
		}
		// стиль маркера
		this.markerStyle = {
			radius: 3,
			color: '#000000',
			frequency: 2,
		}
		// количество элементарных линий между двумя точками графика
		this.scaleX = 1
		this.scaleY = 1
		this.dX = 0
		this.dY = 0
		this.graphMargin = 1
	}
	
	init( canvas ) {
		this.handler = canvas
		this.context = canvas.getContext('2d')
		
		return this
	}
	
	adjust (xMin, xMax, yMin, yMax) {
		this.scaleX = this.handler.width / (xMax - xMin)
		this.scaleY = -this.handler.height / (yMax - yMin)
		this.dX = -xMin * this.scaleX
		this.dY = this.handler.height - yMin * this.scaleY
		
		return this
	}
	
	drawAxis(xMin, xMax, yMin, yMax) {
		this.context.beginPath()
		this.context.lineTo(xMin * this.scaleX + this.dX, this.dY)
		this.context.lineTo(xMax * this.scaleX + this.dX, this.dY)
		this.context.stroke()
		
		this.context.beginPath()
		this.context.lineTo(this.dX, yMin * this.scaleY + this.dY)
		this.context.lineTo(this.dX, yMax * this.scaleY + this.dY)
		this.context.stroke()
	}
	
	makeMarks(xMin, xMax, yMin, yMax) {
		
	}
	
	drawGraphic(xArr, yArr) {
		const {xMin, xMax} = xArr.reduce((extrems, x) => {
			if( x < extrems.xMin ) {
				extrems.xMin = x
			} else if ( x > extrems.xMax ) {
				extrems.xMax = x
			}
			return extrems
		}, {xMin: xArr[0], xMax: xArr[0] })
		
		const {yMin, yMax} = yArr.reduce((extrems, y) => {
			if( y < extrems.yMin ) {
				extrems.yMin = y
			} else if ( y > extrems.yMax ) {
				extrems.yMax = y
			}
			return extrems
		}, {yMin: yArr[0], yMax: yArr[0] })
		
		this
			.adjust(xMin, xMax, yMin, yMax)
			.drawAxis(xMin, xMax, yMin, yMax)
		
		const iMax = xArr.length - 1
		
		this.context.strokeStyle = this.lineStyle.color
		this.context.lineWidth = this.lineStyle.width
				
		this.context.beginPath()
		xArr.forEach((x, i) => {
			if(i < iMax) {
				const x0 = x * this.scaleX + this.dX
				const x1 = xArr[i + 1] * this.scaleX + this.dX
				const y0 = yArr[i] * this.scaleY + this.dY 
				const y1 = yArr[i + 1] * this.scaleY + this.dY 
				this.context.moveTo(x0, y0)
				this.context.lineTo(x1, y1)
			}
		})
		this.context.stroke()
	}	
}