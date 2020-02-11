-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 07, 2020 at 12:47 PM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fitclub`
--

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `code` varchar(10) DEFAULT NULL,
  `billNumber` varchar(50) DEFAULT NULL,
  `billName` text DEFAULT NULL,
  `branch` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `bank`
--

INSERT INTO `bank` (`id`, `name`, `code`, `billNumber`, `billName`, `branch`) VALUES
(1, 'BCA', '014', '2715486934', 'Budi Santoso', 'Raya Darmo'),
(2, 'Mandiri', '008', '5749638543', 'Alan Kusuma', 'Tenggilis');

-- --------------------------------------------------------

--
-- Table structure for table `classlist`
--

CREATE TABLE `classlist` (
  `id` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `descript` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classlist`
--

INSERT INTO `classlist` (`id`, `name`, `descript`) VALUES
(1, 'Cardio', 'merupakan kegiatan olah tubuh yang bertujuan memperkuat jantung dan paru-paru'),
(2, 'Yoga', 'aktivitas olah tubuh dan pikiran yang fokus pada kekuatan, fleksibilitas dan pernapasan untuk meningkatkan kualitas mental dan fisik');

-- --------------------------------------------------------

--
-- Table structure for table `classmember`
--

CREATE TABLE `classmember` (
  `id` int(11) NOT NULL,
  `membercat` int(11) NOT NULL,
  `classId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classmember`
--

INSERT INTO `classmember` (`id`, `membercat`, `classId`) VALUES
(1, 2, 1),
(2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `classschedule`
--

CREATE TABLE `classschedule` (
  `id` int(11) NOT NULL,
  `class` int(11) NOT NULL,
  `coach` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `placeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classschedule`
--

INSERT INTO `classschedule` (`id`, `class`, `coach`, `startTime`, `endTime`, `startDate`, `endDate`, `placeId`) VALUES
(1, 1, 1, '10:00:00', '12:00:00', '2019-12-23', '2019-12-23', 1),
(2, 2, 2, '09:00:00', '12:00:00', '2020-01-22', '2020-01-22', 1);

-- --------------------------------------------------------

--
-- Table structure for table `coach`
--

CREATE TABLE `coach` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `placeId` int(11) NOT NULL,
  `specialization` text NOT NULL,
  `status` tinyint(4) NOT NULL,
  `joinDate` datetime NOT NULL DEFAULT current_timestamp(),
  `endDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coach`
--

INSERT INTO `coach` (`id`, `userId`, `placeId`, `specialization`, `status`, `joinDate`, `endDate`) VALUES
(1, 1, 1, '1,2', 0, '2020-02-05 10:32:01', '0000-00-00 00:00:00'),
(2, 2, 1, '1,2', 0, '2020-02-06 09:25:11', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `coachactivity`
--

CREATE TABLE `coachactivity` (
  `id` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `dateTrain` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `file` int(11) DEFAULT NULL,
  `category` enum('profile','payment','others') DEFAULT NULL,
  `ownerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `member`
--

CREATE TABLE `member` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `code` text NOT NULL,
  `memberCat` int(11) NOT NULL,
  `joinDate` datetime NOT NULL DEFAULT current_timestamp(),
  `endDate` date NOT NULL,
  `placeId` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `memberactivity`
--

CREATE TABLE `memberactivity` (
  `id` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `action` char(20) NOT NULL,
  `memberId` int(11) NOT NULL,
  `dateRecord` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memberactivity`
--

INSERT INTO `memberactivity` (`id`, `scheduleId`, `action`, `memberId`, `dateRecord`) VALUES
(1, 1, 'joined', 1, '2020-01-04 17:29:49'),
(2, 1, 'join', 1, '2020-01-20 08:41:04'),
(3, 1, 'join', 1, '2020-01-20 08:41:16'),
(4, 1, 'join', 1, '2020-01-20 08:41:23'),
(5, 1, 'join', 1, '2020-01-22 08:26:52');

-- --------------------------------------------------------

--
-- Table structure for table `membercategory`
--

CREATE TABLE `membercategory` (
  `id` int(11) NOT NULL,
  `categoryName` char(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `membercategory`
--

INSERT INTO `membercategory` (`id`, `categoryName`) VALUES
(1, 'Silver'),
(2, 'Gold');

-- --------------------------------------------------------

--
-- Table structure for table `memberfee`
--

CREATE TABLE `memberfee` (
  `id` int(11) NOT NULL,
  `membercat` int(11) NOT NULL,
  `fee` int(11) NOT NULL,
  `timePeriode` int(11) NOT NULL,
  `placeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memberfee`
--

INSERT INTO `memberfee` (`id`, `membercat`, `fee`, `timePeriode`, `placeId`) VALUES
(1, 1, 50000, 30, 1),
(2, 2, 100000, 30, 1);

-- --------------------------------------------------------

--
-- Table structure for table `memberpayment`
--

CREATE TABLE `memberpayment` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `nominal` bigint(20) DEFAULT NULL,
  `memberCat` int(11) DEFAULT NULL,
  `createdDate` bigint(20) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `bankId` int(11) DEFAULT NULL,
  `paymentVia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `joinDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `personalrecord`
--

CREATE TABLE `personalrecord` (
  `id` int(11) NOT NULL,
  `memberId` int(11) NOT NULL,
  `prCat` int(11) NOT NULL,
  `value` float NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personalrecord`
--

INSERT INTO `personalrecord` (`id`, `memberId`, `prCat`, `value`, `date`) VALUES
(1, 1, 1, 123, '2020-01-07 17:06:16'),
(2, 1, 2, 125, '2020-01-08 09:00:17'),
(3, 1, 2, 122, '2020-01-08 09:01:13'),
(4, 1, 1, 222, '2020-01-08 09:01:19'),
(5, 1, 1, 22, '2020-01-08 09:04:03'),
(6, 1, 1, 22, '2020-01-08 09:05:26');

-- --------------------------------------------------------

--
-- Table structure for table `personalrecordcategory`
--

CREATE TABLE `personalrecordcategory` (
  `id` int(11) NOT NULL,
  `categoryName` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `personalrecordcategory`
--

INSERT INTO `personalrecordcategory` (`id`, `categoryName`) VALUES
(1, 'Fat level'),
(2, 'Blood preasure');

-- --------------------------------------------------------

--
-- Table structure for table `place`
--

CREATE TABLE `place` (
  `id` int(11) NOT NULL,
  `name` varchar(155) NOT NULL,
  `location` varchar(255) NOT NULL,
  `partnerId` int(11) NOT NULL,
  `joinDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `place`
--

INSERT INTO `place` (`id`, `name`, `location`, `partnerId`, `joinDate`) VALUES
(1, 'Golld gym wiyung', 'Jl Wiyung Babatan Pratama no 100 - 105', 1, '2020-01-22 11:19:36');

-- --------------------------------------------------------

--
-- Table structure for table `temppayment`
--

CREATE TABLE `temppayment` (
  `id` int(11) NOT NULL,
  `nominal` int(50) NOT NULL,
  `memberCat` int(10) NOT NULL,
  `status` int(10) NOT NULL,
  `placeId` int(10) NOT NULL,
  `description` text NOT NULL,
  `userId` int(10) DEFAULT NULL,
  `memberId` int(10) DEFAULT NULL,
  `paymentVia` varchar(50) NOT NULL,
  `bankId` int(10) NOT NULL,
  `requestCategory` enum('upgrade','join','rejoin') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `temppayment`
--

INSERT INTO `temppayment` (`id`, `nominal`, `memberCat`, `status`, `placeId`, `description`, `userId`, `memberId`, `paymentVia`, `bankId`, `requestCategory`) VALUES
(1, 100006, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(2, 100096, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(3, 100024, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(4, 100092, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(5, 100040, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(6, 100004, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(7, 100025, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(8, 100082, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(9, 100080, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(10, 50039, 1, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(11, 50044, 1, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(12, 50068, 1, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(13, 50088, 1, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(14, 50081, 1, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(15, 50046, 1, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(16, 100093, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(17, 100005, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(18, 100019, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(19, 100066, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(20, 100078, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(21, 100048, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(22, 100012, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(23, 100057, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(24, 100033, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(25, 100077, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(26, 100001, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(27, 100012, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(28, 100012, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(29, 100003, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(30, 100039, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(31, 100081, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(32, 100077, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(33, 100004, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(34, 100002, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(35, 100040, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(36, 100015, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(37, 100075, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(38, 100047, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(39, 100034, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(40, 100054, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(41, 100034, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(42, 100046, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(43, 100039, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(44, 100081, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(45, 100055, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(46, 100078, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(47, 100044, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(48, 100058, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(49, 100007, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(50, 100040, 2, 0, 1, '', 1, NULL, 'cash', 0, 'upgrade'),
(51, 100000, 2, 0, 1, '', 1, NULL, 'cash', 0, 'upgrade'),
(52, 100035, 2, 0, 1, '', 1, NULL, 'cash', 0, 'upgrade'),
(53, 100049, 2, 0, 1, '', 1, NULL, 'cash', 0, 'upgrade'),
(54, 100025, 2, 0, 1, '', 1, NULL, 'cash', 0, 'upgrade'),
(55, 100000, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(56, 100038, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(57, 100074, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(58, 100051, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(59, 100024, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(60, 100090, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(61, 100097, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(62, 100001, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade'),
(63, 100073, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(64, 100062, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(65, 100029, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(66, 100076, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(67, 100011, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(68, 100094, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(69, 100090, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(70, 100003, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(71, 100033, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(72, 100073, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(73, 100080, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(74, 100006, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(75, 100068, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(76, 100045, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(77, 100096, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(78, 100047, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(79, 100099, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(80, 100075, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(75) NOT NULL,
  `gender` tinyint(4) NOT NULL,
  `phone` text NOT NULL,
  `address` text NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` text NOT NULL,
  `imgProfile` longtext NOT NULL,
  `accessToken` text NOT NULL,
  `onlineStatus` text NOT NULL,
  `verificationCode` text NOT NULL,
  `accountStatus` tinyint(4) NOT NULL,
  `registerDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `gender`, `phone`, `address`, `email`, `password`, `imgProfile`, `accessToken`, `onlineStatus`, `verificationCode`, `accountStatus`, `registerDate`) VALUES
(1, 'Coach1', 1, '08388489384', 'Jl Gunung rinjani 6 lippo karawachi tangerang', 'coach1@mail.com', '$argon2i$v=19$m=4096,t=3,p=1$wKKjA/Lxf/Mjp0nY6E+WKQ$3I7ZbedhavP9z1b0tOnxVaqO/sEq4+GjveWx3AhydAo', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQ29hY2gxIiwiZ2VuZGVyIjoxLCJwaG9uZSI6IjA4Mzg4NDg5Mzg0IiwiYWRkcmVzcyI6IkpsIEd1bnVuZyByaW5qYW5pIDYgbGlwcG8ga2FyYXdhY2hpIHRhbmdlcmFuZyIsImVtYWlsIjoiY29hY2gxQG1haWwuY29tIiwicGFzc3dvcmQiOiIkYXJnb24yaSR2PTE5JG09NDA5Nix0PTMscD0xJHdLS2pBL0x4Zi9NanAwblk2RStXS1EkM0k3WmJlZGhhdlA5ejFiMHRPbnhWYXFPL3NFcTQrR2p2ZVd4M0FoeWRBbyIsImZpbHRlciI6ImNvYWNoIiwicGxhY2VJZCI6IjEiLCJzcGVjaWFsaXphdGlvbiI6WzEsMl0sInZlcmlmaWNhdGlvbkNvZGUiOjQ4ODQ5NSwiaWF0IjoxNTgwODczNTIxLCJleHAiOjE1ODA4OTE1MjEsImF1ZCI6Imh0dHA6Ly9maXRjbHViLmlkIiwiaXNzIjoiRml0Q2x1YiBOZXR3b3JrIiwic3ViIjoiYWduZXRpdXNsZWVAZ21haWwuY29tIn0.MVWTAX_fjW_u1_qViO-P5LQzL-Hk39nmnK1q0LVSFbY8TYr7oKMonvJceSoQSKE_IUxnnG1xqiskdcToIsfI9w', 'online', '488495', 0, '2020-02-05 10:32:01'),
(2, 'ronald', 1, '085791334512', 'jalan ronald', 'ronald@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$3ieABvp/13XQGZmYTQSyoA$P4E4lZpg7G99Q9VW7CVQyE94NUvV78QZnohtrPeOrFI', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InJvbmFsZCIsImdlbmRlciI6MSwibWVtYmVyQ2F0IjpudWxsLCJtZW1iZXJJZCI6bnVsbCwicGFydG5lcklkIjpudWxsLCJjb2FjaElkIjoyLCJqb2luTWVtYmVyRGF0ZSI6bnVsbCwiZW5kTWVtYmVyRGF0ZSI6bnVsbCwicGhvbmUiOiIwODU3OTEzMzQ1MTIiLCJhZGRyZXNzIjoiamFsYW4gcm9uYWxkIiwiZW1haWwiOiJyb25hbGRAZ21haWwuY29tIiwiaWF0IjoxNTgwOTU2MDU0LCJleHAiOjE1ODA5NzQwNTQsImF1ZCI6Imh0dHA6Ly9maXRjbHViLmlkIiwiaXNzIjoiRml0Q2x1YiBOZXR3b3JrIiwic3ViIjoiYWduZXRpdXNsZWVAZ21haWwuY29tIn0.TX3s-QC62qH2qM3kHGMkevQ223-o0d63gBA-Jq4ZWkp_8OhJ7yGqzeApVOyGaYAtGHh07-IZEt8CqwWEGz1UEg', 'online', '537651', 1, '2020-02-06 09:25:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classlist`
--
ALTER TABLE `classlist`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classmember`
--
ALTER TABLE `classmember`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `classschedule`
--
ALTER TABLE `classschedule`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coach`
--
ALTER TABLE `coach`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coachactivity`
--
ALTER TABLE `coachactivity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `file`
--
ALTER TABLE `file`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `memberactivity`
--
ALTER TABLE `memberactivity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `membercategory`
--
ALTER TABLE `membercategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `memberfee`
--
ALTER TABLE `memberfee`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `memberpayment`
--
ALTER TABLE `memberpayment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personalrecord`
--
ALTER TABLE `personalrecord`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personalrecordcategory`
--
ALTER TABLE `personalrecordcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `place`
--
ALTER TABLE `place`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `temppayment`
--
ALTER TABLE `temppayment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classlist`
--
ALTER TABLE `classlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classmember`
--
ALTER TABLE `classmember`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classschedule`
--
ALTER TABLE `classschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coach`
--
ALTER TABLE `coach`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coachactivity`
--
ALTER TABLE `coachactivity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `memberactivity`
--
ALTER TABLE `memberactivity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `membercategory`
--
ALTER TABLE `membercategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `memberfee`
--
ALTER TABLE `memberfee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `memberpayment`
--
ALTER TABLE `memberpayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personalrecord`
--
ALTER TABLE `personalrecord`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personalrecordcategory`
--
ALTER TABLE `personalrecordcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `place`
--
ALTER TABLE `place`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `temppayment`
--
ALTER TABLE `temppayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=81;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
