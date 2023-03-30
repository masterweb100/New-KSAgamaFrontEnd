import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/login/login";

// SUPER ADMIN ROUTING
import Dashboard from "../pages/SuperAdmin/dashboard/dashboard";

import DataUser from "../pages/SuperAdmin/dataUser/user";
import UserForm from "../pages/SuperAdmin/dataUser/userForm";

import DataStore from "../pages/SuperAdmin/dataStore/store";
import StoreForm from "../pages/SuperAdmin/dataStore/storeForm";

import DataRole from "../pages/SuperAdmin/roleUser/role";
import RoleForm from "../pages/SuperAdmin/roleUser/roleForm";

import DataBank from "../pages/SuperAdmin/dataBank/dataBank";
import AccessUser from "../pages/SuperAdmin/accessUser/access";

// USER ROUTING
import DashboardUser from "../pages/User/dashboard/dashboard";

import DataProduk from "../pages/User/gudang/dataProduk/dataProduk";
import DataProdukForm from "../pages/User/gudang/dataProduk/dataOpnameForm";
import Mutasi from "../pages/User/gudang/mutasi/mutasi";
import MutasiForm from "../pages/User/gudang/mutasi/mutasiForm";
import ListProduk from "../pages/User/gudang/listProduk/listProduk";
import BrandForm from "../pages/User/gudang/listProduk/brandForm";
import JenisForm from "../pages/User/gudang/listProduk/jenisForm";
import KategoriForm from "../pages/User/gudang/listProduk/kategoriForm";
import SatuanForm from "../pages/User/gudang/listProduk/satuanForm";

import Penjualan from "../pages/User/penjualan/penjualan/penjualan";
import ReturnPenjualan from "../pages/User/penjualan/returnPenjualan/returnPenjualan";
import ReturnPenjualanForm from "../pages/User/penjualan/returnPenjualan/returnPenjualanForm";

import Pembelian from "../pages/User/pembelian/pembelian/pembelian";
import Tracking from "../pages/User/pembelian/tracking/tracking";

import Akun from "../pages/User/akun/akun";

import LapKeuangan from "../pages/User/laporan/keuangan/keuangan";
import LapTransaksi from "../pages/User/laporan/transaksi/transaksi";

import Pelanggan from "../pages/User/kontak/pelanggan/pelanggan";
import Supplier from "../pages/User/kontak/supplier/supplier";
import Ekspedisi from "../pages/User/kontak/ekspedisi/ekspedisi";

import AppGudang from "../pages/User/approval/gudang/gudang";
import AppPembelian from "../pages/User/approval/pembelian/pembelian";
import AppPenjualan from "../pages/User/approval/penjualan/penjualan";

import SetDataToko from "../pages/User/pengaturan/dataToko/dataToko";
import SetPenomoran from "../pages/User/pengaturan/penomoran/penomoran";
import SetProfil from "../pages/User/pengaturan/profil/profileku";
import SetPeran from "../pages/User/pengaturan/peran/peran";

const PageRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                
                {/* SUPER ADMIN */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-data" element={<DataUser />} />
                <Route path="/user-data/form-user" element={<UserForm />} />
                <Route path="/store-data" element={<DataStore />} />
                <Route path="/store-data/form-store" element={<StoreForm />} />
                <Route path="/user-role" element={<DataRole />} />
                <Route path="/user-role/form-role" element={<RoleForm />} />
                <Route path="/user-access" element={<AccessUser />} />
                <Route path="/bank-data" element={<DataBank />} />

                {/* USER */}
                <Route path="/dashboard-user" element={<DashboardUser />} />

                <Route path="/gudang/data-produk" element={<DataProduk />} />
                <Route path="/gudang/data-produk/form-produk" element={<DataProdukForm />} />
                <Route path="/gudang/mutasi" element={<Mutasi />} />
                <Route path="/gudang/mutasi/form-mutasi" element={<MutasiForm />} />
                <Route path="/gudang/list-produk" element={<ListProduk />} />
                <Route path="/gudang/list-produk/form-brand" element={<BrandForm />} />
                <Route path="/gudang/list-produk/form-jenis" element={<JenisForm />} />
                <Route path="/gudang/list-produk/form-kategori" element={<KategoriForm />} />
                <Route path="/gudang/list-produk/form-satuan" element={<SatuanForm />} />

                <Route path="/penjualan/penjualan" element={<Penjualan />} />
                <Route path="/penjualan/return-penjualan" element={<ReturnPenjualan />} />
                <Route path="/penjualan/return-penjualan/form-return" element={<ReturnPenjualanForm />} />

                <Route path="/pembelian/pembelian" element={<Pembelian />} />
                <Route path="/pembelian/tracking" element={<Tracking />} />

                <Route path="/akun" element={<Akun />} />

                <Route path="/laporan/keuangan" element={<LapKeuangan />} />
                <Route path="/laporan/transaksi" element={<LapTransaksi />} />

                <Route path="/kontak/pelanggan" element={<Pelanggan />} />
                <Route path="/kontak/supplier" element={<Supplier />} />
                <Route path="/kontak/ekspedisi" element={<Ekspedisi />} />

                <Route path="/approval/gudang" element={<AppGudang />} />
                <Route path="/approval/pembelian" element={<AppPembelian />} />
                <Route path="/approval/penjualan" element={<AppPenjualan />} />

                <Route path="/settings/data-toko" element={<SetDataToko />} />
                <Route path="/settings/penomoran" element={<SetPenomoran />} />
                <Route path="/settings/profilku" element={<SetProfil />} />
                <Route path="/settings/peran" element={<SetPeran />} />
            </Routes>
        </Router>
    )
}

export default PageRouter;