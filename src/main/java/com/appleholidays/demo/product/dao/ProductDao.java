package com.appleholidays.demo.product.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appleholidays.demo.product.entity.ProductEntity;

public interface ProductDao extends JpaRepository<ProductEntity, Integer> {
    
}
