import { useState, useEffect, useCallback } from "react";
import { SanPhamAPI, LoaiSanPhamAPI } from "./api/SanPhamApi.js";

// ─── STYLES ───────────────────────────────────────────────────────────────────
const injectStyles = () => {
    if (document.getElementById("sp-styles")) return;
    const style = document.createElement("style");
    style.id = "sp-styles";
    style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap');
    :root {
      --bg:#0d0f14; --surface:#13161e; --surface2:#1a1e2a; --surface3:#222638;
      --border:#252a38; --border2:#2e3448;
      --accent:#f97316; --accent2:#fb923c; --accent-dim:rgba(249,115,22,0.12);
      --text:#e2e8f0; --text-muted:#64748b; --text-dim:#94a3b8;
      --green:#22c55e; --red:#ef4444; --red-dim:rgba(239,68,68,0.1);
    }
    .sp-root*{margin:0;padding:0;box-sizing:border-box}
    .sp-root{font-family:'Be Vietnam Pro',sans-serif;background:var(--bg);color:var(--text);min-height:100vh;padding:28px 32px}
    .sp-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:28px;padding-bottom:22px;border-bottom:1px solid var(--border)}
    .sp-breadcrumb{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:var(--text-muted);font-weight:600;margin-bottom:6px}
    .sp-breadcrumb span{color:var(--accent)}
    .sp-title{font-size:26px;font-weight:800;letter-spacing:-.5px;line-height:1}
    .sp-title-accent{color:var(--accent)}
    .sp-subtitle{font-size:12px;color:var(--text-muted);margin-top:5px}
    .sp-header-actions{display:flex;gap:10px;align-items:center}
    .btn{padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;font-family:'Be Vietnam Pro',sans-serif;transition:all .15s;display:inline-flex;align-items:center;gap:6px}
    .btn:disabled{opacity:.5;cursor:not-allowed}
    .btn-primary{background:var(--accent);color:#fff}
    .btn-primary:hover:not(:disabled){background:var(--accent2);transform:translateY(-1px);box-shadow:0 4px 16px rgba(249,115,22,.3)}
    .btn-ghost{background:var(--surface2);color:var(--text-dim);border:1px solid var(--border)}
    .btn-ghost:hover{border-color:var(--accent);color:var(--accent)}
    .btn-danger{background:var(--red-dim);color:var(--red);border:1px solid rgba(239,68,68,.25)}
    .btn-danger:hover:not(:disabled){background:rgba(239,68,68,.18)}
    .sp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px}
    .stat-card{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px 20px;position:relative;overflow:hidden;transition:border-color .2s,transform .2s}
    .stat-card:hover{border-color:var(--accent);transform:translateY(-2px)}
    .stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--accent);opacity:.5}
    .stat-label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);font-weight:700;margin-bottom:6px}
    .stat-value{font-size:28px;font-weight:800;font-family:'JetBrains Mono',monospace;line-height:1}
    .stat-sub{font-size:11px;color:var(--text-muted);margin-top:3px}
    .sp-toolbar{display:flex;gap:10px;margin-bottom:14px}
    .search-wrap{flex:1;position:relative}
    .search-icon{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);width:15px;pointer-events:none}
    .search-input{width:100%;padding:10px 14px 10px 38px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;font-family:'Be Vietnam Pro',sans-serif;outline:none;transition:border-color .2s}
    .search-input:focus{border-color:var(--accent)}
    .search-input::placeholder{color:var(--text-muted)}
    .sp-select{padding:10px 14px;background:var(--surface);border:1px solid var(--border);border-radius:8px;color:var(--text-dim);font-size:13px;font-family:'Be Vietnam Pro',sans-serif;outline:none;cursor:pointer}
    .sp-select:focus{border-color:var(--accent)}
    .table-wrap{background:var(--surface);border:1px solid var(--border);border-radius:14px;overflow:hidden}
    .sp-table{width:100%;border-collapse:collapse}
    .sp-table thead{background:var(--surface2);border-bottom:1px solid var(--border)}
    .sp-table th{padding:12px 16px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--text-muted);text-align:left;white-space:nowrap}
    .sp-table th:first-child{padding-left:22px}
    .sp-table th:last-child{padding-right:22px;text-align:center}
    .sp-table tbody tr{border-bottom:1px solid var(--border);transition:background .15s}
    .sp-table tbody tr:last-child{border-bottom:none}
    .sp-table tbody tr:hover{background:var(--surface2)}
    .sp-table td{padding:13px 16px;font-size:13px;vertical-align:middle}
    .sp-table td:first-child{padding-left:22px}
    .sp-table td:last-child{padding-right:22px;text-align:center}
    .td-id{font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted)}
    .td-ma{font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--accent);font-weight:600}
    .td-ten{font-weight:600}
    .td-ten small{display:block;font-size:11px;color:var(--text-muted);font-weight:400;margin-top:2px}
    .td-gia{font-family:'JetBrains Mono',monospace;font-weight:600;color:var(--green);white-space:nowrap}
    .td-sl-low{font-family:'JetBrains Mono',monospace;font-weight:700;color:var(--red)}
    .td-sl-ok{font-family:'JetBrains Mono',monospace;font-weight:600}
    .badge{display:inline-flex;align-items:center;gap:5px;padding:3px 9px;border-radius:20px;font-size:10px;font-weight:700;letter-spacing:.04em}
    .badge-on{background:rgba(34,197,94,.12);color:var(--green);border:1px solid rgba(34,197,94,.2)}
    .badge-off{background:rgba(239,68,68,.08);color:var(--red);border:1px solid rgba(239,68,68,.2)}
    .badge-dot{width:5px;height:5px;border-radius:50%;background:currentColor}
    .action-wrap{display:flex;gap:6px;justify-content:center}
    .icon-btn{background:none;border:1px solid var(--border);border-radius:6px;padding:5px 8px;cursor:pointer;color:var(--text-muted);font-size:13px;transition:all .15s;line-height:1}
    .icon-btn:hover{border-color:var(--accent);color:var(--accent)}
    .icon-btn.del:hover{border-color:var(--red);color:var(--red)}
    .sp-pagination{display:flex;align-items:center;justify-content:space-between;padding:13px 22px;border-top:1px solid var(--border);font-size:12px;color:var(--text-muted)}
    .page-btns{display:flex;gap:4px}
    .page-btn{min-width:30px;height:30px;border-radius:6px;border:1px solid var(--border);background:none;color:var(--text-dim);cursor:pointer;font-size:12px;font-family:'JetBrains Mono',monospace;transition:all .15s;padding:0 6px}
    .page-btn:hover:not(:disabled){border-color:var(--accent);color:var(--accent)}
    .page-btn.active{background:var(--accent);color:#fff;border-color:var(--accent)}
    .page-btn:disabled{opacity:.3;cursor:not-allowed}
    .sp-center{text-align:center;padding:60px 0;color:var(--text-muted)}
    .spinner{width:34px;height:34px;border:3px solid var(--border);border-top-color:var(--accent);border-radius:50%;animation:spin .8s linear infinite;margin:0 auto 14px}
    @keyframes spin{to{transform:rotate(360deg)}}
    .sp-toast{position:fixed;bottom:24px;right:24px;z-index:9999;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:600;display:flex;align-items:center;gap:10px;min-width:260px;box-shadow:0 8px 32px rgba(0,0,0,.4);animation:slideUp .3s ease}
    @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .toast-success{background:#0f2414;border:1px solid rgba(34,197,94,.3);color:var(--green)}
    .toast-error{background:#240f0f;border:1px solid rgba(239,68,68,.3);color:#fca5a5}
    .sp-overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px;backdrop-filter:blur(4px);animation:fadeOverlay .2s ease}
    @keyframes fadeOverlay{from{opacity:0}to{opacity:1}}
    .sp-modal{background:var(--surface);border:1px solid var(--border2);border-radius:16px;width:100%;max-width:580px;max-height:90vh;overflow-y:auto;animation:slideModal .25s ease}
    @keyframes slideModal{from{opacity:0;transform:translateY(-20px) scale(.97)}to{opacity:1;transform:none}}
    .modal-header{display:flex;align-items:center;justify-content:space-between;padding:20px 24px;border-bottom:1px solid var(--border)}
    .modal-title{font-size:17px;font-weight:800}
    .modal-title span{color:var(--accent)}
    .modal-close{background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:22px;line-height:1;padding:2px;transition:color .15s}
    .modal-close:hover{color:var(--text)}
    .modal-body{padding:24px}
    .modal-footer{padding:16px 24px;border-top:1px solid var(--border);display:flex;justify-content:flex-end;gap:10px}
    .form-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .form-group{display:flex;flex-direction:column;gap:6px}
    .form-group.full{grid-column:1/-1}
    .form-label{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted)}
    .form-label .req{color:var(--accent)}
    .form-input,.form-select{padding:10px 14px;background:var(--surface2);border:1px solid var(--border);border-radius:8px;color:var(--text);font-size:13px;font-family:'Be Vietnam Pro',sans-serif;outline:none;transition:border-color .2s;width:100%}
    .form-input:focus,.form-select:focus{border-color:var(--accent);background:var(--surface3)}
    .form-input::placeholder{color:var(--text-muted)}
    .form-input.err{border-color:var(--red)}
    .form-err{font-size:11px;color:var(--red);margin-top:2px}
    .del-modal{background:var(--surface);border:1px solid rgba(239,68,68,.3);border-radius:16px;width:100%;max-width:400px;padding:28px;text-align:center;animation:slideModal .25s ease}
    .del-icon{font-size:40px;margin-bottom:12px}
    .del-title{font-size:18px;font-weight:800;margin-bottom:8px}
    .del-desc{font-size:13px;color:var(--text-muted);line-height:1.6;margin-bottom:24px}
    .del-name{color:var(--text);font-weight:600}
    .del-actions{display:flex;gap:10px;justify-content:center}
  `;
    document.head.appendChild(style);
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const PAGE_SIZE = 10;
const fmtGia = (g) =>
    g != null ? new Intl.NumberFormat("vi-VN").format(g) + " ₫" : "—";

const EMPTY_FORM = {
    maSanPham: "", tenSanPham: "", donVi: "", giaBan: "",
    slTon: "", trangThai: "1", loaiSanPham: "",
};

// ─── FORM FIELD — khai báo NGOÀI FormModal ────────────────────────────────────
// Lý do: nếu khai báo bên trong FormModal, mỗi lần state thay đổi React tạo lại
// component mới → input bị unmount/remount → mất focus, không gõ liên tục được.
function FormField({ label, required, type = "text", placeholder, className = "", value, onChange, error }) {
    return (
        <div className={`form-group ${className}`}>
            <label className="form-label">
                {label} {required && <span className="req">*</span>}
            </label>
            <input
                type={type}
                className={`form-input ${error ? "err" : ""}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {error && <div className="form-err">{error}</div>}
        </div>
    );
}

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ toast }) {
    if (!toast) return null;
    return (
        <div className={`sp-toast ${toast.type === "success" ? "toast-success" : "toast-error"}`}>
            {toast.type === "success" ? "✓" : "✕"} {toast.msg}
        </div>
    );
}

