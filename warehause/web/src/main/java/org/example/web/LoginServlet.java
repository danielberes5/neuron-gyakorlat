package org.example.web;
import java.io.*;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

//@WebServlet(name = "loginServlet", value = "/login-servlet")
public class LoginServlet extends HttpServlet {
    private String message;
    public void init() {
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        if(request.getParameter("username").equals("admin") && request.getParameter("password").equals("password")){
            session.setAttribute("authenticated","true");
            response.sendRedirect(response.encodeRedirectURL("Secured/profile.html"));
        }else {
            session.setAttribute("request","Incorrect username or password");
            response.sendRedirect("login.html");
        }
    }
}