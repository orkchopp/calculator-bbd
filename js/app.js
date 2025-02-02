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

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", handleButtonClicks);
});