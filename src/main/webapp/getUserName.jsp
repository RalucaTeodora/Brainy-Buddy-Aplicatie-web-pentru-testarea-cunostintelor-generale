<%@ page contentType="text/plain; charset=UTF-8" %>
<%@ page import="java.io.*, javax.servlet.*, javax.servlet.http.*" %>

<%
    String username = (String) session.getAttribute("username");
    if (username != null) {
        out.print(username);
    }
%>
