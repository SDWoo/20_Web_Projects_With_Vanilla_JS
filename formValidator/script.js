const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;

  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;

  formControl.className = 'form-control success';
}

function valueValidation(input, message) {
  if (input.value === '') {
    showError(input, message);
  } else {
    showSuccess(input);
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(String(email).toLowerCase());
}
// Event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  valueValidation(username, 'Username is required');
  valueValidation(email, 'email is required');
  valueValidation(password, 'password is required');
  valueValidation(password2, 'password2 is required');
});
