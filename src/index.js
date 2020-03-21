function eval() {
    // Do not use eval!!!
    return;
}

function getPrioritet(operand) {
    switch (operand) {
        case '(': return 1;
        case ')': return 1;
        case '-': return 2;
        case '+': return 2;
        case '*': return 3;
        case '/': return 3;
    }
    return 0;
}

function isDelimeter(operand)
{
    if ((" ".indexOf(operand) != -1))
        return true;
    return false;
}

function expressionCalculator(expr) {
    let stack = [];
    let output = '';
    let digit=0;
    let a=0;
    let b=0;
    let result=0;

    for (let i = 0; i < expr.length; i++) {
        if (expr[i]==' ') {
            continue;
        }
        if (expr[i] == '(') {
            stack.push('(');
            continue;
        }
        if (expr[i] == ')') {
            if (stack.length == 0) {
                throw new Error('ExpressionError: Brackets must be paired');
            }
            while (stack[stack.length - 1] != '(') {
                if (stack.length < 2) {
                    throw new Error('ExpressionError: Brackets must be paired');
                }
                output += stack.pop();
            }
            stack.pop();
            continue;
        }
        if ("+-/*".indexOf(expr[i])!=-1) {
            while (stack.length != 0 && (getPrioritet(stack[stack.length - 1]) >= getPrioritet(expr[i]))) {
                output += stack.pop();
            }
            stack.push(expr[i]);
            continue;
        }
        if ((!isDelimeter(expr[i + 1]) && 
            parseInt(expr[i + 1]) >= 0) &&
           (!isDelimeter(expr[i + 2]) &&
           parseInt(expr[i + 2]) >= 0)) {

            digit = (expr[i] + expr[i + 1] + expr[i + 2]);
            i += 2;
        } else if ((!isDelimeter(expr[i + 1]) &&
                    parseInt(expr[i + 1]) >= 0)) {

            digit = (expr[i] + expr[i + 1]) + ' ';
            i++;
        } else {
            digit = expr[i] + ' ';
        }
        output += digit;
        continue;
    }
    while (stack.length != 0) {
        if (stack[stack.length - 1] == '(')
            throw new Error('ExpressionError: Brackets must be paired');
        output += stack.pop();
    }
    for (let i = 0; i < output.length; i++) {

        if (isDelimeter(output[i])) continue;

        if (parseInt(output[i])>=0) {
            if (parseInt(output[i+1])>=0 && 
                !isDelimeter(output[i+1]) && 
                parseInt(output[i+2])>=0 && 
                !isDelimeter(output[i+2])) {
                digit = parseInt((output[i] + output[i + 1] + output[i + 2]));
                i += 2;
            } else if (parseInt(output[i + 1]) >= 0) {
                digit = parseInt((output[i] + output[i + 1]));
                i++;
            } else {
                digit = parseInt(output[i]);
            }
            stack.push(digit);
        } else {
            b = stack.pop();
            a = stack.pop();
            switch (output[i]) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': {
                    if (b == 0) {
                        throw new Error('TypeError: Division by zero.');
                    }
                    result = a / b;
                    break;
                }
            }
            stack.push(result);
        }
    }
    return stack[0] ? stack[0] : 0;
}

module.exports = {
    expressionCalculator
}