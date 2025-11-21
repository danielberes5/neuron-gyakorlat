package org.example.web;

import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.dao.ProductDAO;
import org.example.model.Product;

import java.io.IOException;

@WebServlet(name = "ProductAddService", urlPatterns = "/api/ProductService/addProduct")
public class ProductAddService extends HttpServlet {

    private final ProductDAO productDAO = new ProductDAO();
    private final Gson gson = new Gson();

    @Override
    public void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        Product newProduct = gson.fromJson(request.getReader(), Product.class);

        String validationError = validateProduct(newProduct);
        if(validationError != null) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write(gson.toJson(
                    new ApiResponse("error", validationError)
            ));
            return;
        }

        try {
            productDAO.save(newProduct);
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().write(gson.toJson(
                    new ApiResponse("success", "Termék sikeresen mentve!")
            ));
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write(gson.toJson(
                    new ApiResponse("error", e.getMessage())
            ));
        }
    }

    private String validateProduct(Product p) {
        if(p.getName() == null || p.getName().isBlank()) return "A termék neve kötelező!";
        if(p.getCategory() == null || p.getCategory().getId() == null) return "A kategória kötelező!";
        if(p.getUnit() == null || p.getUnit().getId() == null) return "A mértékegység kötelező!";
        if(p.getPurchasePrice() <= 0) return "A beszerzési árnak nagyobbnak kell lennie nullánál!";
        if(p.getSellingPrice() <= 0) return "Az eladási árnak nagyobbnak kell lennie nullánál!";
        return null;
    }

    private static class ApiResponse {
        String status;
        String message;

        public ApiResponse(String status, String message) {
            this.status = status;
            this.message = message;
        }
    }
}
