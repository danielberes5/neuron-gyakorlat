package org.example.controller;

import org.example.entity.Receipt;
import org.example.service.ReceiptService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/receipts")
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @GetMapping
    public List<Receipt> getAll() {
        return receiptService.listReceipts();
    }

    @GetMapping("/{id}")
    public Receipt getById(@PathVariable Long id) {
        return receiptService.getReceipt(id)
                .orElseThrow(() -> new RuntimeException("Receipt not found"));
    }

    @PostMapping
    public Receipt create(@RequestBody Receipt receipt) {
        return receiptService.createReceipt(receipt);
    }

    @PutMapping("/{id}")
    public Receipt update(@PathVariable Long id, @RequestBody Receipt receipt) {
        return receiptService.updateReceipt(id, receipt);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        receiptService.deleteReceipt(id);
    }
}
