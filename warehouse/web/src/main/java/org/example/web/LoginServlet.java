package org.example.web;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.*;
import org.example.model.Product;


//@WebServlet(name = "loginServlet", value = "/login-servlet")
public class LoginServlet extends HttpServlet {
    private String message;
    public void init() {
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        HttpSession session = request.getSession();
        if(request.getParameter("username").equals("admin") && request.getParameter("password").equals("password")){
            session.setAttribute("authenticated",true);


            /*
            List<Product> productList = new ArrayList<>();

            productList.add(new Product("Alma", "Gyümölcs", "1", "kg", 200, 350, "Friss alma"));
            productList.add(new Product("Tej", "Ital", "1", "liter", 150, 250, "Friss tej"));
            productList.add(new Product("Kenyer", "Péksütemény", "1", "db", 100, 200, "Friss kenyér"));

            session.setAttribute("productList", productList);*/

            response.sendRedirect(response.encodeRedirectURL("secured/profile.html"));
        }else {
            request.setAttribute("loginError", "Érvénytelen belépési adatok!");
            request.getRequestDispatcher("login.jsp").forward(request, response);
        }
    }
}