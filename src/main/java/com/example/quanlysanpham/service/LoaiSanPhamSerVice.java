package com.example.quanlysanpham.service;

import com.example.quanlysanpham.entity.LoaiSanPham;
import com.example.quanlysanpham.repo.LoaiSanPhamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LoaiSanPhamSerVice {
    @Autowired
    private LoaiSanPhamRepository loaiSanPhamRepository;
    public List<LoaiSanPham> GetALL() {return loaiSanPhamRepository.findAll();}
    public LoaiSanPham GetById(int id) {return loaiSanPhamRepository.findById((long) id)
            .orElseThrow(()-> new RuntimeException("Khong Co Loai San Pham"));}
    public LoaiSanPham create(LoaiSanPham loaiSanPham) {
      return   loaiSanPhamRepository.save(loaiSanPham);
    }
    public LoaiSanPham update(LoaiSanPham loaiSanPham,Integer id) {
        loaiSanPham = loaiSanPhamRepository.getById(Long.valueOf(id));
        return loaiSanPhamRepository.save(loaiSanPham);
    }
    public void delete(int id) {loaiSanPhamRepository.deleteById((long) id);}
}
