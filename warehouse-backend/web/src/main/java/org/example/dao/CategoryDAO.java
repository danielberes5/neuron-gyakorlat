package org.example.dao;

import org.example.entity.Category;

public class CategoryDAO extends GenericDAO<Category> {
    public CategoryDAO() {
        super(Category.class);
    }
}
