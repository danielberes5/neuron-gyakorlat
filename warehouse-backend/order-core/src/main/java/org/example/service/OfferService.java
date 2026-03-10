package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.entity.Offer;
import org.example.repository.OfferRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OfferService {

    private final OfferRepository offerRepository;

    public List<Offer> findAll() {
        return offerRepository.findAll();
    }

    public Offer findById(Long id) {
        return offerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Offer not found"));
    }

    public Offer save(Offer offer) {
        return offerRepository.save(offer);
    }

    public Offer update(Long id, Offer offer) {
        Offer existing = findById(id);

        existing.setProduct(offer.getProduct());
        existing.setPrice(offer.getPrice());
        existing.setValidFrom(offer.getValidFrom());
        existing.setValidTo(offer.getValidTo());

        return offerRepository.save(existing);
    }

    public void delete(Long id) {
        offerRepository.deleteById(id);
    }

    // aktuális ajánlatok
    public List<Offer> getActiveOffers() {
        LocalDate now = LocalDate.now();
        return offerRepository.findByValidFromLessThanEqualAndValidToGreaterThanEqual(now, now);
    }
}