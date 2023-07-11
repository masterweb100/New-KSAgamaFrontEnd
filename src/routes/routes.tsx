import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/login/login";

// SUPER ADMIN ROUTING
import Dashboard from "../pages/SuperAdmin/dashboard/dashboard";
import ProfileAdmin from "../pages/SuperAdmin/profileAdmin/profileAdmin";

import DataUser from "../pages/SuperAdmin/dataUser/user";
import UserForm from "../pages/SuperAdmin/dataUser/userForm";

import DataStore from "../pages/SuperAdmin/dataStore/store";
import StoreForm from "../pages/SuperAdmin/dataStore/storeForm";

import DataRole from "../pages/SuperAdmin/roleUser/role";
import RoleForm from "../pages/SuperAdmin/roleUser/roleForm";

import DataBank from "../pages/SuperAdmin/dataBank/dataBank";

import AccessUser from "../pages/SuperAdmin/accessUser/access";
import AccessSettings from "../pages/SuperAdmin/accessUser/accessSettings";

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
import PenjualanForm from "../pages/User/penjualan/penjualan/penjualanForm";
import ReturnPenjualan from "../pages/User/penjualan/returnPenjualan/returnPenjualan";
import ReturnPenjualanForm from "../pages/User/penjualan/returnPenjualan/returnPenjualanForm";

import Pembelian from "../pages/User/pembelian/pembelian/pembelian";
import PembelianForm from "../pages/User/pembelian/pembelian/pembelianForm";
import PembelianDetail from "../pages/User/pembelian/pembelian/pembelianDetail";
import PembelianDetailForm from "../pages/User/pembelian/pembelian/pembelianDetailForm";
import Tracking from "../pages/User/pembelian/tracking/tracking";

import Akun from "../pages/User/akun/akun";
import AkunForm from "../pages/User/akun/akunForm";
import KategoriAkun from "../pages/User/akun/kategori";
import KategoriAkunForm from "../pages/User/akun/kategoriForm";
import DetailAkun from "../pages/User/akun/akunDetail";

import LapKeuangan from "../pages/User/laporan/keuangan/keuangan";
import LapTransaksi from "../pages/User/laporan/transaksi/transaksi";
import PenjualanDetailTable from "../pages/User/laporan/transaksi/penjualan/penjualanDetailTable";
import UmurPiutangTable from "../pages/User/laporan/transaksi/penjualan/umurPuitangTable";
import UmurPiutangDetailTable from "../pages/User/laporan/transaksi/penjualan/umurPiutangDetailTable";
import PendapatanPelangganTable from "../pages/User/laporan/transaksi/penjualan/pendapatanPelangganTable";
import PenjualanProdukTable from "../pages/User/laporan/transaksi/penjualan/penjualanProdukTable";
import PembelianDetailTable from "../pages/User/laporan/transaksi/pembelian/pembelianDetailTable";
import UmurHutangTable from "../pages/User/laporan/transaksi/pembelian/umurHutangTable";
import UmurHutangDetailTable from "../pages/User/laporan/transaksi/pembelian/umurHutangDetailTable";
import PembelianSupplierTable from "../pages/User/laporan/transaksi/pembelian/pembelianSupplierTable";
import PembelianProdukTable from "../pages/User/laporan/transaksi/pembelian/pembelianProdukTable";
import LapBank from "../pages/User/laporan/bank/bank";
import KasBank from "../pages/User/laporan/bank/kas/kas";
import KasDepositForm from "../pages/User/laporan/bank/kas/kasDepositForm";
import KasWithdrawForm from "../pages/User/laporan/bank/kas/kasWithdrawForm";

import Pelanggan from "../pages/User/kontak/pelanggan/pelanggan";
import PelangganForm from "../pages/User/kontak/pelanggan/pelangganForm";
import Supplier from "../pages/User/kontak/supplier/supplier";
import SupplierForm from "../pages/User/kontak/supplier/supplierForm";
import Ekspedisi from "../pages/User/kontak/ekspedisi/ekspedisi";
import EkspedisiForm from "../pages/User/kontak/ekspedisi/ekspedisiForm";

import AppGudang from "../pages/User/approval/gudang/gudang";
import AppPembelian from "../pages/User/approval/pembelian/pembelian";
import AppPenjualan from "../pages/User/approval/penjualan/penjualan";

import SetDataToko from "../pages/User/pengaturan/dataToko/dataToko";
import SetPenomoran from "../pages/User/pengaturan/penomoran/penomoran";
import SetProfil from "../pages/User/pengaturan/profil/profileku";
import SetPeran from "../pages/User/pengaturan/peran/peran";
import PeranSettings from "../pages/User/pengaturan/peran/peranSettings";
import ProtectedRoutes from "./protectedRoutes";
import UserRoutes from "./userRoutes";
import AdminRoutes from "./adminRoutes";
import AkunBank from "../pages/User/kontak/akun-bank/akun-banks";
import AkunBankForm from "../pages/User/kontak/akun-bank/akun-bankForm";

const PageRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          {/* SUPER ADMIN */}
          <Route element={<AdminRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin-profile" element={<ProfileAdmin />} />
            <Route path="/user-data" element={<DataUser />} />
            <Route path="/user-data/form-user/:action" element={<UserForm />} />
            <Route path="/store-data" element={<DataStore />} />
            <Route
              path="/store-data/form-store/:action"
              element={<StoreForm />}
            />
            <Route path="/user-role" element={<DataRole />} />
            <Route path="/user-role/form-role/:action" element={<RoleForm />} />
            <Route path="/user-access" element={<AccessUser />} />
            <Route path="/user-access/settings" element={<AccessSettings />} />
            <Route path="/bank-data" element={<DataBank />} />
          </Route>

          {/* USER */}
          <Route element={<UserRoutes />}>
            <Route path="/dashboard-user" element={<DashboardUser />} />
            <Route path="/gudang/data-produk" element={<DataProduk />} />
            <Route
              path="/gudang/data-produk/form-produk"
              element={<DataProdukForm />}
            />
            <Route path="/gudang/mutasi" element={<Mutasi />} />
            <Route path="/gudang/mutasi/form-mutasi" element={<MutasiForm />} />
            <Route path="/gudang/list-produk" element={<ListProduk />} />
            <Route
              path="/gudang/list-produk/form-brand/:action"
              element={<BrandForm />}
            />
            <Route
              path="/gudang/list-produk/form-jenis/:action"
              element={<JenisForm />}
            />
            <Route
              path="/gudang/list-produk/form-kategori/:action"
              element={<KategoriForm />}
            />
            <Route
              path="/gudang/list-produk/form-satuan/:action"
              element={<SatuanForm />}
            />

            <Route path="/penjualan/penjualan" element={<Penjualan />} />
            <Route
              path="/penjualan/penjualan/form-penjualan/:action"
              element={<PenjualanForm />}
            />
            <Route
              path="/penjualan/return-penjualan"
              element={<ReturnPenjualan />}
            />
            <Route
              path="/penjualan/return-penjualan/form-return/:action"
              element={<ReturnPenjualanForm />}
            />

            <Route path="/pembelian/pembelian" element={<Pembelian />} />
            <Route
              path="/pembelian/pembelian/form-pembelian/:action"
              element={<PembelianForm />}
            />
            <Route
              path="/pembelian/pembelian/detail"
              element={<PembelianDetail />}
            />
            <Route
              path="/pembelian/pembelian/form-detail/:action"
              element={<PembelianDetailForm />}
            />
            <Route path="/pembelian/tracking" element={<Tracking />} />

            <Route path="/akun" element={<Akun />} />
            <Route path="/akun/form-akun" element={<AkunForm />} />
            <Route path="/akun/detail-akun" element={<DetailAkun />} />
            <Route path="/akun/kategori-akun" element={<KategoriAkun />} />
            <Route path="/akun/form-kategori" element={<KategoriAkunForm />} />

            <Route path="/laporan/keuangan" element={<LapKeuangan />} />
            <Route path="/laporan/transaksi" element={<LapTransaksi />} />
            <Route
              path="/laporan/transaksi/penjualan/detail"
              element={<PenjualanDetailTable />}
            />
            <Route
              path="/laporan/transaksi/penjualan/piutang"
              element={<UmurPiutangTable />}
            />
            <Route
              path="/laporan/transaksi/penjualan/piutang/detail"
              element={<UmurPiutangDetailTable />}
            />
            <Route
              path="/laporan/transaksi/penjualan/income"
              element={<PendapatanPelangganTable />}
            />
            <Route
              path="/laporan/transaksi/penjualan/produk"
              element={<PenjualanProdukTable />}
            />
            <Route
              path="/laporan/transaksi/pembelian/detail"
              element={<PembelianDetailTable />}
            />
            <Route
              path="/laporan/transaksi/pembelian/hutang"
              element={<UmurHutangTable />}
            />
            <Route
              path="/laporan/transaksi/pembelian/hutang/detail"
              element={<UmurHutangDetailTable />}
            />
            <Route
              path="/laporan/transaksi/pembelian/outcome"
              element={<PembelianSupplierTable />}
            />
            <Route
              path="/laporan/transaksi/pembelian/produk"
              element={<PembelianProdukTable />}
            />
            <Route path="/laporan/bank" element={<LapBank />} />
            <Route path="/laporan/bank/kas" element={<KasBank />} />
            <Route
              path="/laporan/bank/kas/deposit"
              element={<KasDepositForm />}
            />
            <Route
              path="/laporan/bank/kas/withdraw"
              element={<KasWithdrawForm />}
            />

            <Route path="/kontak/pelanggan" element={<Pelanggan />} />
            <Route
              path="/kontak/pelanggan/form-pelanggan"
              element={<PelangganForm />}
            />
            <Route path="/kontak/supplier" element={<Supplier />} />
            <Route
              path="/kontak/supplier/form-supplier"
              element={<SupplierForm />}
            />
            <Route path="/kontak/ekspedisi" element={<Ekspedisi />} />
            <Route
              path="/kontak/ekspedisi/form-ekspedisi"
              element={<EkspedisiForm />}
            />
            <Route path="/kontak/akun-bank" element={<AkunBank />} />
            <Route
              path="/kontak/akun-bank/form-akunbank"
              element={<AkunBankForm />}
            />

            <Route path="/approval/gudang" element={<AppGudang />} />
            <Route path="/approval/pembelian" element={<AppPembelian />} />
            <Route path="/approval/penjualan" element={<AppPenjualan />} />

            <Route path="/settings/data-toko" element={<SetDataToko />} />
            <Route path="/settings/penomoran" element={<SetPenomoran />} />
            <Route path="/settings/profilku" element={<SetProfil />} />
            <Route path="/settings/peran" element={<SetPeran />} />
            <Route
              path="/settings/peran/set-peran"
              element={<PeranSettings />}
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default PageRouter;
