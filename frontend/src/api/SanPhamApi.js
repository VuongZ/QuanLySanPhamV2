import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

export const SanPhamAPI = {
    getAll: ()           => axios.get(`${BASE_URL}/sanpham`),
    getById: (id)        => axios.get(`${BASE_URL}/sanpham/${id}`),
    create: (data)       => axios.post(`${BASE_URL}/sanpham`, data),
    update: (id, data)   => axios.put(`${BASE_URL}/sanpham/${id}`, data),
    delete: (id)         => axios.delete(`${BASE_URL}/sanpham/${id}`),
};
export const LoaiSanPhamAPI = {
    getAll: () => axios.get(`${BASE_URL}/loaisanpham`),
};  