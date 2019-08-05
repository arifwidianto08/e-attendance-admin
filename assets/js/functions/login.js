const username = document.getElementById('username');
const password = document.getElementById('password');
const buttonLogin = document.getElementById('btn-login');

function checkAuth() {
  const admin_token = localStorage.getItem('e_attendance_token');

  if (admin_token) {
    window.location.href = './index.php';
  }
}

function login() {
  const credentials = {
    username: username.value,
    password: password.value
  };

  buttonLogin.setAttribute('disabled', true);

  $.ajax({
    type: 'POST',
    url: 'https://e-attendance-development.herokuapp.com/api/admins/login',
    data: credentials,
    dataType: 'json',
    success(data, statusText, jqXHR) {
      // Set to Local Storage
      localStorage.setItem('e_attendance_user', JSON.stringify(data.data));
      localStorage.setItem('e_attendance_token', data.data.token);
      localStorage.setItem(
        'e_attendance_refresh_token',
        data.data.refresh_token
      );

      // Set value to default
      username.value = '';
      password.value = '';
      buttonLogin.removeAttribute('disabled');
      // redirect to home/dashboard
      window.location.href = './index.php';
    },
    error(jqXHR, textStatus) {
      console.log(textStatus);

      // Set value to default
      username.value = '';
      password.value = '';
      buttonLogin.removeAttribute('disabled');
    }
  });
}

checkAuth();
