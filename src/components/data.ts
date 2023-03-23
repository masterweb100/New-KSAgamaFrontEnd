export const ListAdmin = [
  {
    id: 1,
    name: "Dashboard",
    navigate: "/dashboard",
  },
  {
    id: 2,
    name: "Data Pengguna",
    navigate: "/user-data",
  },
  {
    id: 3,
    name: "Data Toko",
    navigate: "/store-data",
  },
  {
    id: 4,
    name: "Role Pengguna",
    navigate: "/user-role",
  },
  {
    id: 5,
    name: "Hak Akses",
    navigate: "/user-access",
  },
  {
    id: 6,
    name: "Data Bangkir",
    navigate: "/bank-data",
  },
];

export const ListUser = [
  {
    name: "Dashboard",
    icon: "dashboard",
    navigate: "",
    expandable: false,
    children: [],
  },
  {
    name: "Gudang",
    icon: "warehouse",
    navigate: "",
    expandable: true,
    children: [
      {
        name: "Data Produk",
        icon: "webhook",
        navigate: "",
      },
      {
        name: "Mutasi & Return",
        icon: "sync_alt",
        navigate: "",
      },
    ],
  },
  {
    name: "Penjualan",
    icon: "price_check",
    navigate: "",
    expandable: true,
    children: [
      {
        name: "Tagihan",
        icon: "receipt_long",
        navigate: "",
      },
      {
        name: "Return Penjualan",
        icon: "settings_backup_restore",
        navigate: "",
      },
    ],
  },
  {
    name: "Pembelian",
    icon: "add_shopping_cart",
    navigate: "",
    expandable: true,
    children: [
      {
        name: "Pembelian",
        icon: "shopping_cart_checkout",
        navigate: "",
      },
      {
        name: "Tracking",
        icon: "track_changes",
        navigate: "",
      },
    ],
  },
  {
    name: "Akun",
    icon: "description",
    navigate: "",
    expandable: false,
    children: [],
  },
  {
    name: "Laporan",
    icon: "query_stats",
    navigate: "",
    expandable: true,
    children: [
      {
        name: "Lap. Keuangan",
        icon: "price_change",
        navigate: "",
      },
      {
        name: "Lap. Penjualan & Pembelian",
        icon: "swap_vert",
        navigate: "",
      },
    ],
  },
  {
    name: "Kontak",
    icon: "contacts",
    navigate: "",
    expandable: true,
    children: [
      {
        name: "Pelanggan",
        icon: "shopping_bag",
        navigate: "",
      },
      {
        name: "Supplier",
        icon: "format_list_numbered",
        navigate: "",
      },
      {
        name: "Ekspedisi",
        icon: "LocalShipping",
        navigate: "",
      },
    ],
  },
  {
    name: "Approval",
    icon: "approval",
    navigate: "",
    expandable: false,
    children: [],
  },
  {
    name: "Pengaturan",
    icon: "settings",
    navigate: "",
    expandable: true,
    children: [
      {
        name: "Data Toko",
        icon: "local_convenience_store",
        navigate: "",
      },
      {
        name: "Pengaturan Penomoran",
        icon: "format_list_numbered",
        navigate: "",
      },
      {
        name: "Profilku",
        icon: "manage_accounts",
        navigate: "",
      },
      {
        name: "Peran",
        icon: "lock_open",
        navigate: "",
      },
    ],
  },
];
