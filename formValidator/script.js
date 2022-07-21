const form = document.querySelector('.form');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');

// error check
function showError(input, text) {
  const target = input.parentElement;

  target.className = 'form-control error';
  const small = target.querySelector('small');
  small.innerText = text;
}

function showSuccess(input) {
  const target = input.parentElement;
  target.className = 'form-control success';
}

// Check Email Valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  re.test(String(input.value).toLowerCase())
    ? showSuccess(input)
    : showError(input, 'Email is not valid');
}

// check required string
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    input.value.trim() === ''
      ? showError(input, `${getFieldName(input)} is required.`)
      : showSuccess(input);
  });
}

// check required length
function checkLength(input, min, max) {
  const length = input.value.length;
  length < min || length > max
    ? checkMinMax(input, min, max)
    : showSuccess(input);
}

function checkMinMax(input, min, max) {
  const length = input.value.length;
  const name = getFieldName(input);
  length < min
    ? showError(input, `${name} must be at least ${min} charaters`)
    : showError(input, `${name} must be less tgan ${max} characters`);
}

function checkPasswordMatch(input1, input2) {
  input1.value.trim() === input2.value.trim()
    ? showSuccess(input)
    : showError(input, 'password is not matched');
}
// get input name
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// form eventlistener
form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkLength(password2, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
