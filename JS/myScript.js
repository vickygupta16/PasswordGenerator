import { displayModal } from "./appScript.js";
var validateOptions = () => {
  var allFunctions = [];
  if (
    !document.getElementById("cb-lc").checked &&
    !document.getElementById("cb-uc").checked
  ) {
    errorToastr(
      "Please select either lowercase or UPPERCASE or Both",
      "Alphabets Case"
    );
    return;
  } else if (
    document.getElementById("cb-lc").checked &&
    document.getElementById("cb-uc").checked
  ) {
    allFunctions.push(lowerCaseString);
    allFunctions.push(upperCaseString);
    document.getElementById("pwAlphabets").innerHTML =
      "lowercase&nbsp;&&nbsp;UPPERCASE";
  } else if (document.getElementById("cb-lc").checked) {
    allFunctions.push(lowerCaseString);
    document.getElementById("pwAlphabets").innerText = "lowercase";
  } else if (document.getElementById("cb-uc").checked) {
    allFunctions.push(upperCaseString);
    document.getElementById("pwAlphabets").innerText = "UPPERCASE";
  }
  if (document.getElementById("numbers").checked) {
    if (document.getElementById("defaultNumRange").checked) {
      allFunctions.push(defaultNumbers);
      document.getElementById("pwNumbers").innerText = "0-9";
    } else {
      if (document.getElementById("ul").value === "") {
        errorToastr("Please specify Upper Limit");
        return;
      }
      allFunctions.push(numberLimits);
      document.getElementById("pwNumbers").innerText =
        document.getElementById("ll").value +
        "-" +
        document.getElementById("ul").value;
    }
  } else {
    document.getElementById("pwNumbers").innerText = "None";
  }
  if (document.getElementById("chars-symbols").checked) {
    allFunctions.push(symbols);
  }
  if (!document.getElementById("random").checked) {
    if (document.getElementById("userInput").value === "") {
      errorToastr("Please Input any Value", "Input Required");
      return;
    }
    allFunctions.push(1);
    document.getElementById("rORui").innerText = "Your Input";
    document.getElementById("rORuiAnswer").innerText = document.getElementById(
      "userInput"
    ).value;
  } else {
    document.getElementById("rORui").innerText = "Random";
    document.getElementById("rORuiAnswer").innerText = "by ALGO";
  }
  var length;
  if (document.getElementById("defaultPWLength").checked) {
    length = 7;
  } else {
    length = document.getElementById("ud-length").value;
  }
  document.getElementById("pwLength").innerText = length;
  var strength;
  if (document.getElementById("sStrong").checked) {
    strength = 1;
    document.getElementById("pwStrength").innerText = "Strong";
  } else if (document.getElementById("sMedium").checked) {
    strength = 0;
    document.getElementById("pwStrength").innerText = "Medium";
  } else if (document.getElementById("sWeak").checked) {
    strength = -1;
    document.getElementById("pwStrength").innerText = "Weak";
  }
  if (document.getElementById("replaceChars").checked) {
    document.getElementById("substitution").innerText = "Yes";
  } else {
    document.getElementById("substitution").innerText = "No";
  }
  generatePassword(allFunctions, length, strength);
};

var generatePassword = (allFunctions, length, strength) => {
  var passWord = [];
  var i = 0;
  var userInputToBeAdded = true;
  var allFunctionsIndex = -1;
  while (i < length) {
    allFunctionsIndex = randomNumberGenerator(allFunctionsIndex, allFunctions);
    if (allFunctions[allFunctionsIndex] === 1) {
      if (
        userInputToBeAdded &&
        length - passWord.length >=
          document.getElementById("userInput").value.length
      ) {
        userInputToBeAdded = false;
        var arrayUserInput = Array.from(
          document.getElementById("userInput").value
        );
        if (document.getElementById("replaceChars").checked) {
          const symbolsForAlpha = {
            S: "$",
            I: "!",
            a: "@",
            H: "#",
            O: "0",
            E: "3",
          };
          for (var ui = 0; ui < arrayUserInput.length; ++ui) {
            for (var key in symbolsForAlpha) {
              if (key === arrayUserInput[ui]) {
                arrayUserInput[ui] = symbolsForAlpha[key];
                break;
              }
            }
          }
        }
        for (var ui = 0; ui < arrayUserInput.length; ++ui) {
          passWord.push(arrayUserInput[ui]);
          ++i;
        }
      } else {
        continue;
      }
    } else {
      passWord.push(allFunctions[allFunctionsIndex](strength));
      ++i;
    }
  }
  //console.log(finalPassWord);
  if (userInputToBeAdded && !document.getElementById("random").checked) {
    //console.log("call again");
    generatePassword(allFunctions, length, strength);
  }
  displayResult(passWord);
};

