package org.example.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Entity
@Table(name = "offer")
public class Offer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // melyik termékre vonatkozik
    @Setter
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    // ajánlati ár
    @Setter
    @Column(nullable = false)
    private double price;

    // érvényesség
    @Setter
    @Column(nullable = false)
    private LocalDate validFrom;

    @Setter
    @Column(nullable = false)
    private LocalDate validTo;

    public Offer() {}

    public Offer(Product product, double price, LocalDate validFrom, LocalDate validTo) {
        this.product = product;
        this.price = price;
        this.validFrom = validFrom;
        this.validTo = validTo;
    }

}