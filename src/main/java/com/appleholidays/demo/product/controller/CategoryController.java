package com.appleholidays.demo.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

import com.appleholidays.demo.product.dao.CategoryDao;
import com.appleholidays.demo.product.entity.CategoryEntity;

@RestController
public class CategoryController {
    @Autowired
    private CategoryDao categoryDao;

      @GetMapping(value = "/category/getlist", produces = "application/json")
    public List<CategoryEntity> findAll() {
        return categoryDao.findAll(Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "id"));
    }

}
