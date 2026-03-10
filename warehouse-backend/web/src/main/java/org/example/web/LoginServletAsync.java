package org.example.web;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

@WebServlet(name = "loginServlet", value = "/login-servlet-async")
public class LoginServletAsync extends HttpServlet {

    private Gson gson;

    public void init() {
        gson=new GsonBuilder().setPrettyPrinting().create();
    }
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();
        PrintWriter out = response.getWriter();
        boolean success = "admin".equals(request.getParameter("username"))
                && "password".equals(request.getParameter("password"));

        session.setAttribute("authenticated", success);
        response.setContentType("application/json;charset=UTF-8");


        HashMap<String, Object> result = new java.util.HashMap<String, Object>();
        result.put("result", success);

        String jsonOut = gson.toJson(result);
        response.getWriter().write(jsonOut);
        out.flush();

    }
}
