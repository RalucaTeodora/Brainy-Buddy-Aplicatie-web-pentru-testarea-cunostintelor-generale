package com.autentificare;

import java.io.IOException;
import util.EmailUtil;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.mail.MessagingException;

import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/autentificare")
public class AutentificareServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String username = request.getParameter("username");
        String email = request.getParameter("email");
        String password = request.getParameter("pass");
        String telefon = request.getParameter("telefon");

        RequestDispatcher dispatcher = null;
        Connection connection = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql:///login?useSSL=false", "root", "root");
            PreparedStatement preparedStatement = connection
                    .prepareStatement("INSERT INTO users(username, password, email, telefon) VALUES (?, ?, ?, ?)");
            preparedStatement.setString(1, username);
            preparedStatement.setString(2, password);
            preparedStatement.setString(3, email);
            preparedStatement.setString(4, telefon);

            int rowCount = preparedStatement.executeUpdate();
            dispatcher = request.getRequestDispatcher("autentificare.jsp");
            if (rowCount > 0) {
                request.setAttribute("stare", "success");
            } else {
                request.setAttribute("stare", "failure");
            }
            dispatcher.forward(request, response);
        } catch (ClassNotFoundException | SQLException | ServletException | IOException e) {
            e.printStackTrace();
        } finally {
            if (connection != null) {
                try {
                    connection.close();
                } catch (SQLException e) {
                    e.printStackTrace();
                }
            }
        }
     // mail de confirmare
        String subject = "Confirmare cont nou";
        String body = "Bun venit la Brainy Buddy!\n\nFelicitări pentru crearea contului!\n\nCu fiecare quiz și fiecare întrebare,"
        		+ "vei avea oportunitatea de a-ți testa cunoștințele. Ești pe cale să te îmbarci într-o călătorie extraordinară prin lumea cunoașterii și a distracției!"
        		+ "Echipa Brainy Buddy este încântată să te aibă alături "
        		+ "și să te însoțească în această călătorie captivantă către descoperirea și dezvoltarea ta continuă.";
        
        
        
        EmailUtil.sendEmail(email, subject, body);
 
    }
}
