package com.appleholidays.demo.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.appleholidays.demo.product.dao.ProductDao;
import com.appleholidays.demo.product.entity.ProductEntity;

import java.util.List;

@RestController
public class ProductController {
    @Autowired
    private ProductDao productDao;

    @RequestMapping(value = "/product")
    public ModelAndView viewProductUI() {
        ModelAndView viewProduct = new ModelAndView();
        viewProduct.addObject("title", "Product Management - Apple Holidays 2024");
        viewProduct.setViewName("product/form/productForm.html");
        return viewProduct;
    }

    @GetMapping(value = "/product/getlist", produces = "application/json")
    public List<ProductEntity> findAll() {
        return productDao.findAll(Sort.by(org.springframework.data.domain.Sort.Direction.DESC, "id"));
    }

    @PostMapping(value = "/product")
    public String save(@RequestBody ProductEntity product) {
        try {
            productDao.save(product);
            return "OK";
        } catch (Exception e) {
            return "save Not Completed" + e.getMessage();
        }
    }

    @PutMapping("/product")
    public String update(@RequestBody ProductEntity product) {
        try {
            productDao.save(product);
            return "OK";
        } catch (Exception e) {
            return "Update not completed" + e.getMessage();
        }
    }

    @DeleteMapping(value = "/product")
    public String delete(@RequestBody ProductEntity product) {
        try {
            productDao.delete(product);
            // productDao.delete(productDao.gerReferenceById(product.getId()));
            return "OK";

        } catch (Exception e) {
            return "Delete Not Completed" + e.getMessage();
        }
    }

}
