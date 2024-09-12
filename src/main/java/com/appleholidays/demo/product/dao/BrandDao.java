package com.appleholidays.demo.product.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.appleholidays.demo.product.entity.BrandEntity;

public interface BrandDao extends JpaRepository<BrandEntity, Integer>{
    
}
