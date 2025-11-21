package org.example.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import org.example.dao.UnitDAO;
import org.example.model.Unit;

import java.io.IOException;
import java.util.List;

@WebServlet(name = "ProductsPageServlet", urlPatterns = "/products")
public class ProductsPageServlet extends HttpServlet {

    private final UnitDAO unitDAO = new UnitDAO();

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        List<Unit> units = unitDAO.findAll();
        req.setAttribute("units", units);

        req.getRequestDispatcher("/products.jsp").forward(req, resp);
    }
}
