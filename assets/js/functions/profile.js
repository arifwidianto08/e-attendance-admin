const admin = JSON.parse(localStorage.getItem('e_attendance_user') || '{}');

$(document).ready(function() {
  getProfile(admin.id);
});

function getProfile(id) {
  $.get(
    `https://e-attendance-development.herokuapp.com/api/admins/${id}`,
    function(response) {
      const { username, name } = response.data;
      const greetingText = document.getElementById('greeting-text');
      const usernameField = document.getElementById('input-username');
      const fullnameField = document.getElementById('input-full-name');
      const textProfile = document.getElementById('text-profile');

      textProfile.textContent = name;
      greetingText.textContent = name;
      usernameField.value = username;
      fullnameField.value = name;
    }
  );
}
