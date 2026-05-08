import axios from 'axios';

const BASE_URL = "http://localhost:8080/api";

export const SanPhamAPI = {
    getAll: ()           => axios.get(`${BASE_URL}/loaisanpham`),
    getById: (id)        => axios.get(`${BASE_URL}/loaisanpham/${id}`),
    create: (data)       => axios.post(`${BASE_URL}/loaisanpham`, data),
    update: (id, data)   => axios.put(`${BASE_URL}/loaisanpham/${id}`, data),
    delete: (id)         => axios.delete(`${BASE_URL}/loaisanpham/${id}`),
};
