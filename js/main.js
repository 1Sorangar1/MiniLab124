import {setFormValue, submitSignUpForm, submitSignInForm, validateEmail, validatePassword, getValidationStatus, validatePasswordMatch} from "./utils.js"


////// ДЕМОНСТРАЦИОННЫЙ УЧАСТОК КОДА. На оценку не влияет, исключительно для саморазвития.

// Предлагаю "поиграться" с частями кода ниже, чтобы познакомиться с JS
// Получаем элемент и меняем его класс, который определеён в библиотеке стилей materialize
//const password = document.getElementById('password');
//password.classList.add("valid")
//password.classList.remove("valid")

// В браузере можно посмотреть, что из себя представляет документ
// (CTRL+SHIFT+i для открытия консоли и открыть вкладку "консоль", туда будет залогированно значение)
console.log("Document")
console.log(document)

// Если запросить id, которого нет в DOM дереве - вернется undefined
// => надо быть осторожней: коллега может поменять id вашего элемента и упадёт !ВАШ! код
// const first_name = document.getElementById('first_name_invalid');
// first_name.oninput = (e) => validatePassword(e)

// Селекция по классу. Может пригодится, для того, чтобы упростить обработку полей в двух формах.
// Чтобы не делать кучу уникальных айди, можно определённым полям формы давать один класс и обрабатывать их в цикле
// const passwords = document.querySelectorAll('.password')
// console.log(passwords)
// for (const password of passwords) {
//   password.style.background = "red"
// }

////// КОНЕЦ ДЕМОНСТРАЦИОННОГО УЧАСТКА КОДА. Дальше код для оцениваемой части задания


// Выписываем все айдишники HTMl-элементов в константы для переиспользования
// const first_name_id = 'first_name'
// const last_name_id = 'last_name'
// const password_id = 'password'
// const email_id = 'email'

const sign_in_link_id = 'sign_in_link'
const sign_up_form_id = 'sign_up_form'
const sign_in_btn_id = 'sign_in_btn'
const sign_up_btn_id = 'sign_up_btn'
const sign_in_form_id = 'sign_in_form'
const sign_up_link_id = 'sign_up_link'


// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

// const first_name = document.getElementById(first_name_id);
// first_name.oninput = (e) => setFormValue(first_name_id, e.target.value)  // Установить значение без валидации

// const email = document.getElementById(email_id);
// email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail) // Установить значение с валидацией

// const password = document.getElementById(password_id);
// password.oninput = (e) => setFormValue(password_id, e.target.value, validatePassword) //Установить значение пароля с валидацией

const updateButtonState = () => {
  const signUpButton = document.getElementById('sign_up_btn');
  const signInButton = document.getElementById('sign_in_btn');

  const isFormValid = getValidationStatus();

  signUpButton.disabled = !isFormValid;
  signInButton.disabled = !isFormValid;

};

const signUpFields = ['email_sign_up', 'password_sign_up', 'password-repeat'];

const signInFields = ['email_sign_in', 'password_sign_in'];

const emailSelector = ".email";
const passwordSelector = ".password";

const emailInputs = document.querySelectorAll(emailSelector);
const passwordInputs = document.querySelectorAll(passwordSelector);

const updateValidationClasses = (elements, validator) => {
  elements.forEach((element) => {
    const isValid = validator(element.value);
    if (isValid) {
      element.classList.add('valid');
      element.classList.remove('invalid');
    } else {
      element.classList.add('invalid');
      element.classList.remove('valid');
    }

    //console.log(`Element: ${element.id}, Classes: ${element.className}`);
  });
};

emailInputs.forEach((emailInput) => {
  emailInput.oninput = () => {
    setFormValue("email", emailInput.value, validateEmail);
    updateValidationClasses(emailInputs, validateEmail);
    updateButtonState(sign_up_form_id, sign_up_btn_id, signUpFields);
    updateButtonState(sign_in_form_id, sign_in_btn_id, signInFields);
  };
});

passwordInputs.forEach((passwordInput) => {
  passwordInput.oninput = () => {
    setFormValue("password", passwordInput.value, validatePassword);
    updateValidationClasses(passwordInputs, validatePassword);
    updateButtonState(sign_up_form_id, sign_up_btn_id, signUpFields);
    updateButtonState(sign_in_form_id, sign_in_btn_id, signInFields);
  };
});

const confirmPasswordInput = document.getElementById("password-repeat");
confirmPasswordInput.oninput = () => {
  const password = document.getElementById("password_sign_up").value;
  const confirmPassword = confirmPasswordInput.value;

  // Устанавливаем статус в formValidation
  setFormValue("confirmPassword", confirmPassword, (value) =>
    validatePasswordMatch(password, value)
  );

  // Обновляем стили для визуальной индикации
  if (validatePasswordMatch(password, confirmPassword)) {
    confirmPasswordInput.classList.add("valid");
    confirmPasswordInput.classList.remove("invalid");
  } else {
    confirmPasswordInput.classList.add("invalid");
    confirmPasswordInput.classList.remove("valid");
  }

  updateButtonState();
};


// Меняем стили объекта DOM дерева. Это позволяет скрыть форму регистрации и показать форму авторизации
// Объект формы не исключается из DOM дерева, а просто становистя невидимым
const switch_to_sign_in = document.getElementById(sign_in_link_id);
switch_to_sign_in.onclick = (e) => {
  document.getElementById(sign_up_form_id).style.display = "none"
  document.getElementById(sign_in_form_id).style.display = ""
}

const switch_to_sign_up = document.getElementById(sign_up_link_id);
switch_to_sign_up.onclick = (e) => {
  document.getElementById(sign_in_form_id).style.display = "none"
  document.getElementById(sign_up_form_id).style.display = ""
}

const sign_up_btn = document.getElementById(sign_up_btn_id);
sign_up_btn.onclick = (e) => {
  submitSignUpForm()
}

const sign_in_btn = document.getElementById(sign_in_btn_id);
sign_in_btn.onclick = (e) => {

  submitSignInForm()
}
