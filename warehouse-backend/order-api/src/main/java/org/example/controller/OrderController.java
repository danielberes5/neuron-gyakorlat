package org.example.controller;

import org.example.entity.Order;
import org.example.entity.OrderStatus;
import org.example.repository.OrderRepository;
import org.example.service.OrderService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository;

    public OrderController(
            OrderService orderService,
            OrderRepository orderRepository
    ) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
    }

    @GetMapping
    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    @GetMapping("/{id}")
    public Order getOne(@PathVariable Long id) {
        return orderRepository
                .findById(id)
                .orElseThrow();
    }

    @PostMapping
    public Order create(@RequestBody Order order) {
        return orderService.createOrder(order);
    }

    @PutMapping("/{id}/status")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status
    ) {

        Order order = orderRepository
                .findById(id)
                .orElseThrow();

        order.setStatus(status);

        return orderRepository.save(order);
    }

    @PutMapping("/{id}/invalidate")
    public void invalidate(@PathVariable Long id) {
        orderService.invalidateOrder(id);
    }

}