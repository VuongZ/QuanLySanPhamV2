package com.example.quanlysanpham.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name ="bh_sanpham")
public class SanPham {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="Id")
    private Integer id;
    @Column(name = "LoaiSanPham_Id")
    private Integer loaiSanPham;
    @Column(name = "MaSP")
    private String maSanPham;

    @Column(name = "TenSP")
    private String tenSanPham;

    @Column(name = "DonVi")
    private String donVi;

    @Column(name = "GiaBan")
    private Double giaBan;

    @Column(name = "SoLuongTon")
    private Integer slTon;


    @Column(name = "TrangThai")
    private Integer trangThai;

    @Column(name = "CreatedAt", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;
    @Column(name = "UpdatedAt")
    @UpdateTimestamp
    private LocalDateTime updatedAt;



}
