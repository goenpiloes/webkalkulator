const calculatorScreen = document.querySelector(".calculator-screen")
const numbers = document.querySelectorAll(".number")
const operators = document.querySelectorAll(".operator")
const equalSign = document.querySelector(".equal-sign")
const clearBtn = document.querySelector(".all-clear")
const decimal = document.querySelector(".decimal")
const percentage = document.querySelector(".percentage")

let prevNumber = ''
let calculationOperator = ''
let currentNumber = ''
let Number1 = 0
let Number2 = 0
let number = ''

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
    if (currentNumber !== '') {
        if (calculationOperator === '') {
            prevNumber = currentNumber
        } else {
            calculate()
            prevNumber = currentNumber
            updateScreen(prevNumber)
        }
    }
    calculationOperator = operator
    currentNumber = ''
}

const doPercentage = () => {
    currentNumber = (parseFloat(currentNumber.replace(',', '.'))/100).toString().replace('.', ',')
}

const calculate = () => {
    let result = ''
    
    Number1 = parseFloat(prevNumber.replace(',', '.'))
    Number2 = parseFloat(currentNumber.replace(',', '.'))
    
    switch (calculationOperator) {
        case '+':
            result = Number1 + Number2
            break
        case '-':
            result = Number1 - Number2
            break
        case '*':
            result = Number1 * Number2
            break
        case '/':
            result = Number1 / Number2
            break
        default:
            return
    }
    result = result.toString().replace('.', ',')
    
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

equalSign.addEventListener("click", () => {
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

percentage.addEventListener("click", () => {
    doPercentage(currentNumber)
    updateScreen(currentNumber)
})