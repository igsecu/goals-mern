// Validates password
const validatePassword = (password) => {
  if (!password) return "Password is missing";
  if (typeof password !== "string") return "Password must be a string";
  if (password.length < 8) return "Password must be at least 8 characters long";
  if (!hasCapitalLetter(password))
    return "Password must have one capital letter";
  if (!hasNumber(password)) return "Password must have one number";
  if (!hasSymbol(password)) return "Password must have one symbol";
  if (!hasSmallLetter(password)) return "Password must have one small letter";
  return false;
};

// Validates email
const validateEmail = (email) => {
  if (email === 0 || email === false) return "Email must be a string";
  if (!email) return "Email is missing";
  if (typeof email !== "string") return "Email must be a string";
  if (email.split("@").length !== 2) return "Email format is not valid";
  if (email.split("@")[1].split(".").length < 2)
    return "Email format is not valid";
  for (s of email.split("@")[1].split(".")) {
    if (hasSymbol(s)) return "Email format not valid";
    if (hasNumber(s)) return "Email format not valid";
  }

  return false;
};

// Validates name
const validateName = (name) => {
  // if (text === 0) return "Name must be a string";
  if (!name) return "Name is missing";
  if (typeof name !== "string") return "Name must be a string";
  return false;
};

/******************************* */

const hasCapitalLetter = (password) => {
  const passwordToArray = Array.from(password);

  for (c of passwordToArray) {
    if (capitalLetters.includes(c)) {
      return true;
    }
  }

  return false;
};

const hasSmallLetter = (password) => {
  const passwordToArray = Array.from(password);

  for (c of passwordToArray) {
    if (smallLetters.includes(c)) {
      return true;
    }
  }

  return false;
};

const hasNumber = (password) => {
  const passwordToArray = Array.from(password);

  for (c of passwordToArray) {
    if (nums.includes(c)) {
      return true;
    }
  }

  return false;
};

const hasSymbol = (password) => {
  const passwordToArray = Array.from(password);

  for (c of passwordToArray) {
    if (symbols.includes(c)) {
      return true;
    }
  }

  return false;
};

const smallLetters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const capitalLetters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

const symbols = [
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "-",
  "_",
  "<",
  ">",
  ".",
  ",",
  "?",
  "/",
  "\\",
  "|",
  "=",
  "+",
  "-",
];

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};
