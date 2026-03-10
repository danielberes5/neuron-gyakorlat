package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.entity.Product;
import org.example.entity.StockHistory;
import org.example.repository.ProductRepository;
import org.example.repository.StockHistoryRepository;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final StockHistoryRepository stockHistoryRepository;

    @Transactional
    public void decreaseStock(
            Integer productId,
            int quantity
    ){

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow();

        int old = product.getStockQuantity();

        product.setStockQuantity(old - quantity);

        productRepository.save(product);

        stockHistoryRepository.save(
                new StockHistory(product, old, product.getStockQuantity())
        );

    }

    @Transactional
    public void increaseStock(
            Integer productId,
            int quantity
    ){

        Product product =
                productRepository
                        .findById(productId)
                        .orElseThrow();

        int old = product.getStockQuantity();

        product.setStockQuantity(old + quantity);

        productRepository.save(product);

        stockHistoryRepository.save(
                new StockHistory(product, old, product.getStockQuantity())
        );

    }
}
