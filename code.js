// Fonction pour afficher le formulaire de connexion
function showLogin() {
  document.getElementById("login-form").style.display = "block";  // Afficher le formulaire de connexion
  document.getElementById("register-form").style.display = "none"; // Cacher le formulaire d'inscription
}

// Fonction pour afficher le formulaire d'inscription
function showRegister() {
  document.getElementById("login-form").style.display = "none";  // Cacher le formulaire de connexion
  document.getElementById("register-form").style.display = "block"; // Afficher le formulaire d'inscription
}

// Gestion de la soumission du formulaire de connexion
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const storedEmail = localStorage.getItem("userEmail");
  const storedPassword = localStorage.getItem("userPassword");
  const enteredEmail = document.getElementById("loginEmail").value;
  const enteredPassword = document.getElementById("loginPassword").value;

  if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      alert("Connexion réussie !");
      window.location.href = "generer.html"; // Redirige vers la page de génération de QR Code
  } else {
      alert("E-mail ou mot de passe incorrect.");
  }
});



  // ---------------------------------------la page generer----------------------------------
// Vérification de la connexion (si non connecté, rediriger vers la page d'accueil)
if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
} else {
  document.getElementById("navbar").style.display = "block";
}

// Logique de déconnexion
document.getElementById("logoutButton").addEventListener("click", function() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

// Génération du QR Code
document.getElementById("btnb").addEventListener("click", function() {
  const info = document.getElementById("info").value;

  // Générer le QR code
  if (info.trim() !== "") {
    QRCode.toDataURL(info, function (err, url) {
      if (err) {
        console.error(err);
        return;
      }

      // Afficher l'image du QR code
      const qrImg = document.getElementById("qr-img");
      qrImg.src = url;

      // Sauvegarder le QR code dans le localStorage
      let qrCodes = JSON.parse(localStorage.getItem("qrCodes")) || [];
      qrCodes.push({ src: url, info: info });
      localStorage.setItem("qrCodes", JSON.stringify(qrCodes));
    });
  }
});

// ---------------------------------------page lecture-----------------------------
