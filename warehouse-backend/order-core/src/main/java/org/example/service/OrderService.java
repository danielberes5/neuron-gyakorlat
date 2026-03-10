package org.example.service;

import lombok.RequiredArgsConstructor;
import org.example.entity.Order;
import org.example.entity.OrderItem;
import org.example.entity.OrderStatus;
import org.example.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;

    @Transactional
    public Order createOrder(Order order){

        order.setStatus(OrderStatus.NEW);

        for(OrderItem item : order.getItems()){

            item.setOrder(order);

            Integer productId =
                    item.getOffer()
                            .getProduct()
                            .getId();

            productService.decreaseStock(
                    productId,
                    item.getQuantity()
            );

        }

        return orderRepository.save(order);
    }

    @Transactional
    public void invalidateOrder(Long id){

        Order order =
                orderRepository
                        .findById(id)
                        .orElseThrow();

        order.setStatus(OrderStatus.INVALID);

        for(OrderItem item : order.getItems()){

            Integer productId =
                    item.getOffer()
                            .getProduct()
                            .getId();

            productService.increaseStock(
                    productId,
                    item.getQuantity()
            );

        }

    }

}