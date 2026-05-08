package com.example.quanlysanpham.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "bh_loaisanpham")
public class LoaiSanPham {
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTenLoai() {
        return tenLoai;
    }

    public void setTenLoai(String tenLoai) {
        this.tenLoai = tenLoai;
    }

    public String getMoTa() {
        return moTa;
    }

    public void setMoTa(String moTa) {
        this.moTa = moTa;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int id;
    @Column(name = "ten_loai")
    private String tenLoai;
    @Column(name = "mo_ta")
    private String moTa;
}
