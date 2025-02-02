const display = document.querySelector("#display");

const isNumber = (num) => !isNaN(parseFloat(num));

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
    } else {
        display.value += input;
    }
};

const evaluateExpression = (expression) => {
    const tokens = expression.match(/(\d+\.?\d*)|([+\-*/])/g);
    if (!tokens) throw new Error("uhh");
    let result = parseFloat(tokens[0]);

    for (let i = 1; i <= tokens.length; i += 2) {
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
                if (nextNum === 0) throw new Error("can't do that ;)");
                result /= nextNum;
                break;
            case "*":
                result *= nextNum;
                break;
        }
    }

    return result;
};

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClicks);
});

console.log(evaluateExpression(3+5));