package org.example.web;

import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.model.Product;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "ProductService", urlPatterns = "/api/ProductService/getProducts")
public class ProductService extends HttpServlet {

    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        HttpSession session = request.getSession();

        Object productsObj = session.getAttribute("products");

        if (productsObj == null) {
            List<Product> productList = new ArrayList<>();

            productList.add(new Product("Alma", "Gyümölcs", "1", "kg", 200, 350, "Friss alma"));
            productList.add(new Product("Tej", "Ital", "1", "liter", 150, 250, "Friss tej"));
            productList.add(new Product("Kenyer", "Péksütemény", "1", "db", 100, 200, "Friss kenyér"));

            session.setAttribute("products", productList);
            productsObj = productList;
        }

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(gson.toJson(productsObj));
    }
}
