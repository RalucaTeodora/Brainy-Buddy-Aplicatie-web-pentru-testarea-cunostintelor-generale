<%@ page contentType="text/html; charset=UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="ie=edge">
<title>Brainy Buddy Sign In</title>
<link rel="icon" href="imagini/favicon.ico" type="image/x-icon">
<link rel="stylesheet" href="css/style.css">
<style>
.containerp {
    margin: 0 auto;
    background: rgba(255, 255, 255, 0.8);
    padding: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    min-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center; 
    overflow: hidden;
    border-radius: 20px;
    margin-bottom: 150px;
}

.form-group {
    position: relative;
}

.form-group .toggle-password {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    cursor: pointer;
    margin-left: 245px;
}
</style>
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
</head>
<body>
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
    <section class="sign-in">
        <div class="containerp">
            <div class="signin-content">
                <div class="signin-image">
                    <figure>
                        <img src="imagini/sign-in.jpg" alt="signup img">
                    </figure>
                </div>

                <div class="signin-form">
                    <h2 class="titlusignin">Log in</h2>
                    <form method="post" action="login" class="register-form" id="login-form">
                        <div class="form-group">
                            <label for="username"><i class="material-icons">account_circle</i></label> <!-- Iconița pentru username -->
                            <input type="text" name="username" id="username" placeholder="Username" />
                        </div>
                        <div class="form-group">
                            <label for="password"><i class="material-icons">lock</i></label> <!-- Iconița pentru password -->
                            <input type="password" name="password" id="password" placeholder="Password" />
                            <i class="material-icons toggle-password" onclick="togglePasswordVisibility()">visibility</i>
                        </div>
                        
                        <div class="buton-login">
                            <input type="submit" name="signin" id="signin" class="autentificare" value="Log in" />
                        </div>
                        <div class="buton-cont-nou">
						    <p>No account? <u><a href="autentificare.jsp" class="contnou">Create Here.</a></u></p>
						</div>

                    </form>
                </div>
            </div>
        </div>
    </section>
    
</div>


<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script type="text/javascript">
    var stare = document.getElementById("stare").value;
    if (stare == "esuat") {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Username sau parola invalide!",
        });
    }

    function togglePasswordVisibility() {
        var passwordInput = document.getElementById("password");
        var icon = document.querySelector(".toggle-password");

        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            icon.textContent = "visibility_off";
        } else {
            passwordInput.type = "password";
            icon.textContent = "visibility";
        }
    }
</script>

</body>
</html>
