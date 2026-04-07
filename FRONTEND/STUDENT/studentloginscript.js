document.addEventListener('DOMContentLoaded', function () {

  const loginBtn = document.querySelector('.button-container .btn'); //selects the first element with class 'btn' 

  loginBtn.addEventListener('click', function (e) {
    e.preventDefault(); // stop page reloading

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const user = loginUser(username, password);

      if (user.role === "admin") {
        alert("Admin cannot login from student page");
        return;
      }

      window.location = "Homepages.html";
    } catch (err) {
      alert("Invalid username or password");
    }
  });

});
