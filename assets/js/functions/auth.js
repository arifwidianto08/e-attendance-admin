const logoutWidget = document.getElementById('logout_widget');

function checkAuth() {
  const admin_token = localStorage.getItem('e_attendance_token');
  const profile = JSON.parse(localStorage.getItem('e_attendance_user'));
  const nameBar = document.getElementById('name_profile');

  if (!admin_token) {
    window.location.href = './login.php';
  }

  nameBar.textContent = profile.name || '-';
}

async function logout() {
  await localStorage.clear();
  window.location.href = './login.php';
}

checkAuth();
