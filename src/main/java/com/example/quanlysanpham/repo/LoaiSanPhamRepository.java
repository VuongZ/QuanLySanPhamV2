package com.example.quanlysanpham.repo;

import com.example.quanlysanpham.entity.LoaiSanPham;
import com.example.quanlysanpham.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoaiSanPhamRepository extends JpaRepository<LoaiSanPham, Long> {
}
