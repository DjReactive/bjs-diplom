const userForm = new UserForm();

userForm.loginFormCallback = data => {
  ApiConnector.login(data, response => {
    if (!response.success) userForm.setLoginErrorMessage(response.error);
    else {
      userForm.setLoginErrorMessage('Авторзация прошла успешно!');
      location.reload();
    }
  });
}

userForm.registerFormCallback = data => {
  ApiConnector.register(data, response => {
    console.log(response);
    if (!response.success) userForm.setRegisterErrorMessage(response.error);
    else {
      userForm.setRegisterErrorMessage('Регистрация прошла успешно!');
      location.reload();
    }
  });
}
