const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let current = "";   // what the user has typed so far

function updateDisplay(value) {
  display.textContent = value === "" ? "0" : value;
}

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") {
      // Clear everything
      current = "";
      updateDisplay(current);
      return;
    }

    if (value === "⌫") {
      // Backspace: remove last character
      current = current.slice(0, -1);
      updateDisplay(current);
      return;
    }

    if (value === "=") {
      // Try to calculate the result
      if (current.trim() === "") return;

      try {
        // eval is fine for a small local project, but not for real apps
        const result = eval(current);
        current = result.toString();
        updateDisplay(current);
      } catch (error) {
        updateDisplay("Error");
        current = "";
      }
      return;
    }

    // Prevent two operators in a row (e.g. ++, **, //)
    const operators = ["+", "-", "*", "/", "%"];
    const lastChar = current[current.length - 1];

    if (operators.includes(value) && operators.includes(lastChar)) {
      // Replace the last operator with the new one
      current = current.slice(0, -1) + value;
      updateDisplay(current);
      return;
    }

    // Append the pressed button value
    current += value;
    updateDisplay(current);
  });
});
