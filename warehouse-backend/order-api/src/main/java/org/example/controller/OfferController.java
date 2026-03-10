package org.example.controller;

import org.example.entity.Offer;
import org.example.service.OfferService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    private final OfferService offerService;

    public OfferController(OfferService offerService) {
        this.offerService = offerService;
    }

    // összes ajánlat
    @GetMapping
    public List<Offer> getAll() {
        return offerService.findAll();
    }

    // egy ajánlat
    @GetMapping("/{id}")
    public Offer getById(@PathVariable Long id) {
        return offerService.findById(id);
    }

    // aktuális ajánlatok
    @GetMapping("/active")
    public List<Offer> getActive() {
        return offerService.getActiveOffers();
    }

    // új ajánlat
    @PostMapping
    public Offer create(@RequestBody Offer offer) {
        return offerService.save(offer);
    }

    // módosítás
    @PutMapping("/{id}")
    public Offer update(@PathVariable Long id, @RequestBody Offer offer) {
        return offerService.update(id, offer);
    }

    // törlés
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        offerService.delete(id);
    }
}