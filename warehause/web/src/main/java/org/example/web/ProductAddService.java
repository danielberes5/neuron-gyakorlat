package org.example.web;

import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.config.DatabaseConfig;
import org.example.model.Product;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet(name = "ProductAddService", urlPatterns = "/api/ProductService/putProduct")
public class ProductAddService extends HttpServlet{

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");


        Gson gson = new Gson();
        Product newProduct = gson.fromJson(request.getReader(), Product.class);

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement stmt = conn.prepareStatement(
                     "INSERT INTO product (name, category, quantityUnit, unit, purchasePrice, sellingPrice, description) " +
                             "VALUES (?, ?, ?, ?, ?, ?, ?)")) {

            stmt.setString(1, newProduct.getName());
            stmt.setString(2, newProduct.getCategory());
            stmt.setString(3, newProduct.getQuantityUnit());
            stmt.setString(4, newProduct.getUnit());
            stmt.setDouble(5, newProduct.getPurchasePrice());
            stmt.setDouble(6, newProduct.getSellingPrice());
            stmt.setString(7, newProduct.getDescription());

            int inserted = stmt.executeUpdate();
            if (inserted > 0) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("{\"status\":\"success\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"status\":\"fail\"}");
            }

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"" + e.getMessage() + "\"}");
        }
    }
}

