package dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ProductRequestDTO {

    @NotBlank
    private String name;

    @Positive
    private double purchasePrice;

    @Positive
    private double sellingPrice;

    private String description;
    private String quantityUnit;
}