var displayResult = (passWord) => {
  var finalPassWord = "";
  for (var pw = 0; pw < passWord.length; ++pw) {
    finalPassWord += passWord[pw];
  }
  document.getElementById("passwordResult").innerText = finalPassWord;

  var cpw = document.querySelector("#passwordResult");
  var cpbtn = document.getElementById("copybtn");
  cpbtn.onclick = function () {
    document.execCommand("copy");
  };
  cpbtn.addEventListener("copy", function (event) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", cpw.textContent);
    }
  });
  displayModal();
};

var randomNumberGenerator = (prevIndex, allFunctions) => {
  var randomIndex;
  if (allFunctions.length > 2) {
    do {
      randomIndex = Math.floor(Math.random() * allFunctions.length);
    } while (randomIndex === prevIndex);
  } else {
    randomIndex = Math.floor(Math.random() * allFunctions.length);
  }
  return randomIndex;
};

var lowerCaseString = (strength) => {
  var lowerCaseValue = "";
  if (strength === -1) {
    lowerCaseValue = "aeiou";
  } else if (strength === 0) {
    lowerCaseValue = "bcdghkmnrstvx";
  } else if (strength === 1) {
    lowerCaseValue = "zywqljf";
  }
  return lowerCaseValue.charAt(
    Math.floor(Math.random() * lowerCaseValue.length)
  );
};

var upperCaseString = (strength) => {
  var upperCaseValue = "";
  if (strength === -1) {
    upperCaseValue = "AEIOU";
  } else if (strength === 0) {
    upperCaseValue = "BCDGHKMNRSTVX";
  } else if (strength === 1) {
    upperCaseValue = "ZYWQLJF";
  }
  return upperCaseValue.charAt(
    Math.floor(Math.random() * upperCaseValue.length)
  );
};

var defaultNumbers = () => {
  return Math.floor(Math.random() * 10);
};

var numberLimits = () => {
  var max = Number.parseInt(document.getElementById("ul").value);
  var min = Number.parseInt(document.getElementById("ll").value);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var symbols = (strength) => {
  var symbolStr = "";
  if (strength === -1) {
    symbolStr = "+-*/%=";
  } else if (strength === 0) {
    symbolStr = "&|~";
  } else if (strength === 1) {
    symbolStr = "^;?|<>";
  }
  return symbolStr.charAt(Math.floor(Math.random() * symbolStr.length));
};

var errorToastr = (errorMessage = "", errorTitle = "") => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-top-center",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "500",
    timeOut: "3000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr["error"](errorMessage, errorTitle);
};

