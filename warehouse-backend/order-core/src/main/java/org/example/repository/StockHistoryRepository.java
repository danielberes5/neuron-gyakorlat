package org.example.repository;

import org.example.entity.StockHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockHistoryRepository
        extends JpaRepository<StockHistory, Long> {
}
