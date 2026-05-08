package com.example.quanlysanpham.repo;

import com.example.quanlysanpham.entity.SanPham;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SanPhamRepository extends JpaRepository<SanPham, Long> {
}
