// JavaScript pour basculer entre les formulaires et gérer la connexion
function showLogin() {
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
  }
  
  function showRegister() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("register-form").style.display = "block";
  }
  
  // Gestion de la soumission du formulaire de connexion
  document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");
    const enteredEmail = document.getElementById("loginEmail").value;
    const enteredPassword = document.getElementById("loginPassword").value;
  
    if (enteredEmail === storedEmail && enteredPassword === storedPassword) {
      localStorage.setItem("isLoggedIn", "true"); // Marque l'utilisateur comme connecté
      alert("Connexion réussie !");
      window.location.href = "generer.html"; // Redirige vers la page de génération de QR Code
    } else {
      alert("E-mail ou mot de passe incorrect.");
    }
  });
  
  // Gestion de la soumission du formulaire d'inscription
  document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
  
    // Stockage des informations de l'utilisateur dans localStorage
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
  
    alert("Inscription réussie !");
    window.location.href = "index.html"; // Redirige l'utilisateur vers la page d'accueil (connexion)
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
