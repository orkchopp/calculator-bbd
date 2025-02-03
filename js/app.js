const display = document.querySelector("#display");

const handleButtonClicks = (event) => {
    const input = event.target.value;

    if (input === "=") {
        try {
            const result = evaluateExpression(display.value);
            display.value = result;
        } catch (error) {
            display.value = "Error";
        }
    } else if (input === "AC") {
        display.value = "";
    } else if (input === "del") {
        display.value = display.value.slice(0, -1);
    } else if (input === "π") {
        display.value += Math.PI;
    } else if (input === "x^2") {
        display.value += "^2";
    } else if (input === "x^y") {
        display.value += "^";
    } else if (input === "x!") {
        display.value += "!";
    } else if (input === "%") {
        display.value += "%";
    } else {
        display.value += input;
    }
};

const evaluateExpression = (expression) => {
    expression = expression.replace(/π/g, Math.PI);
    expression = expression.replace(/(\d+)!/g, (_, num) => factorial(parseInt(num)));
    expression = expression.replace(/(\d+)\^(\d+)/g, (_, base, exponent) => Math.pow(parseFloat(base), parseFloat(exponent)));
    expression = expression.replace(/√(\d+)/g, (_, num) => Math.sqrt(parseFloat(num)));
    expression = expression.replace(/sin\(([^)]+)\)/g, (_, num) => Math.sin(degreesToRadians(parseFloat(num))));
    expression = expression.replace(/cos\(([^)]+)\)/g, (_, num) => Math.cos(degreesToRadians(parseFloat(num))));
    expression = expression.replace(/tan\(([^)]+)\)/g, (_, num) => Math.tan(degreesToRadians(parseFloat(num))));
    expression = expression.replace(/(\d+)%/g, (_, num) => parseFloat(num) / 100);
    const tokens = expression.match(/(\d+\.?\d*)|([+\-*/])/g);
    if (!tokens) throw new Error("Invalid");

    let result = parseFloat(tokens[0]);
    console.log(tokens);
    
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNum = parseFloat(tokens[i + 1]);

        switch (operator) {
            case "+":
                result += nextNum;
                break;
            case "-":
                result -= nextNum;
                break;
            case "/":
                if (nextNum === 0) throw new Error("Division by zero");
                result /= nextNum;
                break;
            case "*":
                result *= nextNum;
                break;
            default:
                throw new Error("Unknown operator");
        }
    }

    return result;
};

const factorial = (num) => {
    if (num === 0 || num === 1) return 1;
    let result = 1;
    for (let i = 2; i <= num; i++) {
        result *= i;
    }
    return result;
};

const degreesToRadians = (degrees) => {
    return degrees * (Math.PI / 180);
};

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClicks);
});

document.addEventListener("keydown", (event) => {
    const keyMap = { Enter: "=", Backspace: "del", Escape: "AC" };
    if (keyMap[event.key] || "0123456789+-*/().".includes(event.key)) {
        event.preventDefault();
        handleButtonClicks({ target: { value: keyMap[event.key] || event.key } });
    }
});