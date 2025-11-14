// Get reference to the display element
const display = document.getElementById("display");

// Select all buttons with the 'btn' class
const buttons = document.querySelectorAll(".btn");

// Store the current input/expression as a string
let current = "";

// Update the text shown on the display
function updateDisplay(value) {
  // If the current value is empty, show 0
  display.textContent = value === "" ? "0" : value;
}

// Add a click event listener to every button
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Clear button: reset everything
    if (value === "C") {
      current = "";
      updateDisplay(current);
      return;
    }

    // Backspace button: remove last character
    if (value === "⌫") {
      current = current.slice(0, -1);
      updateDisplay(current);
      return;
    }

    // Equals button: try to evaluate the expression
    if (value === "=") {
      if (current.trim() === "") return;

      try {
        // Evaluate the string expression, e.g. "2+3*4"
        const result = eval(current);
        current = result.toString();
        updateDisplay(current);
      } catch (error) {
        // If something goes wrong, show Error and reset
        updateDisplay("Error");
        current = "";
      }
      return;
    }

    // Handle the percentage button
    if (value === "%") {
      // Convert current number to percentage (divide by 100)
      if (current !== "") {
        try {
          const asNumber = eval(current);
          current = (asNumber / 100).toString();
          updateDisplay(current);
        } catch (error) {
          updateDisplay("Error");
          current = "";
        }
      }
      return;
    }

    // List of operator characters
    const operators = ["+", "-", "*", "/"];
    const lastChar = current[current.length - 1];

    // Avoid typing two operators in a row (e.g. ++, **, //)
    if (operators.includes(value) && operators.includes(lastChar)) {
      // Replace the last operator with the new one
      current = current.slice(0, -1) + value;
      updateDisplay(current);
      return;
    }

    // Add clicked button value to current expression
    current += value;
    updateDisplay(current);
  });
});
