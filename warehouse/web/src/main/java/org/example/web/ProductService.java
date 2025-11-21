package org.example.web;

import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.config.DatabaseConfig;
import org.example.dao.ProductDAO;
import org.example.model.Category;
import org.example.model.Product;
import org.example.model.Unit;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


@WebServlet(name = "ProductService", urlPatterns = "/api/ProductService/getProducts")
public class ProductService extends HttpServlet {

    private final Gson gson = new Gson();
    private final ProductDAO productDAO = new ProductDAO();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

        try{

            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");

            String name = request.getParameter("name");
            String categoryId = request.getParameter("categoryId");
            String unitId = request.getParameter("unitId");

            int page = parseInt(request.getParameter("page"), 1);
            int pageSize = parseInt(request.getParameter("pageSize"), 10);

            List<Product> items = ProductDAO.findFiltered(name, categoryId, unitId, page, pageSize);
            long total = ProductDAO.countFiltered(name,categoryId,unitId);

            var result = new Response(items, page, pageSize, total);

            response.getWriter().write(gson.toJson(result));

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write(
                    gson.toJson(e.getMessage())
            );
        }

    }

    private int parseInt(String n, int def) {
        try { return Integer.parseInt(n); } catch (Exception e) { return def; }
    }

    private static class Response {
        List<Product> items;
        int page;
        int pageSize;
        long total;

        public Response(List<Product> items, int page, int pageSize, long total) {
            this.items = items;
            this.page = page;
            this.pageSize = pageSize;
            this.total = total;
        }
    }
}
