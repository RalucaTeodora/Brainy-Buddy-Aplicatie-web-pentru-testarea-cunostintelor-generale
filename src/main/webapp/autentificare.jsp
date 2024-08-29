<%@ page contentType="text/html; charset=UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Brainy Buddy Cont Nou</title>
<link rel="icon" href="imagini/favicon.ico" type="image/x-icon">
<link rel="stylesheet" href="css/style.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<style>
.form-group {
    margin-bottom: 20px;
    position: relative;
}

.form-group label {
    margin-right: 10px;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
    width: 100%;
    font-size: 16px;
    border-radius: 5px;
}

.form-group input[type="checkbox"] {
    margin-right: 5px;
}

.form-group .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    margin-left: 300px;
}

.footer3 {
    margin-bottom: 100px;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin-top: 50px;
    margin-bottom: 15px;
    color: #888;
}

.footer3 s {
    text-decoration: none;
    margin-bottom: 20px;
}
</style>
</head>

<body style="background-image: url('imagini/background.jpg'); background-size: cover; background-position: center;">
<nav>
    <a href="index.html" class="logo-container" style="text-decoration: none;">
        <img src="imagini/brainy.png" alt="logo-site">
        <h1 class="logotitlu">Brainy Buddy</h1>
    </a>
    <div class="button-container">
        <a href="index.html" class="button">Back</a>
    </div>
</nav>
<div class="separator"></div>

<input type="hidden" id="stare" value="<%= request.getAttribute("stare") %>">

<div class="main">
    <section class="signup">
        <div class="container22">
            <div class="autentificare-content">
                <div class="autentificare1">
                    <h2 class="titlu">Create new account</h2>

                    <form method="post" action="autentificare" class="autentificare-form" id="register-form" onsubmit="return validateForm();">
                        <div class="form-group">
                            <label for="username"><i class="material-icons">account_circle</i></label>
                            <input type="text" name="username" id="username" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label for="email"><i class="material-icons">email</i></label>
                            <input type="email" name="email" id="email" placeholder="Email" />
                        </div>
                        <div class="form-group">
                            <label for="parola"><i class="material-icons">lock</i></label>
                            <input type="password" name="pass" id="parola" placeholder="Password" />
                            <i class="material-icons toggle-password" onclick="togglePasswordVisibility('parola')">visibility</i>
                        </div>
                        <div class="form-group">
                            <label for="re-parola"><i class="material-icons">lock_outline</i></label>
                            <input type="password" name="re_parola" id="re_parola" placeholder="Repeat password" />
                            <i class="material-icons toggle-password" onclick="togglePasswordVisibility('re_parola')">visibility</i>
                        </div>
                        <div class="form-group">
                            <label for="telefon"><i class="material-icons">phone</i></label>
                            <input type="text" name="telefon" id="telefon" placeholder="Phone number" />
                        </div>
                        <div class="form-group2">
                            <input type="checkbox" name="termeni" id="termeni" class="termeni" />
                            <label for="termeni" class="label-termeni">
                                <span><span></span></span>Sunt de acord cu 
                                <a href="terms.html" class="termeni">Termenii și condițiile.</a>
                            </label>
                        </div>
                        <div class="form-button">
                            <input type="submit" name="signup" id="signup" class="inregistrare" value="Create new account" onclick="return validateTerms();" />
                        </div>
                    </form>
                </div>
                <div class="signupimg">
                    <figure>
                        <img src="imagini/autentificare.jpg" alt="autentificare img">
                    </figure>
                    <a href="login.jsp" class="amdejacont">Back to login page</a>
                </div>
            </div>
        </div>
    </section>
</div>

<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script type="text/javascript">
var stare = document.getElementById("stare").value;

if (stare == "success") {
    Swal.fire({
        icon: "success",
        title: "Felicitări!",
        text: "Contul a fost creat cu succes!",
    });
}

document.getElementById("register-form").addEventListener("submit", function(event) {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("parola").value;
    var confirmPassword = document.getElementById("re_parola").value;
    var telefon = document.getElementById("telefon").value;

    if (!username || !email || !password || !confirmPassword || !telefon) {
        event.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Eroare!",
            text: "Vă rugăm să completați toate câmpurile din formular."
        });
    } else if (password !== confirmPassword) {
        event.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Eroare!",
            text: "Parolele nu se potrivesc. Vă rugăm să le verificați și să încercați din nou."
        });
    }
});

function togglePasswordVisibility(inputId) {
    var passwordInput = document.getElementById(inputId);
    var icon = passwordInput.nextElementSibling;

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.textContent = "visibility_off";
    } else {
        passwordInput.type = "password";
        icon.textContent = "visibility";
    }
}

function validateTerms() {
    var termeniChecked = document.getElementById("termeni").checked;

    if (!termeniChecked) {
        event.preventDefault();
        Swal.fire({
            icon: "error",
            title: "Eroare!",
            text: "Vă rugăm să fiți de acord cu Termenii și condițiile pentru a continua."
        });
        return false;
    }
    return true;
}
</script>
</body>
</html>
