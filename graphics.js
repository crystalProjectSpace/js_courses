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
		this.linePrecision = 25
		this.scaleX = 1
		this.scaleY = 1
		this.graphMargin = 1
	}
	
	init( canvas ) {
		this.handler = canvas
		this.context = canvas.getContext('2d')
		
		return this
	}
	
	adjust (xMin, xMax, yMin, yMax) {
		this.scaleX = this.handler.width / (xMax - xMin)
		this.scaleY = this.handler.height / (yMax - yMin)
		return this
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
		
		this.adjust(xMin, xMax, yMin, yMax)
		
		const iMax = xArr.length - 1
		
		this.context.strokeStyle = this.lineStyle.color
		this.context.lineWidth = this.lineStyle.width
		
		const deltaX = xMin * this.scaleX
		const deltaY = yMin * this.scaleY
		
		this.context.beginPath()
		xArr.forEach((x, i) => {
			if(i < iMax) {
				const x0 = x * this.scaleX - deltaX
				const x1 = xArr[i + 1] * this.scaleX - deltaX
				const y0 = this.handler.height - yArr[i] * this.scaleY + deltaY 
				const y1 = this.handler.height - yArr[i + 1] * this.scaleY + deltaY 
				this.context.moveTo(x0, y0)
				this.context.lineTo(x1, y1)
			}
		})
		this.context.stroke()
		
		this.context.beginPath()
		this.context.lineTo(xMin * this.scaleX - deltaX, this.handler.height + deltaY)
		this.context.lineTo(xMax * this.scaleX - deltaX, this.handler.height + deltaY)
		this.context.stroke()
		
		this.context.beginPath()
		this.context.lineTo( - deltaX, this.handler.height + yMin)
		this.context.lineTo( - deltaX, this.handler.height - yMax * this.scaleY + deltaY)
		this.context.stroke()

	}	
}