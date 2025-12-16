package service.impl;

import dto.ProductRequestDTO;
import dto.ProductsResponseDTO;
import entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.ProductRepository;
import service.ProductService;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public ProductsResponseDTO getProducts(int page) {
        if (page < 0) {
            throw new IllegalArgumentException("Oldalszám nem lehet negatív");
        }

        PageRequest pageable = PageRequest.of(page, 5);
        Page<Product> result = repository.findAll(pageable);

        return new ProductsResponseDTO(
                result.getContent(),
                result.getNumber(),
                result.getTotalPages()
        );
    }

    @Override
    public Integer addProduct(ProductRequestDTO dto) {

        if (dto.getSellingPrice() <= dto.getPurchasePrice()) {
            throw new IllegalArgumentException("Eladási ár legyen nagyobb");
        }

        Product p = new Product();
        p.setName(dto.getName());
        p.setPurchasePrice(dto.getPurchasePrice());
        p.setSellingPrice(dto.getSellingPrice());
        p.setDescription(dto.getDescription());
        p.setQuantityUnit(dto.getQuantityUnit());

        return repository.save(p).getId();
    }
}

