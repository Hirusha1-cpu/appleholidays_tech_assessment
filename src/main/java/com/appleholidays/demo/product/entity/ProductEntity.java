package com.appleholidays.demo.product.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;


@Entity
@Table(name = "`products`")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true, nullable = false)
    private Integer id;

    @Column(name = "productcode", unique = true)
    private String productcode;

    @Column(name = "productname")
    private String productname;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "suppliername")
    private String suppliername;

    @ManyToOne
    @JoinColumn(name="category_id", referencedColumnName="id")
    private CategoryEntity category_id;

    @ManyToOne
    @JoinColumn(name="brand_id", referencedColumnName="id")
    private BrandEntity brand_id;
    
}