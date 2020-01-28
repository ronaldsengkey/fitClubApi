-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 28, 2020 at 04:07 AM
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
  `status` tinyint(4) NOT NULL,
  `joinDate` datetime NOT NULL DEFAULT current_timestamp(),
  `endDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coach`
--

INSERT INTO `coach` (`id`, `userId`, `status`, `joinDate`, `endDate`) VALUES
(1, 2, 1, '2019-12-20 10:03:18', '2020-01-20 00:00:00'),
(2, 4, 1, '2020-01-22 12:02:18', '2020-03-20 00:00:00');

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
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `userId`, `code`, `memberCat`, `joinDate`, `endDate`, `status`) VALUES
(1, 1, 'FCG001', 2, '2019-12-20 09:52:14', '2020-01-20', 1),
(2, 1, '519859', 1, '2020-01-20 08:41:48', '2020-02-19', 0),
(3, 1, '171279', 1, '2020-01-20 08:56:29', '2020-02-19', 0),
(4, 1, '812177', 1, '2020-01-20 08:58:01', '2020-02-19', 0),
(5, 1, '847151', 1, '2020-01-20 08:58:07', '2020-02-19', 0),
(6, 1, '718923', 1, '2020-01-20 08:58:11', '2020-02-19', 0),
(7, 1, '307714', 1, '2020-01-20 08:58:16', '2020-02-19', 0),
(8, 1, '789973', 1, '2020-01-20 08:58:21', '2020-02-19', 0),
(9, 1, '993150', 1, '2020-01-20 08:59:00', '2020-02-19', 0),
(10, 1, '984558', 1, '2020-01-20 09:03:49', '2020-02-19', 0),
(11, 1, '700671', 1, '2020-01-20 09:04:43', '2020-02-19', 0),
(12, 1, '371240', 2, '2020-01-20 09:15:18', '2020-02-19', 0),
(13, 1, '401393', 1, '2020-01-20 09:16:48', '2020-02-19', 0),
(14, 1, '339503', 1, '2020-01-20 09:17:11', '2020-02-19', 0),
(15, 1, '838997', 1, '2020-01-20 09:21:22', '2020-02-19', 0),
(16, 1, '293998', 1, '2020-01-20 09:22:17', '2020-02-19', 0),
(17, 1, '987878', 1, '2020-01-20 09:24:21', '2020-02-19', 0),
(18, 1, '245002', 1, '2020-01-20 09:25:16', '2020-02-19', 0),
(19, 1, '525669', 1, '2020-01-20 09:27:42', '2020-02-19', 0),
(20, 1, '272001', 1, '2020-01-20 09:29:01', '2020-02-19', 0),
(21, 1, '811933', 1, '2020-01-20 09:34:29', '2020-02-19', 0),
(22, 1, '199799', 1, '2020-01-20 09:40:31', '2020-02-19', 0),
(23, 1, '936968', 1, '2020-01-20 09:54:58', '2020-02-19', 0),
(24, 1, '914789', 1, '2020-01-20 09:55:02', '2020-02-19', 0),
(25, 1, '889042', 1, '2020-01-20 17:47:55', '2020-02-19', 0),
(26, 1, '210651', 1, '2020-01-20 17:58:10', '2020-02-19', 0),
(27, 1, '678452', 1, '2020-01-22 08:27:11', '2020-02-21', 0),
(28, 1, '823985', 1, '2020-01-22 08:36:03', '2020-02-21', 0),
(29, 1, '647544', 1, '2020-01-22 08:38:57', '2020-02-21', 0),
(30, 1, '474185', 1, '2020-01-22 08:40:55', '2020-02-21', 0),
(31, 1, '424350', 1, '2020-01-22 08:42:17', '2020-02-21', 0),
(32, 1, '542332', 1, '2020-01-22 08:46:32', '2020-02-21', 0),
(33, 1, '819841', 1, '2020-01-22 08:47:05', '2020-02-21', 0),
(34, 1, '701833', 1, '2020-01-22 08:48:03', '2020-02-21', 0),
(35, 1, '138655', 1, '2020-01-22 08:48:36', '2020-02-21', 0),
(36, 1, '596807', 1, '2020-01-22 08:49:49', '2020-02-21', 0),
(37, 1, '559118', 1, '2020-01-22 08:52:11', '2020-02-21', 0),
(38, 1, '386503', 1, '2020-01-22 08:55:21', '2020-02-21', 0),
(39, 1, '930839', 1, '2020-01-22 08:59:09', '2020-02-21', 0),
(40, 1, '169485', 100000, '2020-01-24 17:32:13', '2020-02-23', 0),
(41, 1, '479419', 100000, '2020-01-24 17:33:03', '2020-02-23', 0),
(42, 1, '319193', 50000, '2020-01-24 17:35:09', '2020-02-23', 0),
(43, 1, '272100', 100000, '2020-01-24 17:41:56', '2020-02-23', 0),
(44, 1, '251236', 100000, '2020-01-24 17:42:54', '2020-02-23', 0),
(45, 1, '142706', 100000, '2020-01-24 17:44:22', '2020-02-23', 0),
(46, 1, '366913', 50000, '2020-01-24 17:46:21', '2020-02-23', 0),
(47, 1, '698319', 100000, '2020-01-24 17:50:16', '2020-02-23', 0),
(48, 1, '437598', 50000, '2020-01-24 17:51:02', '2020-02-23', 0),
(49, 1, '484418', 50000, '2020-01-24 17:51:08', '2020-02-23', 0),
(50, 1, '616306', 50000, '2020-01-27 08:54:21', '2020-02-26', 0),
(51, 1, '612688', 100000, '2020-01-27 09:14:24', '2020-02-26', 0),
(52, 1, '261146', 100000, '2020-01-27 09:14:24', '2020-02-26', 0),
(53, 1, '468717', 100000, '2020-01-27 09:14:34', '2020-02-26', 0),
(54, 1, '834215', 100000, '2020-01-28 08:46:03', '2020-02-27', 0),
(55, 1, '787893', 100000, '2020-01-28 08:55:08', '2020-02-27', 0),
(56, 1, '424393', 50000, '2020-01-28 08:56:39', '2020-02-27', 0),
(57, 1, '439611', 100000, '2020-01-28 09:00:27', '2020-02-27', 0),
(58, 1, '583184', 100000, '2020-01-28 09:02:06', '2020-02-27', 0),
(59, 1, '965836', 100000, '2020-01-28 09:02:18', '2020-02-27', 0),
(60, 1, '922313', 100000, '2020-01-28 09:03:28', '2020-02-27', 0),
(61, 1, '341271', 100000, '2020-01-28 09:05:46', '2020-02-27', 0),
(62, 1, '273003', 100000, '2020-01-28 09:09:36', '2020-02-27', 0),
(63, 1, '250499', 100000, '2020-01-28 09:10:26', '2020-02-27', 0),
(64, 1, '894643', 100000, '2020-01-28 09:30:52', '2020-02-27', 0),
(65, 1, '912824', 100000, '2020-01-28 09:35:32', '2020-02-27', 0),
(66, 1, '433186', 100000, '2020-01-28 09:38:14', '2020-02-27', 0),
(67, 1, '312995', 100000, '2020-01-28 09:48:40', '2020-02-27', 0);

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

