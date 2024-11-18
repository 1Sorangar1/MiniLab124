import {setFormValue, submitSignUpForm, submitSignInForm, validateEmail, validatePassword, validatePasswordRepeat, validateNotEmpty} from "./utils.js"


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

const first_name_id = 'first_name';
const last_name_id = 'last_name';
const password_id = 'password';
const password_id_repeat = 'password-repeat';
const email_id = 'email';
const sign_in = "sign_in"
const sign_up = "sign_up"

const sign_in_link_id = 'sign_in_link';
const sign_up_link_id = 'sign_up_link';
const sign_up_form_id = 'sign_up_form';
const sign_in_form_id = 'sign_in_form';
const sign_up_btn_id = 'sign_up_btn';
const sign_in_btn_id = 'sign_in_btn';

const emailLogin = document.getElementById('email-login');
emailLogin.oninput = (e) => setFormValue('email-login', e.target.value, validateEmail, sign_in);

const passwordLogin = document.getElementById('password-login');
passwordLogin.oninput = (e) => setFormValue('password-login', e.target.value, validatePassword, sign_in);


document.addEventListener("DOMContentLoaded", () => {
  const first_name = document.getElementById(first_name_id);
  const last_name = document.getElementById(last_name_id);
  const email = document.getElementById(email_id);
  const password = document.getElementById(password_id);
  const password_repeat = document.getElementById(password_id_repeat);

  setFormValue(first_name_id, first_name.value, validateNotEmpty, sign_up);
  setFormValue(last_name_id, last_name.value, validateNotEmpty, sign_up);
  setFormValue(email_id, email.value, validateEmail, sign_up);
  setFormValue(password_id, password.value, validatePassword, sign_up);
  setFormValue(password_id_repeat, password_repeat.value, validatePasswordRepeat, sign_up);
});

// Получаем элемент DOM-дерева по id и присваиваем значение аттрибуту oninput
// oninput вызывается с параметром "event" каждый раз, когда ввод меняется
// Значение, которое мы присваеваем этому аттрибуту - это функция, определённая в стрелочном стиле
// Гуглить по тегам "события JS", "onchange/oninput HTML", "стрелочные функции JS", ...

const first_name = document.getElementById(first_name_id);
first_name.oninput = (e) => setFormValue(first_name_id, e.target.value, validateNotEmpty, sign_up);

const last_name = document.getElementById(last_name_id);
last_name.oninput = (e) => setFormValue(last_name_id, e.target.value, validateNotEmpty, sign_up);

const email = document.getElementById(email_id);
email.oninput = (e) => setFormValue(email_id, e.target.value, validateEmail, sign_up); 

const password = document.getElementById(password_id);
password.oninput = (e) => {
  setFormValue(password_id, e.target.value, validatePassword, sign_up);
  setFormValue(password_id_repeat, password_repeat.value, validatePasswordRepeat, sign_up);
}

const password_repeat = document.getElementById(password_id_repeat);
password_repeat.oninput = (e) => setFormValue(password_id_repeat, e.target.value, validatePasswordRepeat, sign_up);

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
  submitSignUpForm();
}

const sign_in_btn = document.getElementById(sign_in_btn_id);
sign_in_btn.onclick = (e) => {
  submitSignInForm();
}
