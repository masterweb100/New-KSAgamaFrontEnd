export const keuanganData = [
    {
        title: 'Data Pendapatan',
        date: '20/03/2023',
        subtitle: 'Penjualan',
        list: [
            { id: '4-40000', title: 'Pendapatan', value: '32.000.000' },
            { id: '4-40001', title: 'Pendapatan Produk Listrik', value: '23.000.000' },
            { id: '4-40003', title: 'Pendapatan Produk non Listrik', value: '30.000.000' },
            { id: '4-40004', title: 'Pendapatan Ongkir', value: '12.000.000' },
        ],
        footer: 'Pendapatan / Laba Rugi',
        total: '97.000.000'
    },
    {
        title: 'Beban Pokok Penjualan',
        date: '20/01/2023',
        subtitle: 'Pembelian',
        list: [
            { id: '5-50000', title: 'Beban Pokok Pendapatan', value: '5.000.000' },
            { id: '5-50001', title: 'HPP Ongkir', value: '2.000.000' },
            { id: '5-50002', title: 'Pembelian Barang', value: '4.000.000' },
            { id: '5-50003', title: 'Return Pembelian', value: '3.000.000' },
        ],
        footer: 'Beban Pokok Penjualan',
        total: '14.000.000'
    },
]

export const laporanData = [
    {
        title: 'Laporan Penjualan',
        list: ['Detail Penjualan', 'Umur Piutang', 'Pendapatan Per Pelanggan', 'Penjualan Per Produk']
    },
    {
        title: 'Laporan Pembelian',
        list: ['Detail Pembelian', 'Umur Hutang', 'Pendapatan Per Produk', 'Pembelain Per Supplier']
    },
]