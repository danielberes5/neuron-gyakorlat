package controller;

import dto.ProductRequestDTO;
import dto.ProductsResponseDTO;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.ProductService;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }


    @GetMapping
    public ResponseEntity<ProductsResponseDTO> getProducts(
            @RequestParam(defaultValue = "0") int page) {

        return ResponseEntity.ok(service.getProducts(page));
    }

    // POST /api/products
    @PostMapping
    public ResponseEntity<Integer> addProduct(
            @Valid @RequestBody ProductRequestDTO dto) {

        Integer id = service.addProduct(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }
}

