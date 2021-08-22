-- phpMyAdmin SQL Dump
-- version 4.9.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 13, 2020 at 12:49 AM
-- Server version: 10.0.38-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hmsw2523_webhimasi2`
--

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'T6xBKJRQaZaLE3KX3goVXKl3RfT5BwALoTJsWZhW', 'http://localhost', 1, 0, 0, '2020-04-05 20:08:13', '2020-04-05 20:08:13'),
(2, NULL, 'Laravel Password Grant Client', 'TE1eL3zzQ4DW5z2p8EHNxZVvCfA8ztS9037wFG2V', 'http://localhost', 0, 1, 0, '2020-04-05 20:08:13', '2020-04-05 20:08:13');

-- --------------------------------------------------------

--
-- Table structure for table `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `client_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pre_users`
--

CREATE TABLE `pre_users` (
  `nim` varchar(7) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pre_users`
--

INSERT INTO `pre_users` (`nim`, `name`, `status`, `updated_at`) VALUES
('1217001', 'Nerissa Rosalia', 0, NULL),
('1217002', 'Evan Jordi', 0, NULL),
('1217003', 'Hengki Wijaya', 0, NULL),
('1217004', 'Novianto', 0, NULL),
('1217005', 'Julius Subarkah', 0, NULL),
('1217006', 'Izrael Jacob Wijaya Setiawan', 0, NULL),
('1217007', 'Gabriella Michaela Budiharja', 0, NULL),
('1217008', 'Michael Prabowo', 0, NULL),
('1217009', 'Thomas Lucky Prasojo', 1, '2020-04-09 14:37:51'),
('1217011', 'Reinaldo', 0, NULL),
('1217012', 'Raymond Agustian Riyadi', 0, NULL),
('1217014', 'Benyamin Pratama Halim', 0, NULL),
('1217015', 'Ellena Sarah Josephine', 0, NULL),
('1217016', 'Sharone Sabbathania', 0, NULL),
('1217018', 'Adithya Bagja', 0, NULL),
('1217019', 'Yoan Julius', 0, NULL),
('1217022', 'Julio Gallardo M', 0, NULL),
('1217023', 'Elisamore Damanik', 0, NULL),
('1217024', 'Ryan William', 0, NULL),
('1217027', 'Ni Made Villien Saraswati', 0, NULL),
('1217028', 'Benedectus Yesa Hardani Putra', 0, NULL),
('1217030', 'Victorya Gabriela Massie', 0, NULL),
('1217031', 'Hammam Fadli', 0, NULL),
('1217032', 'Jeremia Aldy Pratama Suherman', 1, '2020-04-09 14:48:45'),
('1217033', 'Priscilla Gabriela', 0, NULL),
('1217034', 'Calvin Jonathan Chandra', 0, NULL),
('1217037', 'Yovino Wempi Nata Tondatuon', 0, NULL),
('1218001', 'Angela Gabrielle Savena', 0, NULL),
('1218002', 'Gabriella Christina Wahyu', 0, NULL),
('1218003', 'Andre Sutanto', 0, NULL),
('1218004', 'Luthfi Muharram Adyatma', 0, NULL),
('1218006', 'Romario', 0, NULL),
('1218007', 'Arvin William Wiryawinata', 0, NULL),
('1218008', 'Vincentsius Herlambang Pandji  Pradipto', 0, NULL),
('1218009', 'Federik Setia Wijaya', 0, NULL),
('1218010', 'Richard Arden', 0, NULL),
('1218011', 'Chindhi Chrestella', 0, NULL),
('1218012', 'Ray Amadisky', 0, NULL),
('1218013', 'Yusufa Setiawan', 0, NULL),
('1218014', 'Stevano Reynerich', 0, NULL),
('1218015', 'Stefani Priskila Gauland', 0, NULL),
('1218017', 'Leorence Satumalay', 0, NULL),
('1218018', 'William Christopher Lee', 0, NULL),
('1218019', 'Arlettza Maureen', 0, NULL),
('1218020', 'Andi Kurniawan Wikarjo', 0, NULL),
('1218022', 'Benedict Zebe Octovius', 0, NULL),
('1218023', 'Jesen Christianto', 0, NULL),
('1218025', 'Erick Rapael Binsar Simbolon', 0, NULL),
('1218026', 'Steven', 0, NULL),
('1218027', 'Andreano Susela', 0, NULL),
('1218029', 'Ignatius Aryo Bimo Danudoro', 0, NULL),
('1218030', 'David Nathaniel', 0, NULL),
('1218031', 'Jenta Undeng Tikoh Basara', 0, NULL),
('1218034', 'Fransisca Mutiara Dewi', 0, NULL),
('1218035', 'Jeremy Christian', 0, NULL),
('1218036', 'Bryant Abraham Noah', 0, NULL),
('1218037', 'Celvin Candra', 0, NULL),
('1218039', 'Ribka Wulan Simbolon', 0, NULL),
('1218040', 'Gunawan Tandy', 0, NULL),
('1218041', 'Hizkia Septcio Karlo Robintang Sagala', 0, NULL),
('1218042', 'Priskarinda Putri Analicia Destiny', 0, NULL),
('1218043', 'Kelvin Alexander', 0, NULL),
('1218044', 'Josephan Budianto', 0, NULL),
('1218045', 'George Mickael', 0, NULL),
('1218046', 'Lu\' Lu\' Ah Zakiyah', 0, NULL),
('1218047', 'Marvel Demario', 0, NULL),
('1219001', 'Nicholas Ariesto', 0, NULL),
('1219002', 'Chris Jason', 0, NULL),
('1219003', 'Alexander Diva Yulianto', 0, NULL),
('1219004', 'Samantha Desideria', 0, NULL),
('1219005', 'Michael Ongko', 0, NULL),
('1219006', 'Sharleen Natalie', 0, NULL),
('1219007', 'Kevin Elia Santoso', 0, NULL),
('1219008', 'Euginia Gentala Kanaka', 0, NULL),
('1219009', 'Vincenlie Natanael', 0, NULL),
('1219010', 'Aditya Kalyana Putra', 0, NULL),
('1219011', 'Alexander Bagus Indra Mulia Pratama', 0, NULL),
('1219012', 'Steven', 0, NULL),
('1219013', 'Stephanie Surya', 0, NULL),
('1219014', 'Sigit Suganda Pardamean', 0, NULL),
('1219015', 'Yosua Berlyanda Putra', 0, NULL),
('1219016', 'Steward Jeferson Thenu', 0, NULL),
('1219017', 'Safira Seila Putri Pangabdi', 0, NULL),
('1219018', 'Sylviana Anata Widjaja', 0, NULL),
('1219019', 'Michael Bregin Sembiring', 0, NULL),
('1219020', 'Willy Andreas', 0, NULL),
('1219021', 'Egria Natasya Br.Tarigan', 0, NULL),
('1219022', 'Grace Olivia Lyman', 0, NULL),
('1219023', 'Mathias Kevin Eka Putera', 0, NULL),
('1219024', 'Natan Willy Suherman', 0, NULL),
('1219025', 'Abraham Lungguh Prayoga', 0, NULL),
('1219026', 'Abednego Yoga Raharja', 0, NULL),
('1219027', 'Jim Johannes Pangerapan', 0, NULL),
('1219028', 'Ferry Nefo Sofian', 0, NULL),
('1219029', 'Dorkas Iman Kasih Zendrato', 0, NULL),
('1219030', 'Ivenna Bella Natalia Panekenan', 0, NULL),
('1219031', 'Jovan Marshall Umboh', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nim` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_wa` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` varchar(6) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vote`
--

CREATE TABLE `vote` (
  `voter_id` varchar(5) NOT NULL,
  `candidate_id` varchar(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `vote_candidate`
--

CREATE TABLE `vote_candidate` (
  `id` int(1) NOT NULL,
  `choose_number` varchar(2) NOT NULL,
  `name_pres` varchar(255) NOT NULL,
  `photo_pres` longblob NOT NULL,
  `name_vicepres` varchar(255) NOT NULL,
  `photo_vicepres` longblob NOT NULL,
  `vision` longtext,
  `mission` longtext,
  `motto_pres` longtext,
  `motto_vicepres` longtext,
  `status` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_auth_codes_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Indexes for table `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pre_users`
--
ALTER TABLE `pre_users`
  ADD PRIMARY KEY (`nim`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vote`
--
ALTER TABLE `vote`
  ADD PRIMARY KEY (`voter_id`);

--
-- Indexes for table `vote_candidate`
--
ALTER TABLE `vote_candidate`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vote_candidate`
--
ALTER TABLE `vote_candidate`
  MODIFY `id` int(1) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
