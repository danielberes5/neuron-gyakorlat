package org.example.web;

import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import org.example.dao.CategoryDAO;
import org.example.model.Category;

import java.io.IOException;
import java.util.List;

@WebServlet(name = "CategoryService", urlPatterns = "/api/categories")
public class CategoryService extends HttpServlet {

    private final CategoryDAO dao = new CategoryDAO();
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try{
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        List<Category> categories = dao.findAll();
        response.getWriter().write(gson.toJson(categories));

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("error: " + e.getMessage());
        }
    }
}
