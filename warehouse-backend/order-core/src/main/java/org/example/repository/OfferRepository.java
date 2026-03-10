package org.example.repository;

import org.example.entity.Offer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OfferRepository extends JpaRepository<Offer, Long> {

    // aktuálisan érvényes ajánlatok
    List<Offer> findByValidFromLessThanEqualAndValidToGreaterThanEqual(
            LocalDate from,
            LocalDate to
    );
}