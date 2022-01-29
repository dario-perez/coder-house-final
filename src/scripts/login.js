//__________________________________________________________variables

//sign in form
const signInForm = document.querySelector('.sign-in-form');
const signInUser = document.querySelector('.sign-in-user');
const signInPass = document.querySelector('.sign-in-password');
const signInBtn = document.querySelector('.sign-in-btn');
const signInUserError = document.querySelector('.signinuser-error');
const signInPassError = document.querySelector('.signinpass-error');

//sign up form
const signUpForm = document.querySelector('.sign-up-form');
const signUpUser = document.querySelector('.sign-up-user');
const signUpEmail = document.querySelector('.sign-up-email');
const signUpPass = document.querySelector('.sign-up-pass');
const signUpBtn = document.querySelector('.sign-up-btn');
const signUpUserError = document.querySelector('.signupuser-error');
const signUpEmailError = document.querySelector('.signupemail-error');
const signUpPassError = document.querySelector('.signuppass-error');

//__________________________________________________________events

//sign in button
signInForm.addEventListener('submit', (e) => {
  e.preventDefault();

  signInImputs();
  signInForm.reset();
});

//sign up button
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault();

  signUpImputs();
  signUpForm.reset();
});

//__________________________________________________________functions

//sign in functions
function signInImputs() {
  //get values
  const signInUserValue = signInUser.value.trim();
  const signInPassValue = signInPass.value.trim();

  if (signInUserValue.length < 6 || signInUserValue.length > 16) {
    //user names error
    signInUserError.classList.remove('hidden-error');
    setTimeout(() => {
      signInUserError.classList.add('hidden-error');
      signInUserError.removeChild();
    }, 2000);
  }

  if (signInPassValue.length < 6 || signInPassValue.length > 16) {
    //password error
    signInPassError.classList.remove('hidden-error');
    setTimeout(() => {
      signInPassError.classList.add('hidden-error');
      signInPassError.removeChild();
    }, 2000);
  }
}

//sign up functions
function signUpImputs() {
  const signUpUserValue = signUpUser.value.trim();
  const signUpEmailValue = signUpEmail.value.trim();
  const signUpPassValue = signUpPass.value.trim();

  if (signUpUserValue.length < 6 || signUpUserValue.length > 16) {
    //user names error
    signUpUserError.classList.remove('hidden-error');
    setTimeout(() => {
      signUpUserError.classList.add('hidden-error');
      signUpUserError.removeChild();
    }, 2000);
  }

  if (signUpEmailValue === '' || !isEmail(signUpEmailValue)) {
    //error de email
    signUpEmailError.classList.remove('hidden-error');
    setTimeout(() => {
      signUpEmailError.classList.add('hidden-error');
      signUpEmailError.removeChild();
    }, 2000);
  }

  function isEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );
  }

  if (signUpPassValue.length < 6 || signUpPassValue.length > 16) {
    //password errors
    signUpPassError.classList.remove('hidden-error');
    setTimeout(() => {
      signUpPassError.classList.add('hidden-error');
      signUpPassError.removeChild();
    }, 2000);
  }
}
