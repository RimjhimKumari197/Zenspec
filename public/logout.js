document.getElementById('log').addEventListener('click', function (e) {
    e.preventDefault();
    if (confirm("Are you sure you want to logout?")) {
      window.location.href = "/logout"; // Redirect to logout route
    }
  });