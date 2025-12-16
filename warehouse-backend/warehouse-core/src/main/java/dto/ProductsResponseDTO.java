package dto;

import entity.Product;

import java.util.List;

public class ProductsResponseDTO {

    private List<Product> items;
    private int currentPage;
    private int totalPages;

    public ProductsResponseDTO(List<Product> items, int currentPage, int totalPages) {
        this.items = items;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
    }
}
