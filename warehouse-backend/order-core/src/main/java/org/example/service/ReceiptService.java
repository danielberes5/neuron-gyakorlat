package org.example.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.example.entity.Product;
import org.example.entity.Receipt;
import org.example.entity.ReceiptItem;
import org.example.repository.ProductRepository;
import org.example.repository.ReceiptRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReceiptService {

    private final ReceiptRepository receiptRepository;
    private final StockService stockService;
    private final ProductRepository productRepository;

    @Transactional
    public Receipt createReceipt(Receipt receipt) {
        // receipt items összerendelése
        for (ReceiptItem item : receipt.getItems()) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            item.setProduct(product);
            item.setReceipt(receipt);

            // készlet növelése
            int newStock = product.getStockQuantity() + item.getQuantity();
            stockService.changeStock(product, newStock);
        }

        return receiptRepository.save(receipt);
    }

    public List<Receipt> listReceipts() {
        return receiptRepository.findAll();
    }

    public Optional<Receipt> getReceipt(Long id) {
        return receiptRepository.findById(id);
    }

    @Transactional
    public Receipt updateReceipt(Long id, Receipt updatedReceipt) {
        Receipt existing = receiptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receipt not found"));

        // visszaállítjuk a régi készletet
        for (ReceiptItem item : existing.getItems()) {
            Product product = item.getProduct();
            Integer restoredStock = product.getStockQuantity() - item.getQuantity();
            stockService.changeStock(product, restoredStock);
        }

        // új tételek beállítása
        existing.setReceiptNumber(updatedReceipt.getReceiptNumber());
        existing.getItems().clear();
        for (ReceiptItem item : updatedReceipt.getItems()) {
            Product product = productRepository.findById(item.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            item.setProduct(product);
            item.setReceipt(existing);
            existing.getItems().add(item);

            // készlet újraszámolása
            int newStock = product.getStockQuantity() + item.getQuantity();
            stockService.changeStock(product, newStock);
        }

        return receiptRepository.save(existing);
    }

    public void deleteReceipt(Long id) {
        Receipt existing = receiptRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receipt not found"));

        // visszaállítjuk a készletet
        for (ReceiptItem item : existing.getItems()) {
            Product product = item.getProduct();
            int restoredStock = product.getStockQuantity() - item.getQuantity();
            stockService.changeStock(product, restoredStock);
        }

        receiptRepository.delete(existing);
    }
}
