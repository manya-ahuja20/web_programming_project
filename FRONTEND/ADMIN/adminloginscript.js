document.addEventListener('DOMContentLoaded', function () {

  const loginBtn = document.querySelector('.button-container .btn'); // selects the first element with class 'btn'

  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();   // stop default reloading

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
      const user = loginUser(username, password);

      if (user.role !== "admin") {
        alert("Access denied: not an admin");
        return;
      }

      window.location = "Homepagea.html";  
    } catch (err) {
      alert("Invalid username or password");
    }
  });

});
