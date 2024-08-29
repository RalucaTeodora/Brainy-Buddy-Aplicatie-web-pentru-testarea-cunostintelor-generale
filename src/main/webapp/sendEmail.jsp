<%@ page import="javax.mail.*, javax.mail.internet.*, java.util.Properties" %>

<%
// Parametrii pentru conexiunea la serverul SMTP
String host = "smtp.gmail.com"; // Adresa serverului SMTP
String username = "ralucateodorafelea26"; // Username pentru autentificare SMTP
String password = "raluci2613"; // Parola pentru autentificare SMTP
String from = "ralucateodorafelea26@gmail.com"; // Adresa de email de la care se trimite
String to = request.getParameter("email"); // Adresa de email a destinatarului
String subject = request.getParameter("subject"); // Subiectul emailului
String body = request.getParameter("body"); // Corpul emailului

// Configurarea proprietăților pentru conexiunea la serverul SMTP
Properties props = new Properties();
props.put("mail.smtp.auth", "true");
props.put("mail.smtp.starttls.enable", "true");
props.put("mail.smtp.host", host);
props.put("mail.smtp.port", "587");

// Crearea sesiunii de email
Session mailSession = Session.getInstance(props,
    new javax.mail.Authenticator() {
        protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
        }
    });

try {
    // Crearea mesajului de email
    MimeMessage message = new MimeMessage(mailSession);
    message.setFrom(new InternetAddress(from));
    message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
    message.setSubject(subject);
    message.setText(body);

    // Trimiterea mesajului
    Transport.send(message);

    // Răspuns pentru client (poți returna orice mesaj pentru a indica că emailul a fost trimis cu succes)
    response.getWriter().println("Email sent successfully!");
} catch (MessagingException e) {
    // În caz de eroare, afișăm mesajul de eroare
    throw new RuntimeException(e);
}
%>
