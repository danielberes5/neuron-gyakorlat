package service;

import dto.ProductRequestDTO;
import dto.ProductsResponseDTO;
import entity.Product;

import java.util.Collection;

public interface ProductService {

    ProductsResponseDTO getProducts(int page);

    Integer addProduct(ProductRequestDTO dto);
}

