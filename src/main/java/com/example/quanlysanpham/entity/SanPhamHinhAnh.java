//package com.example.quanlysanpham.entity;
//
//import jakarta.persistence.*;
//import org.springframework.resilience.annotation.EnableResilientMethods;
//
//@Entity
//@Table(name = "bh_sanphamhinhanh")
//public class SanPhamHinhAnh {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private int id;
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name="hinhanhsanpham")
//    private SanPham SanPham_id;
//    @Column(name = "UrlHinhAnh")
//    private String urlHinhAnh;
//}
