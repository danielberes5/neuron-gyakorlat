package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.entity.Product;
import org.example.entity.StockHistory;
import org.example.repository.ProductRepository;
import org.example.repository.StockHistoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StockService {

    private final ProductRepository productRepository;
    private final StockHistoryRepository stockHistoryRepository;

    @Transactional
    public void changeStock(Product product, Integer newQuantity) {
        double oldQuantity = product.getStockQuantity();

        // készlet frissítése
        product.setStockQuantity(newQuantity);
        productRepository.save(product);

        // változás mentése
        StockHistory history = new StockHistory(product, oldQuantity, newQuantity);
        stockHistoryRepository.save(history);
    }
}