async function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  document.getElementById("message").innerText = data.message;
}

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  document.getElementById("message").innerText = data.message;

  // ✅ Redirect when login is successful
  if (data.message === "Login successful") {
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);

    // small delay so user sees message
    setTimeout(() => {
      window.location.href = "/portfolio.html";
    }, 500);
  }
}
