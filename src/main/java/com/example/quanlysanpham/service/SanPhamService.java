package com.example.quanlysanpham.service;

import com.example.quanlysanpham.entity.SanPham;
import com.example.quanlysanpham.repo.SanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SanPhamService {
    @Autowired
    private SanPhamRepository sanPhamRepository;
    public List<SanPham> GetAll(){
        return sanPhamRepository.findAll();
    }
    public SanPham GetSanPhamById(int id){return sanPhamRepository.findById((long) id).
            orElseThrow(() -> new RuntimeException("Khong Tim Thay San Pham"));}

    public SanPham create(SanPham sanPham){
        return sanPhamRepository.save(sanPham);
    }
    public SanPham update(Integer id, SanPham sanPham) {
        sanPham.setId(id);
        return sanPhamRepository.save(sanPham);
    }
    public void delete(Integer id) { sanPhamRepository.deleteById(Long.valueOf(id)); }
}