--
-- Dumping data for table `partner`
--

INSERT INTO `partner` (`id`, `userId`, `joinDate`, `status`) VALUES
(1, 3, '2020-01-22 03:41:34', 1);

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
  `requestCategory` char(30) NOT NULL
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
(58, 100051, 2, 0, 1, '', 1, NULL, 'transfer', 0, 'upgrade');

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
(1, 'agnetiuslee', 1, '085854333433', 'Jl. Panjang', 'agnetiuslee@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$EmeVP5GlwJQCWJ45zvc7sQ$PZfjjt0vrwZ+lYIbgi63/bNhfRYljMnZnx5XJ18klA8', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFnbmV0aXVzbGVlIiwiZ2VuZGVyIjoxLCJtZW1iZXJDYXQiOjIsIm1lbWJlcklkIjoxLCJwYXJ0bmVySWQiOm51bGwsImNvYWNoSWQiOm51bGwsImpvaW5NZW1iZXJEYXRlIjoiMjAxOS0xMi0yMFQwOTo1MjoxNC4wMDBaIiwiZW5kTWVtYmVyRGF0ZSI6IjIwMjAtMDEtMjBUMDA6MDA6MDAuMDAwWiIsInBob25lIjoiMDg1ODU0MzMzNDMzIiwiYWRkcmVzcyI6IkpsLiBQYW5qYW5nIiwiZW1haWwiOiJhZ25ldGl1c2xlZUBnbWFpbC5jb20iLCJpYXQiOjE1ODAxNzU4NTIsImV4cCI6MTU4MDE5Mzg1MiwiYXVkIjoiaHR0cDovL2ZpdGNsdWIuaWQiLCJpc3MiOiJGaXRDbHViIE5ldHdvcmsiLCJzdWIiOiJhZ25ldGl1c2xlZUBnbWFpbC5jb20ifQ.d2bRO4q5LFIpGcEpE1l8d9Tqz8pmtDjEsv_NYCp6VwGpmC966xLK8YYSRAFyHE69_AAgBrp_llqShvr1C9rlEQ', 'online', '531433', 0, '2019-12-21 15:29:11'),
(2, 'coach 1', 1, '7787878787', 'jl. Gulung kuming', 'coach1@mail.com', '7777777', '', '', 'online', '', 1, '2020-01-04 17:45:10'),
(3, 'Partner1', 1, '08388489384', 'Jl Gunung rinjani 6 lippo karawachi tangerang', 'partner@mail.com', '$argon2i$v=19$m=4096,t=3,p=1$0XpkB66j35TemMT8iweQqA$W/UFp6/P6ICMZpqHwv56gR2RtGz2JKnjoWcTig8Rb/8', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IlBhcnRuZXIxIiwiZ2VuZGVyIjoxLCJtZW1iZXJDYXQiOm51bGwsIm1lbWJlcklkIjpudWxsLCJwYXJ0bmVySWQiOjEsImpvaW5NZW1iZXJEYXRlIjpudWxsLCJlbmRNZW1iZXJEYXRlIjpudWxsLCJwaG9uZSI6IjA4Mzg4NDg5Mzg0IiwiYWRkcmVzcyI6IkpsIEd1bnVuZyByaW5qYW5pIDYgbGlwcG8ga2FyYXdhY2hpIHRhbmdlcmFuZyIsImVtYWlsIjoicGFydG5lckBtYWlsLmNvbSIsImlhdCI6MTU3OTY2NjYwNywiZXhwIjoxNTc5Njg0NjA3LCJhdWQiOiJodHRwOi8vZml0Y2x1Yi5pZCIsImlzcyI6IkZpdENsdWIgTmV0d29yayIsInN1YiI6ImFnbmV0aXVzbGVlQGdtYWlsLmNvbSJ9.J78oCZjc3KS9rUVS4jv9-9yEfvxuSeAPyafDoWuYgp4fYUGb8nvfPsUEdxAooNP_4mwBp8TPv0E2lmcNkLpUYQ', 'online', '209824', 1, '2020-01-22 10:41:34'),
(4, 'coach 2', 1, '07777777777', 'Jl Gunung Kembar 2', 'coach2@mail.com', '$argon2i$v=19$m=4096,t=3,p=1$0XpkB66j35TemMT8iweQqA$W/UFp6/P6ICMZpqHwv56gR2RtGz2JKnjoWcTig8Rb/8', '', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImNvYWNoIDIiLCJnZW5kZXIiOjEsIm1lbWJlckNhdCI6bnVsbCwibWVtYmVySWQiOm51bGwsInBhcnRuZXJJZCI6bnVsbCwiY29hY2hJZCI6Miwiam9pbk1lbWJlckRhdGUiOm51bGwsImVuZE1lbWJlckRhdGUiOm51bGwsInBob25lIjoiMDc3Nzc3Nzc3NzciLCJhZGRyZXNzIjoiSmwgR3VudW5nIEtlbWJhciAyIiwiZW1haWwiOiJjb2FjaDJAbWFpbC5jb20iLCJpYXQiOjE1Nzk4MzIzODIsImV4cCI6MTU3OTg1MDM4MiwiYXVkIjoiaHR0cDovL2ZpdGNsdWIuaWQiLCJpc3MiOiJGaXRDbHViIE5ldHdvcmsiLCJzdWIiOiJhZ25ldGl1c2xlZUBnbWFpbC5jb20ifQ.SVGQzRF1vl7bSrlEYxDRVpeV0BwtYITg0a-6hcuLSJJqeQsGJdvG4BXQUfdpVgECMjneUGMpPo3_2dFPkUAcvQ', '1', '111111', 1, '2020-01-22 12:01:34');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
