package com.example.quanlysanpham.controller;

import com.example.quanlysanpham.entity.LoaiSanPham;
import com.example.quanlysanpham.entity.SanPham;
import com.example.quanlysanpham.service.LoaiSanPhamSerVice;
import com.example.quanlysanpham.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/loaisanpham")
@CrossOrigin(origins = "*",allowedHeaders = "*",
        methods = {RequestMethod.GET}
)public class LoaiSanPhamController {
    @Autowired
    private LoaiSanPhamSerVice loaiSanPhamSerVice;
    @GetMapping
    public ResponseEntity<List<LoaiSanPham>> getAll() {return ResponseEntity.ok(loaiSanPhamSerVice.GetALL());}
        
}