window.onload = function () {
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  var defaultNumRange = document.getElementById("defaultNumRange");
  var ll = document.getElementsByClassName("ll")[0];
  var ul = document.getElementsByClassName("ul")[0];
  var udl = document.getElementById("ud-length");
  var cs = document.getElementById("chars-symbols");
  var csl = document.getElementById("chars-symbols-label");
  var num = document.getElementById("numbers");
  var numl = document.getElementById("numbers-label");
  var random = document.getElementById("random");
  var userInput = document.getElementById("userInput");
  var replaceChars = document.getElementById("replaceChars");

  document.getElementById("gp").addEventListener("click", validateOptions);

  random.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      userInput.disabled = true;
      userInput.classList.add("no-cursor");
      replaceChars.disabled = true;
      replaceChars.classList.add("no-cursor");
    } else {
      userInput.disabled = false;
      userInput.classList.remove("no-cursor");
      userInput.focus();
      replaceChars.disabled = false;
      replaceChars.classList.remove("no-cursor");
    }
  });

  num.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      numl.innerText = "Yes";
      defaultNumRange.disabled = false;
      defaultNumRange.classList.remove("no-cursor");
      defaultNumRange.checked = true;
    } else {
      numl.innerText = "No";
      defaultNumRange.disabled = true;
      defaultNumRange.classList.add("no-cursor");
      ul.classList.add("no-cursor");
      ul.disabled = true;
      ll.classList.add("no-cursor");
      ll.disabled = true;
    }
  });

  cs.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      csl.innerText = "Yes";
    } else {
      csl.innerText = "No";
    }
  });

  defaultNumRange.classList.add("no-cursor");
  ul.classList.add("no-cursor");
  ll.classList.add("no-cursor");

  defaultNumRange.addEventListener("change", (event) => {
    if (event.currentTarget.checked) {
      ul.classList.add("no-cursor");
      ul.disabled = true;
      ll.classList.add("no-cursor");
      ll.disabled = true;
    } else {
      ul.classList.remove("no-cursor");
      ul.disabled = false;
      ll.classList.remove("no-cursor");
      ll.disabled = false;
    }
  });

  document
    .getElementById("defaultPWLength")
    .addEventListener("change", (event) => {
      if (event.currentTarget.checked) {
        udl.disabled = true;
        udl.classList.add("no-cursor");
      } else {
        udl.disabled = false;
        udl.classList.remove("no-cursor");
      }
    });

  setEye();
  disableLowerCase();
  disableUpperCase();
  disableNumber();
  disableSymbol();
  setLength_Strength();

  document.getElementById("upw").oninput = detectPassword;
};

var detectPassword = () => {
  var passWord = document.getElementById("upw").value;
  document.getElementById("upwLength").innerText = document.getElementById(
    "upw"
  ).value.length;
  //console.log(passWord);
  var lowerCaseBool = false;
  var upperCaseBool = false;
  var numberBool = false;
  var symbolBool = false;
  var passWordArray = [];
  passWordArray = Array.from(passWord);
  if (passWordArray.length > 0) {
    for (var i = 0; i < passWordArray.length; ++i) {
      if (isSymbol(passWordArray[i])) {
        symbolBool = true;
      } else if (!isNaN(passWordArray[i])) {
        numberBool = true;
      } else if (passWordArray[i] === passWordArray[i].toLowerCase()) {
        lowerCaseBool = true;
      } else if (passWordArray[i] === passWordArray[i].toUpperCase()) {
        upperCaseBool = true;
      }
      //console.log(passWordArray[i]);
    }
    setStrengthValue(
      lowerCaseBool,
      upperCaseBool,
      numberBool,
      symbolBool,
      passWordArray.length
    );
    if (symbolBool) {
      enableSymbol();
    } else {
      disableSymbol();
    }
    if (numberBool) {
      enableNumber();
    } else {
      disableNumber();
    }
    if (lowerCaseBool) {
      enableLowerCase();
    } else {
      disableLowerCase();
    }
    if (upperCaseBool) {
      enableUpperCase();
    } else {
      disableUpperCase();
    }
  } else {
    document.getElementById("upwStrength").innerText = "None";
    document.getElementById("upwStrength").classList.remove("weakPW");
    document.getElementById("upwStrength").classList.remove("mediumPW");
    document.getElementById("upwStrength").classList.remove("strongPW");
    document.getElementById("upwStrength").classList.add("light-text");
    disableLowerCase();
    disableNumber();
    disableSymbol();
    disableUpperCase();
  }
};

var setStrengthValue = (
  lowerCaseBool,
  upperCaseBool,
  numberBool,
  symbolBool,
  passWordLength
) => {
  if (
    ((lowerCaseBool && upperCaseBool && numberBool && symbolBool) ||
      (lowerCaseBool && upperCaseBool && numberBool) ||
      (upperCaseBool && numberBool && symbolBool) ||
      (numberBool && symbolBool && lowerCaseBool) ||
      (symbolBool && lowerCaseBool && upperCaseBool)) &&
    passWordLength >= 8
  ) {
    document.getElementById("upwStrength").innerText = "Strong";
    document.getElementById("upwStrength").classList.remove("weakPW");
    document.getElementById("upwStrength").classList.remove("mediumPW");
    document.getElementById("upwStrength").classList.add("strongPW");
    document.getElementById("upwStrength").classList.remove("light-text");
  } else if (
    ((lowerCaseBool && upperCaseBool) ||
      (lowerCaseBool && numberBool) ||
      (lowerCaseBool && symbolBool) ||
      (upperCaseBool && numberBool) ||
      (upperCaseBool && symbolBool) ||
      (numberBool && symbolBool)) &&
    passWordLength >= 6
  ) {
    document.getElementById("upwStrength").innerText = "Medium";
    document.getElementById("upwStrength").classList.remove("weakPW");
    document.getElementById("upwStrength").classList.remove("strongPW");
    document.getElementById("upwStrength").classList.add("mediumPW");
    document.getElementById("upwStrength").classList.remove("light-text");
  } else if (
    lowerCaseBool ||
    upperCaseBool ||
    numberBool ||
    symbolBool ||
    passWordLength <= 5
  ) {
    document.getElementById("upwStrength").innerText = "Weak";
    document.getElementById("upwStrength").classList.remove("mediumPW");
    document.getElementById("upwStrength").classList.remove("strongPW");
    document.getElementById("upwStrength").classList.add("weakPW");
    document.getElementById("upwStrength").classList.remove("light-text");
  }
};

