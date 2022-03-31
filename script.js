const calculatorScreen = document.querySelector(".calculator-screen")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equalSign = document.querySelector(".equal-sign")
const clearBtn = document.querySelector(".all-clear")
const decimal = document.querySelector(".decimal")

let prevNumber = ''
let calculationOperator = ''
let currentNumber = '0'

const updateScreen = (number) => {
    calculatorScreen.value = number
}

const inputNumber = (number) => {
    if (currentNumber === '0') {
        currentNumber = number
    } else {
        currentNumber += number
    }
}

const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = '0'
}

const calculate = () => {
    let result = ''
    if (prevNumber.includes(',') || currentNumber.includes(',')) {
        Number1 = prevNumber.replace(',', '.')
        Number2 = currentNumber.replace(',', '.')
    }
    switch (calculationOperator) {
        case '+':
            result = parseFloat(Number1) + parseFloat(Number2)
            break
        case '-':
            result = parseFloat(Number1) - parseFloat(Number2)
            break
        case '*':
            result = parseFloat(Number1) * parseFloat(Number2)
            break
        case '/':
            result = parseFloat(Number1) / parseFloat(Number2)
            break
        default:
            return
    }
    result = result.toString()
    if (result.includes('.')) {
        result = result.replace('.', ',')
    }
    currentNumber = result
    calculationOperator = ''
}

const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
}

const inputDecimal = (dot) => {
    if (currentNumber.includes(',')) {
        return
    }
    currentNumber += dot
}

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value)
    })
})

equalSign.addEventListener("click", (event) => {
    calculate()
    updateScreen(currentNumber)
})

clearBtn.addEventListener("click", () => {
    clearAll()
    updateScreen(currentNumber)
})

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})