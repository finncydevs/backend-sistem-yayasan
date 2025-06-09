-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 21 Bulan Mei 2025 pada 07.01
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `moment_of`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(25) NOT NULL,
  `photo` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `nomor_surat`
--

CREATE TABLE `nomor_surat` (
  `id` int(11) NOT NULL,
  `id_tapel` int(11) NOT NULL,
  `nama_pimpinan` varchar(25) NOT NULL,
  `tgl_sp` date DEFAULT NULL,
  `tmt` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `pegawai`
--

CREATE TABLE `pegawai` (
  `id` int(11) NOT NULL,
  `nama` varchar(50) NOT NULL,
  `kewarganegaraan` enum('WNI','WNA') DEFAULT NULL,
  `nik` varchar(16) NOT NULL,
  `nuptk` varchar(16) NOT NULL,
  `nip` varchar(16) NOT NULL,
  `nipy` varchar(16) NOT NULL,
  `npwp` varchar(16) NOT NULL,
  `tmp_lahir` varchar(15) NOT NULL,
  `tgl_lahir` date DEFAULT NULL,
  `jk` enum('L','P') DEFAULT NULL,
  `agama` enum('Islam','Kristen','Katolik','Buddha','Hindu') DEFAULT NULL,
  `nama_ibu` varchar(50) NOT NULL,
  `status_pernikahan` enum('Menikah','Lajang','Duda','Janda') DEFAULT NULL,
  `nama_suami_istri` varchar(50) NOT NULL,
  `jml_anak` varchar(5) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `kecamatan` varchar(25) NOT NULL,
  `desa` varchar(25) NOT NULL,
  `kabupaten` varchar(25) NOT NULL,
  `provinsi` varchar(25) NOT NULL,
  `kode_pos` varchar(15) NOT NULL,
  `photo` varchar(100) DEFAULT NULL,
  `status` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `penugasan`
--

CREATE TABLE `penugasan` (
  `id` int(11) NOT NULL,
  `id_tapel` int(11) NOT NULL,
  `id_nomor_surat` int(11) NOT NULL,
  `id_pegawai` int(11) NOT NULL,
  `id_satuan_pendidikan` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `profil_lembaga`
--

CREATE TABLE `profil_lembaga` (
  `id` int(11) NOT NULL,
  `nama` varchar(25) NOT NULL,
  `npyn` varchar(16) NOT NULL,
  `thn_berdiri` date DEFAULT NULL,
  `luas` varchar(15) NOT NULL,
  `moto` varchar(15) DEFAULT NULL,
  `logo` varchar(100) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `desa` varchar(15) NOT NULL,
  `kecamatan` varchar(15) NOT NULL,
  `kabupaten` varchar(15) NOT NULL,
  `provinsi` varchar(15) NOT NULL,
  `kode_pos` varchar(5) NOT NULL,
  `telepon` varchar(13) NOT NULL,
  `fax` varchar(15) NOT NULL,
  `email` varchar(15) NOT NULL,
  `situs_web` varchar(15) DEFAULT NULL,
  `facebook` varchar(15) DEFAULT NULL,
  `youtube` varchar(15) DEFAULT NULL,
  `tiktok` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `satuan_pendidikan`
--

CREATE TABLE `satuan_pendidikan` (
  `id` int(11) NOT NULL,
  `nama` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `tapel`
--

CREATE TABLE `tapel` (
  `id` int(11) NOT NULL,
  `tapel` varchar(25) NOT NULL,
  `ket` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `nomor_surat`
--
ALTER TABLE `nomor_surat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_nomor_surat_tapel` (`id_tapel`);

--
-- Indeks untuk tabel `pegawai`
--
ALTER TABLE `pegawai`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `penugasan`
--
ALTER TABLE `penugasan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_penugasan_tapel` (`id_tapel`),
  ADD KEY `fk_penugasan_nomor_surat` (`id_nomor_surat`),
  ADD KEY `fk_penugasan_pegawai` (`id_pegawai`),
  ADD KEY `fk_penugasan_satuan_pendidikan` (`id_satuan_pendidikan`);

--
-- Indeks untuk tabel `profil_lembaga`
--
ALTER TABLE `profil_lembaga`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `satuan_pendidikan`
--
ALTER TABLE `satuan_pendidikan`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tapel`
--
ALTER TABLE `tapel`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `nomor_surat`
--
ALTER TABLE `nomor_surat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `pegawai`
--
ALTER TABLE `pegawai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `penugasan`
--
ALTER TABLE `penugasan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `profil_lembaga`
--
ALTER TABLE `profil_lembaga`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `satuan_pendidikan`
--
ALTER TABLE `satuan_pendidikan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `tapel`
--
ALTER TABLE `tapel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `nomor_surat`
--
ALTER TABLE `nomor_surat`
  ADD CONSTRAINT `fk_nomor_surat_tapel` FOREIGN KEY (`id_tapel`) REFERENCES `tapel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `penugasan`
--
ALTER TABLE `penugasan`
  ADD CONSTRAINT `fk_penugasan_nomor_surat` FOREIGN KEY (`id_nomor_surat`) REFERENCES `nomor_surat` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_penugasan_pegawai` FOREIGN KEY (`id_pegawai`) REFERENCES `pegawai` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_penugasan_satuan_pendidikan` FOREIGN KEY (`id_satuan_pendidikan`) REFERENCES `satuan_pendidikan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_penugasan_tapel` FOREIGN KEY (`id_tapel`) REFERENCES `tapel` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
