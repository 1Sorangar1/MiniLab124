const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false

export const validatePassword = (e) => {
  const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!\"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~])(?=.{10,}).*$/;
  return regExp.test(e);
};



export const validateEmail = (email) => {
  // Используем регулярное выражение для проверки email
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regExp.test(email.toLowerCase()); // Возвращаем строго true или false
};


// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
  // Происходит функциональная мгаия, читай строчку кода ниже как:
  // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
  // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
  return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}


// Функция возвращающая которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
  formValues[valueKey] = newValue;

  if (validator !== undefined) {
    const isValid = validator(newValue);
    formValidation[valueKey] = isValid;
  }
};




// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
  if (!getValidationStatus()) {
    console.log("SIGN UP FORM IS INCORRECT")
    return false
  }
  console.log("SIGN UP FORM IS FINE")
  console.log(formValues)
  return true
}

export const submitSignInForm = () => {
  if (!getValidationStatus()) {
    console.log("SIGN IN FORM IS INCORRECT")
    return false
  }
  console.log("SIGN IN FORM IS FINE")
  console.log(formValues)
  return true
}