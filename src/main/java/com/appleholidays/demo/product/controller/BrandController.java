package com.appleholidays.demo.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.appleholidays.demo.product.dao.BrandDao;
import com.appleholidays.demo.product.entity.BrandEntity;

@RestController
public class BrandController {
    @Autowired
    private BrandDao brandDao;

    @GetMapping(value = "/brand/getlist", produces = "application/json")
    public List<BrandEntity> findAll() {
        return brandDao.findAll(Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "id"));
    }
}
