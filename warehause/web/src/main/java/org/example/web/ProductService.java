package org.example.web;

import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.config.DatabaseConfig;
import org.example.model.Product;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "ProductService", urlPatterns = "/api/ProductService/getProducts")
public class ProductService extends HttpServlet {

    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        List<Product> productList = new ArrayList<>();

        try (Connection conn = DatabaseConfig.getConnection()) {
            String sql = "SELECT name, category, quantityUnit, unit, purchasePrice, sellingPrice, description FROM product";
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                productList.add(new Product(
                        rs.getString("name"),
                        rs.getString("category"),
                        rs.getString("quantityUnit"),
                        rs.getString("unit"),
                        rs.getDouble("purchasePrice"),
                        rs.getDouble("sellingPrice"),
                        rs.getString("description")
                ));
            }

        } catch (Exception e) {
            response.setStatus(500);
            response.getWriter().write("DB hiba: " + e.getMessage());
            return;
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(productList));
    }
}
