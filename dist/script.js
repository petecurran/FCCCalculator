function App() {
  //Array of buttons
  const buttons = [
  {
    "id": "equals",
    "label": "=" },

  {
    "id": "zero",
    "label": "0" },

  {
    "id": "one",
    "label": "1" },

  {
    "id": "two",
    "label": "2" },

  {
    "id": "three",
    "label": "3" },

  {
    "id": "four",
    "label": "4" },

  {
    "id": "five",
    "label": "5" },

  {
    "id": "six",
    "label": "6" },

  {
    "id": "seven",
    "label": "7" },

  {
    "id": "eight",
    "label": "8" },

  {
    "id": "nine",
    "label": "9" },

  {
    "id": "add",
    "label": "+" },

  {
    "id": "subtract",
    "label": "-" },

  {
    "id": "multiply",
    "label": "*" },

  {
    "id": "divide",
    "label": "/" },

  {
    "id": "decimal",
    "label": "." },

  {
    "id": "clear",
    "label": "CE" }];


  //Instance variables
  const operand = React.useRef("0");
  const operator = React.useRef("");
  const prevOperand = React.useRef("");
  const equalFlag = React.useRef(false);

  //States for the two displays
  const [prevDisplay, setPrevDisplay] = React.useState("");
  const [display, setDisplay] = React.useState("0");

  //Update the display when we setDisplay
  React.useEffect(() => {
    setDisplay(operand.current.toString() + " " + operator.current.toString());
  });

  //Create the buttons using the array above
  const buttonDisplay = buttons.map((item) => /*#__PURE__*/
  React.createElement(CalcButton, { key: item.id, id: item.id, label: item.label, handleClick: handleClick }));


  //When a button is clicked
  function handleClick(label) {
    calculate(label);
    setDisplay(operand.current.toString() + " " + operator.current.toString());
    setPrevDisplay(prevOperand.current);
  };

  //Main workhorse. Update the numbers.
  function calculate(label) {
    switch (label) {
      case "CE":
        clearAll();
        break;
      case ".":
        //Handle decimal
        handleDecimal();
        break;
      case "+":
        //Handle plus
        handleOperator("+");
        break;
      case "-":
        //Handle minus
        handleOperator("-");
        break;
      case "*":
        //Handle times
        handleOperator("*");
        break;
      case "/":
        //Handle divide
        handleOperator("/");
        break;
      case "=":
        //Output answer
        calcAnswer();
        break;
      default:
        //Handle numbers
        handleOperands(label);
        break;}

  }

  function handleOperator(label) {
    if (equalFlag.current == true) {
      equalFlag.current = false;
    }

    //Handle negative inputs
    if (label == "-") {
      //If we haven't typed an operator yet...
      if (operand.current == "" || operand.current == "0") {
        //Add a minus sign before it
        operand.current = "-";
        //Or if there's no operator yet...
      } else if (operator.current != "") {
        //Set the operator to negative
        operator.current = operator.current + " " + "-";
        //Otherwise just update the operator.
      } else {
        operator.current = "-";
      }
      //For all of the other operators
    } else {
      operator.current = label;
    }
  }

  function clearAll() {
    operand.current = "0";
    operator.current = "";
    prevOperand.current = "";
  }

  function handleDecimal() {
    //If there's no operand, and <2 decimal points so far
    if (operator.current == "" && !operand.current.includes(".")) {
      operand.current = operand.current + ".";
    }
  }

  function handleOperands(label) {
    if (equalFlag.current == true) {
      operand.current = "0";
      prevOperand.current = "";
      equalFlag.current = false;
    };

    //If there isn't an operator
    if (operator.current == "") {
      //If the operand is 0 and doesn't have a decimal point after it...
      if (operand.current[0] == "0" && !operand.current.includes(".")) {
        //...replace the operand. ie 0 becomes 1
        operand.current = label;
        //Otherwise add to it
      } else {
        operand.current = operand.current + label;
      }
      //If there is an operator
    } else {

      //Move the current operand to prevDisplay
      prevOperand.current = prevOperand.current + " " + operand.current + " " + operator.current;
      //Clear the operator
      operator.current = "";
      operand.current = label;
    }
  };

  function calcAnswer() {
    //Check if we've just had an equals, and ignore if so.
    //the OR blocks it if we have an operator (stops partial sums)
    if (equalFlag.current == true || operator.current != "") {
      return;
    }

    //Add the whole question string to the prevOperand
    const output = eval(prevOperand.current + operand.current);
    prevOperand.current = prevOperand.current + " " + operand.current;
    operand.current = output.toString();
    prevOperand.current = "";
    equalFlag.current = true;
  };


  return /*#__PURE__*/(
    React.createElement("div", { id: "calculator" }, /*#__PURE__*/
    React.createElement("h4", { id: "brand" }, "SACIO"), /*#__PURE__*/
    React.createElement("div", { id: "combinedDisplay" }, /*#__PURE__*/
    React.createElement("h4", { id: "prevDisplay" }, prevDisplay), /*#__PURE__*/
    React.createElement("h1", { id: "display" }, display)), /*#__PURE__*/

    React.createElement("div", { id: "buttonDisplay" }, /*#__PURE__*/
    React.createElement("div", { id: "solar" }),
    buttonDisplay)));



}

function CalcButton(props) {
  return /*#__PURE__*/(
    React.createElement("button", { id: props.id, className: "grid-item calcButton", onClick: () => props.handleClick(props.label) },
    props.label));



}


const app = /*#__PURE__*/React.createElement(App, null);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(app);