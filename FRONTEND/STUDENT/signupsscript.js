document.addEventListener('DOMContentLoaded', function () {

  const signupBtn = document.querySelector('.button-container .btn'); // SIGN UP button

  signupBtn.addEventListener('click', function (e) {
    e.preventDefault();   // stop page reloading by default

    const name = document.getElementById('Name').value;
    const username = document.getElementById('username').value;
    const department = document.getElementById('Department').value;
    const club = document.getElementById('Club').value;
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirm-password').value;

    if (!name || !username || !password) {
      alert("Please fill required fields");
      return;
    }

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

  const newUser = registerUser({
  name: name,
  username: username,
  password: password,
  role: "student",
  department: department,
  club: club
  });

  saveSession({ userId: newUser.id, role: newUser.role });   // login the new user
  alert("Signup successful");
  window.location = "Homepages.html";
  });

});
