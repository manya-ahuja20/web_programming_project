document.addEventListener('DOMContentLoaded', function () {

  const signupBtn = document.querySelector('.button-container .btn'); // SIGN UP button

  signupBtn.addEventListener('click', function (e) {
    e.preventDefault();   // stop page navigation

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

    const newUser= registerUser({
      name: name,
      username: username,
      password: password,
      role: "admin",
      department: department,
      club: club
    });

    saveSession({userId: newUser.id, role:newUser.role});   // LOGIN the new user
    alert("Admin signup successful");
    window.location = "Homepagea.html";
  });

});
