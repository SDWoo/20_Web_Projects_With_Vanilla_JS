/* 
# 기능 목록
- [o] - 각 항목마다 유효성 검사하기 
- [o] - 유효성 검사해서 아니면 classList에 success or error 추가
- [o] - 유효성 검사해서 아니면 에러 메시지도 추가
*/

const form = document.querySelector('.form');

const checkUsername = () => {
  const usernameInput = document.querySelector('#username');
  const usernameForm = usernameInput.parentNode;
  const usernameMessage = usernameForm.querySelector('small');
  const usernameValue = usernameInput.value;
  if (usernameValue.length < 3) {
    usernameForm.className = 'form-control error';
    usernameMessage.innerText = 'Username must be at least 3 characters';
    return;
  }
  usernameForm.className = 'form-control success';
};

const checkEmail = () => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailInput = document.querySelector('#email');
  const emailForm = emailInput.parentNode;
  const emailMessage = emailForm.querySelector('small');
  const emailValue = emailInput.value;
  if (!emailRegex.test(emailValue)) {
    emailForm.className = 'form-control error';
    emailMessage.innerText = 'Email is not Valid';
    return;
  }
  emailForm.className = 'form-control success';
};

const checkPassword = () => {
  const passwordInput = document.querySelector('#password');
  const passwordForm = passwordInput.parentNode;
  const passwordMessage = passwordForm.querySelector('small');
  const passwordValue = passwordInput.value;
  if (passwordValue < 6) {
    passwordForm.className = 'form-control error';
    passwordMessage.innerText = 'Password must be at least 6 characters';
    return;
  }
  passwordForm.className = 'form-control success';
};

const confirmPswdCheck = () => {
  const pswd = document.getElementById('password').value;
  const confirmPswdInput = document.getElementById('password2');
  const confirmPswd = confirmPswdInput.value;
  const confirmPswdForm = confirmPswdInput.parentNode;
  const confirmPswdSmall = confirmPswdForm.querySelector('small');

  if (!confirmPswd) {
    confirmPswdForm.className = 'form-control error';
    confirmPswdSmall.innerText = 'Confirm Password is required';
    return;
  }
  if (pswd !== confirmPswd) {
    confirmPswdForm.className = 'form-control error';
    confirmPswdSmall.innerText = 'Passwords do not match';
    return;
  }
  confirmPswdForm.className = 'form-control success';
};

const handleSubmit = (e) => {
  e.preventDefault();
  checkUsername();
  checkEmail();
  checkPassword();
  confirmPswdCheck();
};

if (form) {
  form.addEventListener('submit', handleSubmit);
}
