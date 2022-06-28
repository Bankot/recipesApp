const checkOperator = (arg, operators) => {
	let finalLength = null
	operatorList = Object.keys(operators)
	operatorList.forEach((n) => {
		if (arg.startsWith(n)) {
			finalLength = n.length
		}
	})
	return finalLength
}

const conditionQueryMaker = (arg) => {
	const operatorMap = {
		">": "$gt",
		">=": "$gte",
		"=": "$eq",
		"<": "$lt",
		"<=": "$lte",
	}

	if (arg) {
		const operatorLength = checkOperator(arg, operatorMap)
		const operator = arg.slice(0, operatorLength)
		const number = arg.slice(operatorLength)
		if (operator && Number(number)) {
			return { [operatorMap[operator]]: Number(number) }
		}
	}
}
module.exports = conditionQueryMaker
