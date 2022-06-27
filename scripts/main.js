// Run initializer function
initialize();

// Entry point of the app
function initialize() {
  // Get needed DOM elements
  const firstNumber = document.getElementById("first-num");
  const secondNumber = document.getElementById("second-num");
  const operation = document.getElementById("operation");
  const value = document.getElementById("value");
  const operationBody = document.querySelector(".operation");
  const toCalculateContainer = document.querySelector(".to-calculate");

  const nonNumbers = [
    "clear",
    "reset",
    "increment",
    "percent",
    "divide",
    "multiply",
    "subtract",
    "add",
    "equals",
    "dot",
  ];

  let needToReset = false;

  const commonOperations = {
    add: "<i class='fa-solid fa-plus'></i>",
    subtract: "<i class='fa-solid fa-minus'></i>",
    multiply: "<i class='fa-solid fa-xmark'></i>",
    divide: "<i class='fa-solid fa-divide'></i>",
  };

  // Listen for any click event in the calculator
  operationBody.addEventListener("click", (event) => {
    let button;
    if (event.target.classList.contains("box")) {
      button = event.target;
    }
    if (event.target.parentElement.classList.contains("box")) {
      button = event.target.parentElement;
    }

    // If the button being clicked is wrong, do nothing...
    if (!button) return;

    // else, continue...
    const action = button.getAttribute("data-action");

    // Entering values
    if (!nonNumbers.includes(action) && !needToReset) {
      if (parseInt(value.textContent.replaceAll(",", "")) < 1) {
        value.textContent = action;
        return;
      }

      value.textContent += action;
      value.textContent = formatNumber(value.textContent.replaceAll(",", ""));
    }

    // Reset value back to 0
    if (action === "reset") {
      value.textContent = "0";
      toCalculateContainer.classList.replace("d-flex", "hide");
      firstNumber.textContent = "";
      secondNumber.textContent = "";
      needToReset = false;
    }

    // Erase a number
    if (action === "clear" && !needToReset) {
      if (value.textContent.replaceAll(",", "").length < 2) {
        value.textContent = "0";
        return;
      }
      value.textContent = formatNumber(
        value.textContent.replaceAll(",", "").slice(0, -1)
      );
    }

    // Perform whatever the selected operation
    if (Object.keys(commonOperations).includes(action) && !needToReset) {
      const i = Object.keys(commonOperations).indexOf(action);

      if (parseInt(value.textContent.replaceAll(",", "")) < 1) return;
      const firstValue = value.textContent.replaceAll(",", "");

      toCalculateContainer.classList.replace("hide", "d-flex");
      operation.setAttribute("data-operation", action);

      value.textContent = "0";
      firstNumber.textContent = formatNumber(firstValue);
      operation.innerHTML = Object.values(commonOperations)[i];
    }

    // Get the answer
    if (action === "equals" && !needToReset) {
      if (firstNumber.textContent.length < 1) return;
      const selectedOp = operation.getAttribute("data-operation");

      secondNumber.textContent = formatNumber(
        value.textContent.replaceAll(",", "")
      );

      const fNumber = parseInt(firstNumber.textContent.replaceAll(",", ""));
      const sNumber = parseInt(value.textContent.replaceAll(",", ""));

      switch (selectedOp) {
        case "add":
          value.textContent = formatNumber(add(fNumber, sNumber));
          break;
        case "subtract":
          value.textContent = formatNumber(sub(fNumber, sNumber));
          break;
        case "multiply":
          value.textContent = formatNumber(mul(fNumber, sNumber));
          break;
        case "divide":
          value.textContent = formatNumber(div(fNumber, sNumber));
          break;
      }

      needToReset = true;
    }
  });
}

// Comma separation
function formatNumber(number) {
  return isNaN(number)
    ? 0
    : parseInt(number).toLocaleString("en-US", {
        minimumFractionDigits: 0,
      });
}

// Add numbers
function add(x, y) {
  return x + y;
}

// subtract numbers
function sub(x, y) {
  return x - y;
}

// multiply numbers
function mul(x, y) {
  return x * y;
}

// divide numbers
function div(x, y) {
  return x / y;
}
