package com.example.quanlysanpham.controller;

import com.example.quanlysanpham.entity.SanPham;
import com.example.quanlysanpham.repo.SanPhamRepository;
import com.example.quanlysanpham.service.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/sanpham")
@CrossOrigin(origins = "*",allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.DELETE, RequestMethod.POST, RequestMethod.PUT}
)
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;
    @GetMapping
    public ResponseEntity<List<SanPham>> getAll() {return ResponseEntity.ok(sanPhamService.GetAll());}
    @GetMapping("/{id}")
    public ResponseEntity<SanPham> GetSanPhambyID(@PathVariable int id) {
return ResponseEntity.ok(sanPhamService.GetSanPhamById(id));
    }
    @PostMapping
    public ResponseEntity<SanPham> createSanPham(@RequestBody SanPham sanPham) {
        return ResponseEntity.ok(sanPhamService.create(sanPham));
    }
    @PutMapping("/{id}")
        public  ResponseEntity<SanPham> updateSanPham(@PathVariable int id, @RequestBody SanPham sanPham) {
        return ResponseEntity.ok(sanPhamService.update(id, sanPham));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<SanPham> deleteSanPham(@PathVariable int id) {sanPhamService.delete(id);
        return ResponseEntity.ok().build();
    }
}
