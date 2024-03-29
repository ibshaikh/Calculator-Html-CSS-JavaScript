const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

const specialChars = ["%", "*", "/", "-", "+", "="];

let output = "";

const calculate = (btnValue) => {
  if (btnValue === "=" && output !== "") {
    try {
      output = eval(output.replace("%", "/100"));
    } catch (error) {
      output = "Error";
    }
  } else if (btnValue === "AC") {
    output = "";
  } else if (btnValue === "DEL") {
    output = output.slice(0, -1);
  } else {
    // Prevent invalid input sequences like "++", "--", etc.
    if (
      specialChars.includes(btnValue) &&
      specialChars.includes(output[output.length - 1])
    ) {
      output = output.slice(0, -1); // Remove the last character
    }
    // Prevent leading zeros before numbers
    if (output === "0" && !specialChars.includes(btnValue)) {
      output = btnValue;
    } else {
      output += btnValue;
    }
  }
  display.value = output;
};

buttons.forEach((button) => {
  button.addEventListener("click", (e) => calculate(e.target.dataset.value));
});
document.addEventListener("keydown", (e) => {
    // Check if the pressed key is a digit, operator, Enter, or Backspace key
    const keyValue = e.key;
    if (
      !isNaN(keyValue) || // Check if it's a digit
      specialChars.includes(keyValue) || // Check if it's an operator
      keyValue === "Enter" || // Check if it's the Enter key
      keyValue === "Backspace" // Check if it's the Backspace key
    ) {
      e.preventDefault(); // Prevent default behavior of the key press
  
      // Treat the Enter key as "="
      const btnValue = keyValue === "Enter" ? "=" : keyValue;
      
      // Treat the Backspace key as "DEL"
      const btnAction = keyValue === "Backspace" ? "DEL" : btnValue;
  
      // Call the calculate function with the corresponding value
      calculate(btnAction);
    }
});