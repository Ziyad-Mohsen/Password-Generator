// DOM Elements
const pwLength = document.getElementById("length");
const lowercase = document.getElementById("lowercase");
const uppercase = document.getElementById("uppercase");
const numbers = document.getElementById("numbers");
const sympolsEl = document.getElementById("sympols");
const pw = document.querySelector(".pw");
const generate = document.getElementById("generate");
const copyBtn = document.getElementById("copy-btn");
// Password Options
const lowercaseChar = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const sympols = "!@#$%^&*()_+-";
const nums = "0123456789";
let password = "";

// Events
generate.onclick = function () {
  let pwLen = pwLength.value;
  let includes = [];
  if (lowercase.checked) {
    includes.push(lowercaseChar);
  }
  if (uppercase.checked) {
    includes.push(uppercaseChar);
  }
  if (sympolsEl.checked) {
    includes.push(sympols);
  }
  if (numbers.checked) {
    includes.push(nums);
  }
  // Check if the user checked at least one input
  if (includes.length > 0) {
    addTextToElement(generatePassword(includes, pwLen), pw);
  } else {
    addTextToElement("Pick At Least 1 Option", pw);
  }
};

copyBtn.onclick = function () {
  copyPasswordToClipboard(password);
};

// Return A Random Char
function getRandom(chars) {
  let r = Math.floor(Math.random() * chars.length);
  return chars[r];
}

function generatePassword(settings, len) {
  password = "";
  for (let i = 0; i < len; i++) {
    password += getRandom(
      settings[Math.floor(Math.random() * settings.length)]
    );
  }
  return password;
}

function addTextToElement(text, el) {
  el.textContent = text;
}

function copyPasswordToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyPasswordToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      alert("Copied");
    },
    function (err) {
      alert("Could not copy text: ", err);
    }
  );
}

// In Old Browsers
function fallbackCopyPasswordToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    alert("Copied");
  } catch (err) {
    alert("unable to copy", err);
  }

  document.body.removeChild(textArea);
}
