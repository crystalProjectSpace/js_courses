'use strict'
// тестовая функция для отработки способов поиска
const testFunc = x => {
	const x2  = x * x
	const x3 = x2 * x
	return -0.0125 * x3 - 12.7 * x2 + 51.3 * x + 117.5
}
// поиск методом золотого сечения
const dichotomie = (x0_start, x1_start, func, eps) => {
	let x0 = x0_start
	let x1 = x1_start
	let f0 = func(x0)
	let f1 = func(x1)
	let nStep = 0
	const result = [{
		x0,
		x1,
		f_05: func(0.5 * (x0 + x1)),
		nStep
	}]
	
	while(Math.abs(x0 - x1) > eps) {
		const x_05 = 0.5 * (x0 + x1)
		const f_05 = func(x_05)
		if(Math.sign(f0) === Math.sign(f_05)) {
			x0 = x_05
			f0 = f_05
		} else {
			x1 = x_05
			f1 = f_05
		}
		nStep++
		result.push({
			x0,
			x1,
			f_05,
			nStep
		})
	}
	return result
}
// поиск методом Ньютона
const newtonSearch = (x0_start, func, eps) => {
	const deriv_1 = (func, x, eps) => (func(x + eps) - func(x))/eps
	
	let x0 = x0_start
	let f0 = func(x0)
	let f1 = 1E+20
	let nStep = 0
	const result = [{
		x: x0,
		f_x: f0,
		df_dx: deriv_1(func, x0, eps),
		nStep
	}]
	while(Math.abs(f0 - f1) > eps) {
		const df_dx = deriv_1(func, x0, eps)

		x0 -= func(x0)/df_dx
		f0 = f1
		f1 = func(x0)
		
		nStep++
		
		result.push({
			x: x0,
			f_x: f1,
			df_dx,
			nStep
		})
	}
	return result	
}
const outputTable = (itemList, format) => {
	const table = document.createElement('table')
	const colNames = Object.keys(itemList[0])
	const tabHeader = document.createElement('thead')
	
	colNames.forEach(colName => {
		const colHead = document.createElement('th')
		colHead.innerText = colName
		tabHeader.appendChild(colHead)
	})
	
	const tabBody = document.createElement('tbody')
	
	itemList.forEach(item => {
		const row = document.createElement('tr')
		colNames.forEach(colName => {
			const cell = document.createElement('td')
			cell.innerText = format[colName] ? item[colName].toFixed(format[colName]) : item[colName]
			row.appendChild(cell)			
		})
		tabBody.appendChild(row)
	})
	
	table.appendChild(tabHeader)
	table.appendChild(tabBody)
	return table
}