package org.example.dao;

import jakarta.persistence.EntityManager;
import org.example.config.JPAUtil;
import org.example.model.Product;

import java.util.List;

public class ProductDAO extends GenericDAO<Product> {

    public ProductDAO() {
        super(Product.class);
    }

    public static List<Product> findFiltered(String name, String categoryId, String unitId, int page, int pageSize) {

        try (EntityManager em = JPAUtil.getEntityManager()) {
            StringBuilder jpql = new StringBuilder("SELECT p FROM Product p WHERE 1=1");

            if (name != null && !name.isBlank()) {
                jpql.append(" AND LOWER(p.name) LIKE LOWER(:name)");
            }
            if (categoryId != null && !categoryId.isBlank()) {
                jpql.append(" AND p.category.id = :categoryId");
            }
            if (unitId != null && !unitId.isBlank()) {
                jpql.append(" AND p.unit.id = :unitId");
            }

            var q = em.createQuery(jpql.toString(), Product.class)
                    .setFirstResult((page - 1) * pageSize)
                    .setMaxResults(pageSize);

            if (name != null && !name.isBlank())
                q.setParameter("name", "%" + name + "%");

            if (categoryId != null && !categoryId.isBlank())
                q.setParameter("categoryId", Integer.parseInt(categoryId));

            if (unitId != null && !unitId.isBlank())
                q.setParameter("unitId", Integer.parseInt(unitId));

            return q.getResultList();

        }
    }


    public static long countFiltered(String name, String categoryId, String unitId) {

        try (EntityManager em = JPAUtil.getEntityManager()) {
            StringBuilder jpql = new StringBuilder("SELECT COUNT(p) FROM Product p WHERE 1=1");

            if (name != null && !name.isBlank()) {
                jpql.append(" AND LOWER(p.name) LIKE LOWER(:name)");
            }
            if (categoryId != null && !categoryId.isBlank()) {
                jpql.append(" AND p.category.id = :categoryId");
            }
            if (unitId != null && !unitId.isBlank()) {
                jpql.append(" AND p.unit.id = :unitId");
            }

            var q = em.createQuery(jpql.toString(), Long.class);

            if (name != null && !name.isBlank())
                q.setParameter("name", "%" + name + "%");

            if (categoryId != null && !categoryId.isBlank())
                q.setParameter("categoryId", Integer.parseInt(categoryId));

            if (unitId != null && !unitId.isBlank())
                q.setParameter("unitId", Integer.parseInt(unitId));

            return q.getSingleResult();

        }
    }

}
