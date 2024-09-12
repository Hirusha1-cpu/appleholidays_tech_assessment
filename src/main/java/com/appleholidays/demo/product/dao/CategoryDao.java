package com.appleholidays.demo.product.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appleholidays.demo.product.entity.CategoryEntity;

public interface CategoryDao extends JpaRepository<CategoryEntity, Integer>{
    
}