var isSymbol = (str) => {
  var symbolString = "`~!@#$%^&*()-_+=|}]{[:;',<.>/?";
  for (var i = 0; i < symbolString.length; ++i) {
    if (symbolString[i] === str || str === '"' || str === "'" || str === " ") {
      return true;
    }
  }
  return false;
};

var setEye = () => {
  document.getElementById("showpassword").innerHTML =
    "<i class='fas fa-2x fa-eye common' id='spw' title='Show Password'></i>";
  document.getElementById("spw").addEventListener("click", setSlashEye);
  document.getElementById("upw").type = "password";
  document.getElementById("upw").focus();
};

var setSlashEye = () => {
  document.getElementById("showpassword").innerHTML =
    "<i class='fas fa-2x fa-eye-slash common' id='hpw' title='Hide Password'></i>";
  document.getElementById("hpw").addEventListener("click", setEye);
  document.getElementById("upw").type = "text";
  document.getElementById("upw").focus();
};

const disableLowerCase = () => {
  document.getElementById("symbolLC").innerHTML =
    "<i class='far fa-times-circle'></i>";
  document.getElementById("lowercaseTD").classList.add("light-text");
  document.getElementById("lowercaseTD").classList.remove("confirm-text");
};

const enableLowerCase = () => {
  document.getElementById("lowercaseTD").classList.remove("light-text");
  document.getElementById("lowercaseTD").classList.add("confirm-text");
  document.getElementById("symbolLC").innerHTML =
    "<i class='far fa-check-circle'></i>";
};

const disableUpperCase = () => {
  document.getElementById("symbolUC").innerHTML =
    "<i class='far fa-times-circle'></i>";
  document.getElementById("uppercaseTD").classList.add("light-text");
  document.getElementById("uppercaseTD").classList.remove("confirm-text");
};

const enableUpperCase = () => {
  document.getElementById("uppercaseTD").classList.remove("light-text");
  document.getElementById("uppercaseTD").classList.add("confirm-text");
  document.getElementById("symbolUC").innerHTML =
    "<i class='far fa-check-circle'></i>";
};

const disableNumber = () => {
  document.getElementById("symbolNumber").innerHTML =
    "<i class='far fa-times-circle'></i>";
  document.getElementById("numberTD").classList.add("light-text");
  document.getElementById("numberTD").classList.remove("confirm-text");
};

const enableNumber = () => {
  document.getElementById("numberTD").classList.remove("light-text");
  document.getElementById("numberTD").classList.add("confirm-text");
  document.getElementById("symbolNumber").innerHTML =
    "<i class='far fa-check-circle'></i>";
};

const disableSymbol = () => {
  document.getElementById("symbolSymbol").innerHTML =
    "<i class='far fa-times-circle'></i>";
  document.getElementById("symbolTD").classList.add("light-text");
  document.getElementById("symbolTD").classList.remove("confirm-text");
};

const enableSymbol = () => {
  document.getElementById("symbolTD").classList.remove("light-text");
  document.getElementById("symbolTD").classList.add("confirm-text");
  document.getElementById("symbolSymbol").innerHTML =
    "<i class='far fa-check-circle'></i>";
};

var setLength_Strength = () => {
  document.getElementById("upwLength").innerText = 0;
  document.getElementById("upwStrength").innerText = "None";
  document.getElementById("upwStrength").classList.add("light-text");
};