// ─── FORM MODAL ───────────────────────────────────────────────────────────────
function FormModal({ mode, initialData, onClose, onSaved, loaiList = [] }) {
    const [form, setForm] = useState(() => {
        if (mode === "edit") {
            // loaiSanPham có thể là object { id, tenLoaiSanPham } hoặc số nguyên
            const loaiId = initialData.loaiSanPham?.id ?? initialData.loaiSanPham ?? "";
            return {
                maSanPham: initialData.maSanPham || "",
                tenSanPham: initialData.tenSanPham || "",
                donVi: initialData.donVi || "",
                giaBan: initialData.giaBan ?? "",
                slTon: initialData.slTon ?? "",
                trangThai: String(initialData.trangThai ?? 1),
                loaiSanPham: String(loaiId),
            };
        }
        return { ...EMPTY_FORM };
    });

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);

    const set = (k, v) => {
        setForm((f) => ({ ...f, [k]: v }));
        setErrors((e) => ({ ...e, [k]: "" }));
    };

    const validate = () => {
        const e = {};
        if (!form.maSanPham.trim()) e.maSanPham = "Vui lòng nhập mã sản phẩm";
        if (!form.tenSanPham.trim()) e.tenSanPham = "Vui lòng nhập tên sản phẩm";
        if (!form.donVi.trim()) e.donVi = "Vui lòng nhập đơn vị";
        if (form.giaBan !== "" && isNaN(Number(form.giaBan))) e.giaBan = "Giá phải là số";
        if (form.slTon !== "" && isNaN(Number(form.slTon))) e.slTon = "Số lượng phải là số";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setSaving(true);
        const payload = {
            maSanPham: form.maSanPham.trim(),
            tenSanPham: form.tenSanPham.trim(),
            donVi: form.donVi.trim(),
            giaBan: form.giaBan !== "" ? Number(form.giaBan) : null,
            slTon: form.slTon !== "" ? Number(form.slTon) : null,
            trangThai: Number(form.trangThai),
            loaiSanPham: form.loaiSanPham !== "" ? Number(form.loaiSanPham) : null,
        };
        try {
            if (mode === "edit") {
                await SanPhamAPI.update(initialData.id, payload);
            } else {
                await SanPhamAPI.create(payload);
            }
            onSaved(mode === "edit" ? "Cập nhật thành công!" : "Thêm sản phẩm thành công!");
        } catch {
            onSaved(null);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="sp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="sp-modal">
                <div className="modal-header">
                    <div className="modal-title">
                        {mode === "edit" ? <>✏️ Sửa <span>Sản Phẩm</span></> : <>+ Thêm <span>Sản Phẩm</span> mới</>}
                    </div>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <div className="form-grid">

                        <FormField
                            label="Mã sản phẩm" required placeholder="VD: SP001"
                            value={form.maSanPham}
                            onChange={(e) => set("maSanPham", e.target.value)}
                            error={errors.maSanPham}
                        />

                        <FormField
                            label="Tên sản phẩm" required placeholder="Tên sản phẩm"
                            className="full"
                            value={form.tenSanPham}
                            onChange={(e) => set("tenSanPham", e.target.value)}
                            error={errors.tenSanPham}
                        />

                        <FormField
                            label="Đơn vị" required placeholder="VD: Cái, Hộp, Kg..."
                            value={form.donVi}
                            onChange={(e) => set("donVi", e.target.value)}
                            error={errors.donVi}
                        />

                        {/* LOẠI SẢN PHẨM — select */}
                        <div className="form-group">
                            <label className="form-label">Loại sản phẩm</label>
                            <select
                                className="form-select"
                                value={form.loaiSanPham}
                                onChange={(e) => set("loaiSanPham", e.target.value)}
                            >
                                <option key="default" value="">-- Chọn loại sản phẩm --</option>
                                {loaiList.map((loai) => (
                                    <option key={loai.id} value={String(loai.id)}>
                                        {loai.tenLoai}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <FormField
                            label="Giá bán (VNĐ)" type="number" placeholder="0"
                            value={form.giaBan}
                            onChange={(e) => set("giaBan", e.target.value)}
                            error={errors.giaBan}
                        />

                        <FormField
                            label="Số lượng tồn" type="number" placeholder="0"
                            value={form.slTon}
                            onChange={(e) => set("slTon", e.target.value)}
                            error={errors.slTon}
                        />

                        <div className="form-group">
                            <label className="form-label">Trạng thái</label>
                            <select className="form-select" value={form.trangThai}
                                    onChange={(e) => set("trangThai", e.target.value)}>
                                <option key="tt-1" value="1">Đang kinh doanh</option>
                                <option key="tt-0" value="0">Ngừng kinh doanh</option>
                            </select>
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <button className="btn btn-ghost" onClick={onClose}>Hủy</button>
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={saving}>
                        {saving ? "⏳ Đang lưu..." : mode === "edit" ? "💾 Cập nhật" : "➕ Thêm mới"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── DELETE MODAL ─────────────────────────────────────────────────────────────
function DeleteModal({ item, onClose, onDeleted }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            await SanPhamAPI.delete(item.id);
            onDeleted("Đã xóa sản phẩm thành công!");
        } catch {
            onDeleted(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sp-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="del-modal">
                <div className="del-icon">🗑️</div>
                <div className="del-title">Xóa sản phẩm?</div>
                <div className="del-desc">
                    Bạn chắc chắn muốn xóa sản phẩm{" "}
                    <span className="del-name">"{item.tenSanPham}"</span>?<br />
                    Hành động này không thể hoàn tác.
                </div>
                <div className="del-actions">
                    <button className="btn btn-ghost" onClick={onClose}>Hủy bỏ</button>
                    <button className="btn btn-danger" onClick={handleDelete} disabled={loading}>
                        {loading ? "⏳ Đang xóa..." : "🗑️ Xóa"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function SanPham() {
    useEffect(() => { injectStyles(); }, []);

    const [data, setData] = useState([]);
    const [loaiList, setLoaiList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filterTT, setFilterTT] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [page, setPage] = useState(1);
    const [toast, setToast] = useState(null);
    const [modal, setModal] = useState(null);

    const showToast = (msg, type = "success") => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const loadData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await SanPhamAPI.getAll();
            console.log("=== SANPHAM[0] ===", JSON.stringify(res.data[0]));
            setData(res.data);
        } catch {
            showToast("Không thể tải dữ liệu từ server!", "error");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        LoaiSanPhamAPI.getAll()
            .then((res) => {
                // Kiểm tra cấu trúc thực tế
                console.log("loaiSanPham response:", res);
                console.log("=== LOAI RES.DATA JSON ===", JSON.stringify(res.data));

                // Nếu backend trả về trực tiếp mảng (không wrap trong .data)
                const list = Array.isArray(res.data) ? res.data
                    : Array.isArray(res.data?.content) ? res.data.content  // Spring Page
                        : Array.isArray(res) ? res                              // axios interceptor đã unwrap
                            : [];
                setLoaiList(list);
            })
            .catch(() => showToast("Không thể tải danh sách loại sản phẩm!", "error"));
    }, []);
    useEffect(() => {
        console.log("=== LOAI LIST SAU KHI SET ===", JSON.stringify(loaiList));
    }, [loaiList]);
    useEffect(() => { loadData(); }, [loadData]);

    // Dùng String key để tránh lệch kiểu number vs string khi tra cứu
    const loaiMap = Object.fromEntries(
        loaiList.map((l) => [String(l.id), l.tenLoai])
    );

    // Hỗ trợ cả 2 trường hợp: loaiSanPham là object hoặc là ID
    const getTenLoai = (loaiSanPham) => {
        if (loaiSanPham == null) return "—";
        // Phòng trường hợp sau này đổi sang @ManyToOne trả object
        if (typeof loaiSanPham === "object") return loaiSanPham.tenLoai ?? "—";
        // Hiện tại backend trả Integer → tra map
        return loaiMap[String(loaiSanPham)] ?? `Loại #${loaiSanPham}`;
    };

    // ── Filtered + sorted list ──
    const filtered = (() => {
        const q = search.toLowerCase().trim();
        let list = data.filter((sp) => {
            const matchSearch = !q
                || (sp.tenSanPham || "").toLowerCase().includes(q)
                || (sp.maSanPham || "").toLowerCase().includes(q);
            const matchTT = !filterTT || String(sp.trangThai) === filterTT;
            return matchSearch && matchTT;
        });
        if (sortBy === "gia-asc") list.sort((a, b) => (a.giaBan || 0) - (b.giaBan || 0));
        else if (sortBy === "gia-desc") list.sort((a, b) => (b.giaBan || 0) - (a.giaBan || 0));
        else if (sortBy === "sl-asc") list.sort((a, b) => (a.slTon || 0) - (b.slTon || 0));
        return list;
    })();

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const pageData = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const stats = {
        total: data.length,
        active: data.filter((s) => s.trangThai === 1).length,
        low: data.filter((s) => (s.slTon ?? 0) < 10).length,
        maxPrice: data.length ? Math.max(...data.map((s) => s.giaBan || 0)) : 0,
    };

    const handleSaved = (msg) => {
        setModal(null);
        if (msg) { showToast(msg, "success"); loadData(); }
        else showToast("Có lỗi xảy ra, vui lòng thử lại!", "error");
    };

    const handleDeleted = (msg) => {
        setModal(null);
        if (msg) { showToast(msg, "success"); loadData(); }
        else showToast("Xóa thất bại, vui lòng thử lại!", "error");
    };

    const PagBtn = ({ p, label, disabled, active }) => (
        <button className={`page-btn ${active ? "active" : ""}`} disabled={disabled} onClick={() => setPage(p)}>
            {label ?? p}
        </button>
    );

    const pageButtons = () => {
        const btns = [];
        btns.push(<PagBtn key="prev" p={currentPage - 1} label="‹" disabled={currentPage === 1} />);
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 7 && i > 2 && i < totalPages - 1 && Math.abs(i - currentPage) > 1) {
                if (i === 3 || i === totalPages - 2)
                    btns.push(<button key={`e${i}`} className="page-btn" disabled>…</button>);
                continue;
            }
            btns.push(<PagBtn key={i} p={i} active={i === currentPage} />);
        }
        btns.push(<PagBtn key="next" p={currentPage + 1} label="›" disabled={currentPage === totalPages} />);
        return btns;
    };

    return (
        <div className="sp-root">
            {/* HEADER */}
            <div className="sp-header">
                <div>
                    <div className="sp-breadcrumb">Quản lý / <span>Sản phẩm</span></div>
                    <div className="sp-title">Danh sách <span className="sp-title-accent">Sản Phẩm</span></div>
                    <div className="sp-subtitle">
                        {loading ? "Đang tải..." : `${data.length} sản phẩm trong hệ thống`}
                    </div>
                </div>
                <div className="sp-header-actions">
                    <button className="btn btn-ghost" onClick={loadData} disabled={loading}>↺ Làm mới</button>
                    <button className="btn btn-primary" onClick={() => setModal({ type: "add" })}>+ Thêm sản phẩm</button>
                </div>
            </div>

            {/* STATS */}
            <div className="sp-stats">
                <div className="stat-card">
                    <div className="stat-label">Tổng sản phẩm</div>
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-sub">trong hệ thống</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Đang kinh doanh</div>
                    <div className="stat-value" style={{ color: "var(--green)" }}>{stats.active}</div>
                    <div className="stat-sub">trạng thái hoạt động</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Sắp hết hàng</div>
                    <div className="stat-value" style={{ color: "var(--red)" }}>{stats.low}</div>
                    <div className="stat-sub">tồn kho &lt; 10</div>
                </div>
                <div className="stat-card">
                    <div className="stat-label">Giá cao nhất</div>
                    <div className="stat-value" style={{ color: "var(--accent)", fontSize: 18 }}>
                        {stats.maxPrice ? fmtGia(stats.maxPrice) : "—"}
                    </div>
                    <div className="stat-sub">trong danh sách</div>
                </div>
            </div>

            {/* TOOLBAR */}
            <div className="sp-toolbar">
                <div className="search-wrap">
                    <svg className="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
                    </svg>
                    <input
                        type="text" className="search-input"
                        placeholder="Tìm theo tên hoặc mã sản phẩm..."
                        value={search}
                        onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    />
                </div>
                <select className="sp-select" value={filterTT} onChange={(e) => { setFilterTT(e.target.value); setPage(1); }}>
                    <option value="">Tất cả trạng thái</option>
                    <option value="1">Đang kinh doanh</option>
                    <option value="0">Ngừng kinh doanh</option>
                </select>
                <select className="sp-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">Mặc định</option>
                    <option value="gia-asc">Giá tăng dần</option>
                    <option value="gia-desc">Giá giảm dần</option>
                    <option value="sl-asc">Tồn kho tăng dần</option>
                </select>
            </div>

            {/* TABLE */}
            <div className="table-wrap">
                {loading ? (
                    <div className="sp-center">
                        <div className="spinner" />
                        <div>Đang tải dữ liệu...</div>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="sp-center">
                        <div style={{ fontSize: 36, marginBottom: 12 }}>📦</div>
                        <div>Không tìm thấy sản phẩm nào</div>
                    </div>
                ) : (
                    <>
                        <table className="sp-table">
                            <thead>
                            <tr>
                                <th>ID</th><th>Mã SP</th><th>Tên sản phẩm</th>
                                <th>Đơn vị</th><th>Giá bán</th><th>Tồn kho</th>
                                <th>Trạng thái</th><th>Thao tác</th>
                            </tr>
                            </thead>
                            <tbody>
                            {pageData.map((sp) => {
                                const isActive = sp.trangThai === 1;
                                const slLow = (sp.slTon ?? 0) < 10;
                                return (
                                    <tr key={sp.id}>
                                        <td className="td-id">#{sp.id}</td>
                                        <td className="td-ma">{sp.maSanPham || "—"}</td>
                                        <td className="td-ten">
                                            {sp.tenSanPham || "—"}
                                            <small>{getTenLoai(sp.loaiSanPham)}</small>
                                        </td>
                                        <td style={{ color: "var(--text-dim)", fontSize: 12 }}>{sp.donVi || "—"}</td>
                                        <td className="td-gia">{fmtGia(sp.giaBan)}</td>
                                        <td className={slLow ? "td-sl-low" : "td-sl-ok"}>{sp.slTon ?? "—"}</td>
                                        <td>
                                                <span className={`badge ${isActive ? "badge-on" : "badge-off"}`}>
                                                    <span className="badge-dot" />
                                                    {isActive ? "Kinh doanh" : "Ngừng"}
                                                </span>
                                        </td>
                                        <td>
                                            <div className="action-wrap">
                                                <button className="icon-btn" title="Sửa"
                                                        onClick={() => setModal({ type: "edit", item: sp })}>✏️</button>
                                                <button className="icon-btn del" title="Xóa"
                                                        onClick={() => setModal({ type: "delete", item: sp })}>🗑️</button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                        <div className="sp-pagination">
                            <span>
                                Hiển thị {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} / {filtered.length} sản phẩm
                            </span>
                            <div className="page-btns">{pageButtons()}</div>
                        </div>
                    </>
                )}
            </div>

            {/* MODALS */}
            {modal?.type === "add" && (
                <FormModal mode="add" loaiList={loaiList} onClose={() => setModal(null)} onSaved={handleSaved} />
            )}
            {modal?.type === "edit" && (
                <FormModal mode="edit" initialData={modal.item} loaiList={loaiList}
                           onClose={() => setModal(null)} onSaved={handleSaved} />
            )}
            {modal?.type === "delete" && (
                <DeleteModal item={modal.item} onClose={() => setModal(null)} onDeleted={handleDeleted} />
            )}

            <Toast toast={toast} />
        </div>
    );
}