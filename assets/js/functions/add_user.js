// initialize all the property
const name = document.getElementById('name');
const username = document.getElementById('username');
const grade = document.getElementById('grade');
const nis = document.getElementById('nis');
const imei = document.getElementById('imei');
const password = document.getElementById('password');
const birthdate = document.getElementById('birthdate');
const registerForm = document.getElementById('register-form');
const buttonSubmit = document.getElementById('button-submit');

// Lowercase the username
username.onkeyup = function() {
  username.value = username.value.toLowerCase();
};

// Show the password strength message
password.onkeyup = function() {
  const passwordStrength = document.getElementById('password-strength');

  if (password.value.length < 8) {
    passwordStrength.innerHTML =
      'password strength: <span class="text-danger font-weight-700">weak</span>';
  } else {
    passwordStrength.innerHTML =
      'password strength: <span class="text-success font-weight-700">strong</span>';
  }
};

function register() {
  const credentials = {
    name: name.value,
    username: username.value,
    grade: grade.value,
    nis: typeof nis.value === 'string' ? parseInt(nis.value) : nis.value,
    imei: imei.value,
    password: password.value,
    birthdate: birthdate.value
  };

  // Disable all field
  name.setAttribute('disabled', true);
  username.setAttribute('disabled', true);
  grade.setAttribute('disabled', true);
  nis.setAttribute('disabled', true);
  imei.setAttribute('disabled', true);
  password.setAttribute('disabled', true);
  birthdate.setAttribute('disabled', true);

  // Disable the table and set animation
  buttonSubmit.setAttribute('disabled', true);
  buttonSubmit.innerHTML = `<div class="col-lg-12 col-md-12" id="loader-screen" style="text-align:center;">

                <button type="button" style="background: transparent;border: none;" data-clipboard-text="world" title="Copy to clipboard">
                    <div style='display:flex;'>
                        <div style="color:white;font-weight: 600;">
                        Loading... 
                        </div>
                        <div style='margin-left:5px;'>
                            <i class="fas fa-forward ld ld-rush-ltr" style="font-size: 18px; color:white;"></i>
                        </div>
                    </div>
                </button>
            </div>`;

  $.ajax({
    type: 'POST',
    url: 'https://e-attendance-development.herokuapp.com/api/users',
    data: credentials,
    dataType: 'json',
    success(data, statusText, jqXHR) {
      console.log('success: ', data);

      // Set value to default
      name.value = '';
      username.value = '';
      grade.value = '';
      nis.value = '';
      imei.value = '';
      password.value = '';
      birthdate.value = '';

      // Enable all field
      name.removeAttribute('disabled');
      username.removeAttribute('disabled');
      grade.removeAttribute('disabled');
      nis.removeAttribute('disabled');
      imei.removeAttribute('disabled');
      password.removeAttribute('disabled');
      birthdate.removeAttribute('disabled');

      // Enable submit button
      buttonSubmit.removeAttribute('disabled');
      buttonSubmit.innerHTML = 'Create account';
    },
    error(jqXHR, textStatus) {
      console.log(textStatus);

      // Enable all field
      name.removeAttribute('disabled');
      username.removeAttribute('disabled');
      grade.removeAttribute('disabled');
      nis.removeAttribute('disabled');
      imei.removeAttribute('disabled');
      password.removeAttribute('disabled');
      birthdate.removeAttribute('disabled');

      // Enable submit button
      buttonSubmit.removeAttribute('disabled');
      buttonSubmit.innerHTML = 'Create account';
    }
  });
}

function onChange(event) {}
