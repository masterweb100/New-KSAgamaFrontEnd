export const ListAdmin = [
  {
    id: 1,
    name: "Dashboard",
    navigate: "/dashboard",
    icon: "dashboard",
  },
  {
    id: 2,
    name: "Data Pengguna",
    navigate: "/user-data",
    icon: "admin_panel_settings",
  },
  {
    id: 3,
    name: "Data Toko",
    navigate: "/store-data",
    icon: "store",
  },
  {
    id: 4,
    name: "Role Pengguna",
    navigate: "/user-role",
    icon: "perm_contact_calendar",
  },
  {
    id: 5,
    name: "Hak Akses",
    navigate: "/user-access",
    icon: "lock_person"
  },
  {
    id: 6,
    name: "Data Bangkir",
    navigate: "/bank-data",
    icon: "account_balance"
  },
];

export const ListUser = [
  {
    id: 1,
    name: "Dashboard",
    icon: "dashboard",
    navigate: "/dashboard-user",
    expandable: false,
    children: [],
  },
  {
    id: 2,
    name: "Gudang",
    icon: "warehouse",
    navigate: "",
    expandable: true,
    children: [
      {
        id: 2.1,
        name: "Data Produk",
        icon: "webhook",
        navigate: "/gudang/data-produk",
      },
      {
        id: 2.2,
        name: "Mutasi & Return",
        icon: "sync_alt",
        navigate: "/gudang/mutasi",
      },
      {
        id: 2.2,
        name: "List Produk",
        icon: "sync_alt",
        navigate: "/gudang/list-produk",
      },
    ],
  },
  {
    id: 3,
    name: "Penjualan",
    icon: "price_check",
    navigate: "",
    expandable: true,
    children: [
      {
        id: 3.1,
        name: "Penjualan",
        icon: "receipt_long",
        navigate: "/penjualan/penjualan",
      },
      {
        id: 3.2,
        name: "Return Penjualan",
        icon: "settings_backup_restore",
        navigate: "/penjualan/return-penjualan",
      },
    ],
  },
  {
    id: 4,
    name: "Pembelian",
    icon: "add_shopping_cart",
    navigate: "",
    expandable: true,
    children: [
      {
        id: 4.1,
        name: "Pembelian",
        icon: "shopping_cart_checkout",
        navigate: "/pembelian/pembelian",
      },
      {
        id: 4.2,
        name: "Tracking",
        icon: "track_changes",
        navigate: "/pembelian/tracking",
      },
    ],
  },
  {
    id: 5,
    name: "Akun",
    icon: "description",
    navigate: "/akun",
    expandable: false,
    children: [],
  },
  {
    id: 6,
    name: "Laporan",
    icon: "query_stats",
    navigate: "",
    expandable: true,
    children: [
      {
        id: 6.1,
        name: "Lap. Keuangan",
        icon: "price_change",
        navigate: "/laporan/keuangan",
      },
      {
        id: 6.2,
        name: "Lap. Penjualan & Pembelian",
        icon: "swap_vert",
        navigate: "/laporan/transaksi",
      },
    ],
  },
  {
    id: 7,
    name: "Kontak",
    icon: "contacts",
    navigate: "",
    expandable: true,
    children: [
      {
        id: 7.1,
        name: "Pelanggan",
        icon: "shopping_bag",
        navigate: "/kontak/pelanggan",
      },
      {
        id: 7.2,
        name: "Supplier",
        icon: "format_list_numbered",
        navigate: "/kontak/supplier",
      },
      {
        id: 7.3,
        name: "Ekspedisi",
        icon: "LocalShipping",
        navigate: "/kontak/ekspedisi",
      },
    ],
  },
  {
    id: 8,
    name: "Approval",
    icon: "approval",
    navigate: "",
    expandable: true,
    children: [
      {
        id: 8.1,
        name: "App. Gudang",
        icon: "local_convenience_store",
        navigate: "/approval/gudang",
      },
      {
        id: 8.1,
        name: "App. Penjualan",
        icon: "local_convenience_store",
        navigate: "/approval/penjualan",
      },
      {
        id: 8.1,
        name: "App. Pembelian",
        icon: "local_convenience_store",
        navigate: "/approval/pembelian",
      },
    ],
  },
  {
    id: 9,
    name: "Pengaturan",
    icon: "settings",
    navigate: "",
    expandable: true,
    children: [
      {
        id: 9.1,
        name: "Data Toko",
        icon: "local_convenience_store",
        navigate: "/settings/data-toko",
      },
      {
        id: 9.2,
        name: "Pengaturan Penomoran",
        icon: "format_list_numbered",
        navigate: "/settings/penomoran",
      },
      {
        id: 9.3,
        name: "Profilku",
        icon: "manage_accounts",
        navigate: "/settings/profilku",
      },
      {
        id: 9.4,
        name: "Peran",
        icon: "lock_open",
        navigate: "/settings/peran",
      },
    ],
  },
];
