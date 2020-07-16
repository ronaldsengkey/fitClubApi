-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 16, 2020 at 12:51 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.10

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
(2, 'Yoga', 'aktivitas olah tubuh dan pikiran yang fokus pada kekuatan, fleksibilitas dan pernapasan untuk meningkatkan kualitas mental dan fisik'),
(5, 'combat', 'combat'),
(6, 'zumba', 'zumbaa');

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
  `placeId` int(11) DEFAULT NULL,
  `maxPerson` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `classschedule`
--

INSERT INTO `classschedule` (`id`, `class`, `coach`, `startTime`, `endTime`, `startDate`, `endDate`, `placeId`, `maxPerson`) VALUES
(1, 1, 1, '10:00:00', '12:00:00', '2020-06-30', '2020-06-30', 1, 0),
(2, 2, 2, '09:00:00', '12:00:00', '2020-01-22', '2020-01-22', 1, 2),
(3, 1, 1, '13:00:00', '14:00:00', '2020-03-18', '2020-03-18', 1, 0),
(4, 1, 1, '04:30:00', '05:00:00', '2014-02-02', '2014-02-02', 1, 0),
(5, 1, 1, '05:00:00', '05:30:00', '2014-02-02', '2015-02-02', 1, 0),
(6, 1, 1, '05:00:00', '05:30:00', '2014-02-02', '2015-02-02', 1, 0),
(7, 2, 1, '08:00:00', '08:30:00', '2014-02-02', '2015-02-02', 1, 0),
(8, 2, 2, '05:00:00', '05:30:00', '2014-02-02', '2015-02-02', 2, 0),
(9, 1, 2, '09:30:00', '05:30:00', '2014-02-02', '2015-02-02', 2, 0),
(10, 2, 1, '06:00:00', '06:30:00', '2222-02-02', '2222-02-02', 1, 0),
(11, 2, 1, '01:00:00', '02:00:00', '2222-02-02', '2222-02-02', 1, 0),
(12, 2, 1, '05:00:00', '07:30:00', '2222-11-22', '2222-11-12', 1, 0),
(13, 2, 1, '17:30:00', '18:30:00', '2222-02-22', '2222-02-22', 1, 0),
(14, 1, 1, '09:00:00', '09:30:00', '2008-08-08', '2008-09-09', 1, 0),
(15, 1, 1, '00:00:09', '00:00:10', '2020-07-07', '2020-07-07', 1, 0),
(16, 1, 1, '00:00:00', '00:00:00', '2020-07-07', '2020-07-07', 1, 0),
(17, 2, 1, '14:00:00', '16:00:00', '2020-07-07', '2020-07-07', 1, 0),
(18, 2, 1, '13:00:00', '14:00:00', '2020-07-11', '2020-07-11', 1, 0),
(19, 2, 1, '14:00:00', '15:00:00', '2020-07-16', '2020-07-16', 1, 1);

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
  `scheduleId` int(11) NOT NULL,
  `coachId` int(11) NOT NULL,
  `action` enum('started','finished','','') NOT NULL,
  `dateTrain` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coachactivity`
--

INSERT INTO `coachactivity` (`id`, `scheduleId`, `coachId`, `action`, `dateTrain`) VALUES
(1, 1, 1, 'finished', '2019-12-23 00:00:00'),
(2, 14, 1, 'started', '2020-07-06 14:34:12'),
(3, 14, 1, 'finished', '2020-07-06 16:38:45'),
(4, 15, 1, 'started', '2020-07-06 16:39:11');

-- --------------------------------------------------------

--
-- Table structure for table `file`
--

CREATE TABLE `file` (
  `id` int(11) NOT NULL,
  `file` text DEFAULT NULL,
  `category` enum('profile','payment','others') DEFAULT NULL,
  `transactionId` int(11) NOT NULL,
  `ownerId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `file`
--

INSERT INTO `file` (`id`, `file`, `category`, `transactionId`, `ownerId`) VALUES
(1, 'data:image/png;base64,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', 'payment', 99, 22),
(2, 'data:image/png;base64,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', 'payment', 100, 22),
(3, 'data:image/png;base64,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', 'payment', 102, 21);

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

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `userId`, `code`, `memberCat`, `joinDate`, `endDate`, `placeId`, `status`) VALUES
(1, 3, '240929', 2, '2020-02-18 09:05:34', '2020-03-19', 0, 1),
(10, 22, '604207', 1, '2020-07-15 12:48:37', '2020-08-14', 0, 1),
(13, 21, '604208', 1, '2020-07-16 10:50:57', '2020-07-16', 1, 1);

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
(5, 1, 'join', 1, '2020-01-22 08:26:52'),
(6, 1, 'join', 1, '2020-03-18 08:46:39'),
(7, 2, 'join', 1, '2020-03-20 08:42:26'),
(8, 2, 'join', 1, '2020-07-15 15:34:09'),
(9, 2, 'join', 10, '2020-07-15 15:58:41'),
(10, 2, 'join', 1, '2020-07-15 16:00:17'),
(11, 2, 'join', 1, '2020-07-15 16:00:41'),
(12, 2, 'join', 1, '2020-07-15 16:06:41'),
(13, 2, 'join', 1, '2020-07-15 16:06:52'),
(14, 2, 'join', 1, '2020-07-15 16:06:59'),
(15, 2, 'join', 1, '2020-07-15 16:08:18'),
(16, 2, 'join', 10, '2020-07-15 16:14:10'),
(17, 19, 'join', 10, '2020-07-15 16:34:54'),
(18, 19, 'join', 1, '2020-07-15 16:35:50'),
(19, 19, 'join', 1, '2020-07-15 16:37:38');

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
  `createdAt` timestamp NULL DEFAULT current_timestamp(),
  `bankId` int(11) DEFAULT NULL,
  `paymentVia` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memberpayment`
--

INSERT INTO `memberpayment` (`id`, `userId`, `nominal`, `memberCat`, `createdDate`, `createdAt`, `bankId`, `paymentVia`) VALUES
(1, 21, 10075, 1, NULL, '2020-07-16 10:50:05', 1, 'transfer');

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
(1, 4, '2020-06-25 02:07:11', 1);

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
(6, 1, 1, 22, '2020-01-08 09:05:26'),
(7, 3, 1, 333, '2020-03-20 08:45:08'),
(8, 1, 2, 108, '2020-07-07 13:27:45');

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
-- Table structure for table `switchschedulerequest`
--

CREATE TABLE `switchschedulerequest` (
  `id` int(11) NOT NULL,
  `fromCoachId` int(11) NOT NULL,
  `toCoachId` int(11) NOT NULL,
  `fromScheduleId` int(11) NOT NULL,
  `toScheduleId` int(11) NOT NULL,
  `requestDate` date NOT NULL,
  `confirmDate` date NOT NULL,
  `status` enum('yes','no') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `switchschedulerequest`
--

INSERT INTO `switchschedulerequest` (`id`, `fromCoachId`, `toCoachId`, `fromScheduleId`, `toScheduleId`, `requestDate`, `confirmDate`, `status`) VALUES
(1, 1, 2, 3, 2, '2020-05-21', '0000-00-00', 'yes'),
(2, 2, 1, 2, 1, '2020-05-21', '0000-00-00', 'yes'),
(3, 1, 2, 1, 2, '2020-05-21', '0000-00-00', 'yes'),
(4, 1, 1, 6, 4, '2020-05-21', '0000-00-00', 'yes');

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
(80, 100075, 2, 0, 1, '', 1, NULL, 'transfer', 1, 'upgrade'),
(81, 50022, 1, 0, 1, '', 3, NULL, 'transfer', 1, 'join'),
(82, 50092, 1, 0, 1, '', 3, NULL, 'transfer', 1, 'join'),
(83, 50004, 1, 0, 1, '', 3, NULL, 'transfer', 1, 'join'),
(84, 50007, 1, 0, 1, '', 3, NULL, 'transfer', 1, 'join'),
(85, 50047, 1, 0, 1, '', 3, NULL, 'transfer', 1, 'join'),
(86, 50040, 1, 0, 1, '', 3, NULL, 'transfer', 1, 'join'),
(98, 50015, 1, 0, 1, '', 22, NULL, 'transfer', 0, 'join'),
(99, 50022, 1, 0, 1, '', 22, NULL, 'transfer', 0, 'join'),
(100, 50063, 1, 0, 1, '', 22, NULL, 'transfer', 0, 'join'),
(101, 100074, 2, 0, 1, '', 22, NULL, 'transfer', 0, 'upgrade'),
(102, 10075, 1, 1, 1, 'Bayar join member', 21, NULL, 'transfer', 1, 'join');

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
(1, 'Coach1', 1, '08388489384', 'Jl Gunung rinjani 6 lippo karawachi tangerang', 'coach1@mail.com', '$argon2i$v=19$m=4096,t=3,p=1$wKKjA/Lxf/Mjp0nY6E+WKQ$3I7ZbedhavP9z1b0tOnxVaqO/sEq4+GjveWx3AhydAo', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkNvYWNoMSIsImdlbmRlciI6MSwiY29hY2hJZCI6MSwic3BlY2lhbGl6YXRpb24iOiIxLDIiLCJwaG9uZSI6IjA4Mzg4NDg5Mzg0IiwiYWRkcmVzcyI6IkpsIEd1bnVuZyByaW5qYW5pIDYgbGlwcG8ga2FyYXdhY2hpIHRhbmdlcmFuZyIsImVtYWlsIjoiY29hY2gxQG1haWwuY29tIiwiaWF0IjoxNTk0ODAwNzIwLCJleHAiOjE1OTQ4MTg3MjAsImF1ZCI6Imh0dHA6Ly9maXRjbHViLmlkIiwiaXNzIjoiRml0Q2x1YiBOZXR3b3JrIiwic3ViIjoiYWduZXRpdXNsZWVAZ21haWwuY29tIn0.Gcs7mK-y7SNjrd6O3e1K290AlZWxEwiJVsMktIhKCx0BbengnbT8eTeyX3TUyVkieNuvAkSQQooLzhYA9Ukdlg', 'online', '488495', 0, '2020-02-05 10:32:01'),
(2, 'ronald', 1, '085791334512', 'jalan ronald', 'ronald@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$3ieABvp/13XQGZmYTQSyoA$P4E4lZpg7G99Q9VW7CVQyE94NUvV78QZnohtrPeOrFI', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InJvbmFsZCIsImdlbmRlciI6MSwibWVtYmVyQ2F0IjpudWxsLCJtZW1iZXJJZCI6bnVsbCwicGFydG5lcklkIjpudWxsLCJjb2FjaElkIjoyLCJzcGVjaWFsaXphdGlvbiI6IjEsMiIsImpvaW5NZW1iZXJEYXRlIjpudWxsLCJlbmRNZW1iZXJEYXRlIjpudWxsLCJwaG9uZSI6IjA4NTc5MTMzNDUxMiIsImFkZHJlc3MiOiJqYWxhbiByb25hbGQiLCJlbWFpbCI6InJvbmFsZEBnbWFpbC5jb20iLCJpYXQiOjE1OTM2ODU0MDYsImV4cCI6MTU5MzcwMzQwNiwiYXVkIjoiaHR0cDovL2ZpdGNsdWIuaWQiLCJpc3MiOiJGaXRDbHViIE5ldHdvcmsiLCJzdWIiOiJhZ25ldGl1c2xlZUBnbWFpbC5jb20ifQ.CgWhGeJScILXOUg_wvY16N-iWHwn4OKouDKi4i91GgzlBGJfGxFk0uKWSgkkcv23akchGpcuW_2Xil_mAidk8w', 'online', '537651', 1, '2020-02-06 09:25:11'),
(3, 'Anton', 1, '085797478712', 'jl member', 'dbudianto9@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$QKL5KgkFYobsolZMzsCSPw$UWk+wYYwNOA0QbPy1ABDMcGzfPJ3l+XwBPElF/y89ig', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IkFudG9uIiwiZ2VuZGVyIjoxLCJtZW1iZXJDYXQiOjIsIm1lbWJlcklkIjoxLCJwbGFjZUlkIjowLCJqb2luTWVtYmVyRGF0ZSI6IjIwMjAtMDItMThUMDk6MDU6MzQuMDAwWiIsImVuZE1lbWJlckRhdGUiOiIyMDIwLTAzLTE5VDAwOjAwOjAwLjAwMFoiLCJwaG9uZSI6IjA4NTc5NzQ3ODcxMiIsImFkZHJlc3MiOiJqbCBtZW1iZXIiLCJlbWFpbCI6ImRidWRpYW50bzlAZ21haWwuY29tIiwiaWF0IjoxNTk0ODA1NzQxLCJleHAiOjE1OTQ4MjM3NDEsImF1ZCI6Imh0dHA6Ly9maXRjbHViLmlkIiwiaXNzIjoiRml0Q2x1YiBOZXR3b3JrIiwic3ViIjoiYWduZXRpdXNsZWVAZ21haWwuY29tIn0.N-bnpfXzQ9z0x8LrFUdDfau2kK5Rvyshxh0G2-Q57klSowwSdlIbMVq1hp_USDh8VVOOxoZSch9vzGv98dqcEw', 'online', '654638', 1, '2020-02-14 09:27:14'),
(4, 'rekan', 1, '08123456789', 'alamat rekan', 'dickybudianto+rekan@usahakreatif.co.id', '$argon2i$v=19$m=4096,t=3,p=1$QNjQo/hln3HZV/Te7GZcww$KxbDgbdiEBXwi99s5NQFbpk1pXgaLnmptb+FiQlwqCQ', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6InJla2FuIiwiZ2VuZGVyIjoxLCJwYXJ0bmVySWQiOjEsInBob25lIjoiMDgxMjM0NTY3ODkiLCJhZGRyZXNzIjoiYWxhbWF0IHJla2FuIiwiZW1haWwiOiJkaWNreWJ1ZGlhbnRvK3Jla2FuQHVzYWhha3JlYXRpZi5jby5pZCIsImlhdCI6MTU5NDg5NTA4OCwiZXhwIjoxNTk0OTEzMDg4LCJhdWQiOiJodHRwOi8vZml0Y2x1Yi5pZCIsImlzcyI6IkZpdENsdWIgTmV0d29yayIsInN1YiI6ImFnbmV0aXVzbGVlQGdtYWlsLmNvbSJ9.A1WjM_fB564w2J3kQTPBcfeLsGdlajgXUSaC_XuNrzGA4JhRscbjDECjp3Ou4cC66xhag18ytfCcKOyV6w2MMA', 'online', '486976', 0, '2020-06-26 08:44:56'),
(17, 'member2', 1, '085712231234', 'member', 'member2@mail.idids', '$argon2i$v=19$m=4096,t=3,p=1$YQbBOctg/pKyewncFD5aDA$4gOfDNzoX7R1EI6jyEEcfUSQyqyYomR1m7bj0w/VJU0', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWx0ZXIiOiJtZW1iZXJSZWdpc3RlciIsIm5hbWUiOiJtZW1iZXIyIiwiYWRkcmVzcyI6Im1lbWJlciIsInBob25lIjoiMDg1NzEyMjMxMjM0IiwiZ2VuZGVyIjoxLCJlbWFpbCI6Im1lbWJlcjJAbWFpbC5pZGlkcyIsInBhc3N3b3JkIjoiJGFyZ29uMmkkdj0xOSRtPTQwOTYsdD0zLHA9MSRZUWJCT2N0Zy9wS3lld25jRkQ1YURBJDRnT2ZETnpvWDdSMUVJNmp5RUVjZlVTUXlxeVlvbVIxbTdiajB3L1ZKVTAiLCJ2ZXJpZmljYXRpb25Db2RlIjo1ODA3NDEsImlhdCI6MTU5NDY5OTIwNywiZXhwIjoxNTk0NzE3MjA3LCJhdWQiOiJodHRwOi8vZml0Y2x1Yi5pZCIsImlzcyI6IkZpdENsdWIgTmV0d29yayIsInN1YiI6ImFnbmV0aXVzbGVlQGdtYWlsLmNvbSJ9.SJhw7nHB17aUH_vqTULkUKjCSD56j8ym6m7WlO8xNeVyjGwDIyGtEhSzi1apo08xqI0LAV9n2cOTt_kDZTL8Hw', 'online', '580741', 0, '2020-07-14 11:00:07'),
(18, 'member2', 1, '085791349111', 'member2', 'member@gemail.com', '$argon2i$v=19$m=4096,t=3,p=1$R3I9slRHwyTfL1tYFHA2cg$fu+TXAjH3r/BQRXfLbC0OweLoi47DhFKwVXP/cwlxkM', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsIm5hbWUiOiJtZW1iZXIyIiwiZ2VuZGVyIjoxLCJwaG9uZSI6IjA4NTc5MTM0OTExMSIsImFkZHJlc3MiOiJtZW1iZXIyIiwiZW1haWwiOiJtZW1iZXJAZ2VtYWlsLmNvbSIsImlhdCI6MTU5NDcwMzQ4NCwiZXhwIjoxNTk0NzIxNDg0LCJhdWQiOiJodHRwOi8vZml0Y2x1Yi5pZCIsImlzcyI6IkZpdENsdWIgTmV0d29yayIsInN1YiI6ImFnbmV0aXVzbGVlQGdtYWlsLmNvbSJ9.HdhjXVfC0VlA7GfSZ7InH5kpwjMEuwW7b6CGLC0j-zo4k_Ypj0nrUKzImM7qRt_jGKXaenU10ZzkvGcUt_rsdw', 'online', '172763', 0, '2020-07-14 11:00:58'),
(19, 'coba', 1, '085791341111', 'coba', 'coba@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$MtCg+SyM7+YY3mMAN+as3g$qVQtznBkKmsj8N+NS2HfrSAji8d6Hm3rov1l1x1fZdQ', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWx0ZXIiOiJtZW1iZXJSZWdpc3RlciIsIm5hbWUiOiJjb2JhIiwiYWRkcmVzcyI6ImNvYmEiLCJwaG9uZSI6IjA4NTc5MTM0MTExMSIsImdlbmRlciI6MSwiZW1haWwiOiJjb2JhQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJGFyZ29uMmkkdj0xOSRtPTQwOTYsdD0zLHA9MSRNdENnK1N5TTcrWVkzbU1BTithczNnJHFWUXR6bkJrS21zajhOK05TMkhmclNBamk4ZDZIbTNyb3YxbDF4MWZaZFEiLCJ2ZXJpZmljYXRpb25Db2RlIjoxMDgxOTUsImlhdCI6MTU5NDcwMzE0MCwiZXhwIjoxNTk0NzIxMTQwLCJhdWQiOiJodHRwOi8vZml0Y2x1Yi5pZCIsImlzcyI6IkZpdENsdWIgTmV0d29yayIsInN1YiI6ImFnbmV0aXVzbGVlQGdtYWlsLmNvbSJ9.Prd18jnSsEzNKZRCs20CyS2zL9pQtnjOz0TIWtPbkaHmDxanIHEqzCkc7HqyvFF0pPQXlG_vzs1Iaty-fbvijQ', 'online', '108195', 1, '2020-07-14 12:05:40'),
(20, 'memberlagi', 1, '085791112345', 'member', 'cobalagi@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$sHb9BGY/oyMGpGI2KqLllQ$jHLMCnMQuoNDG3hUOvCYFJH6w1Af0YdyGCNuk4zyj6I', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWx0ZXIiOiJtZW1iZXJSZWdpc3RlciIsIm5hbWUiOiJtZW1iZXJsYWdpIiwiYWRkcmVzcyI6Im1lbWJlciIsInBob25lIjoiMDg1NzkxMTEyMzQ1IiwiZ2VuZGVyIjoxLCJlbWFpbCI6ImNvYmFsYWdpQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJGFyZ29uMmkkdj0xOSRtPTQwOTYsdD0zLHA9MSRzSGI5QkdZL295TUdwR0kyS3FMbGxRJGpITE1Dbk1RdW9OREczaFVPdkNZRkpINncxQWYwWWR5R0NOdWs0enlqNkkiLCJ2ZXJpZmljYXRpb25Db2RlIjoxNzE2NTQsImlhdCI6MTU5NDcwMzM4MSwiZXhwIjoxNTk0NzIxMzgxLCJhdWQiOiJodHRwOi8vZml0Y2x1Yi5pZCIsImlzcyI6IkZpdENsdWIgTmV0d29yayIsInN1YiI6ImFnbmV0aXVzbGVlQGdtYWlsLmNvbSJ9.OFqnaiQwBuul3fLnWSPYLJDl4VuJ7nmKsL81JgZIB2EWcPSLMatxYyA1k762-r8UCd6oRjtwVvuJKMj4ZO7jZA', 'online', '171654', 1, '2020-07-14 12:09:41'),
(21, 'lagi', 1, '085791341112', 'lagi', 'lagi@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$8Ocn85h3pLOQCv/gESvw3A$cE7WlEwSbbGT+9WNHEEcvq7AkMCMS4aNbFHHffysSgA', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWx0ZXIiOiJtZW1iZXJSZWdpc3RlciIsIm5hbWUiOiJsYWdpIiwiYWRkcmVzcyI6ImxhZ2kiLCJwaG9uZSI6IjA4NTc5MTM0MTExMiIsImdlbmRlciI6MSwiZW1haWwiOiJsYWdpQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJGFyZ29uMmkkdj0xOSRtPTQwOTYsdD0zLHA9MSQ4T2NuODVoM3BMT1FDdi9nRVN2dzNBJGNFN1dsRXdTYmJHVCs5V05IRUVjdnE3QWtNQ01TNGFOYkZISGZmeXNTZ0EiLCJ2ZXJpZmljYXRpb25Db2RlIjo0NjE2MDYsImlhdCI6MTU5NDcwMzY5NywiZXhwIjoxNTk0NzIxNjk3LCJhdWQiOiJodHRwOi8vZml0Y2x1Yi5pZCIsImlzcyI6IkZpdENsdWIgTmV0d29yayIsInN1YiI6ImFnbmV0aXVzbGVlQGdtYWlsLmNvbSJ9.KTnJth9ccofpCxRLqIe8DF4zIPspL8_gRxpqWE5WIOi4UzbSDZjv1B0ajgIUD6JWglG8pMGiNplUPmDEQnGkYA', 'online', '461606', 0, '2020-07-14 12:14:57'),
(22, 'lagii', 1, '085791341113', 'lagii', 'lagii@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$Do3pSr80/LHY9k0V6+j0Rw$l1FwUIm4eBOu+oLMZu+9ErnkSWZbIIe2Eh+8Cb5iuB0', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsIm5hbWUiOiJsYWdpaSIsImdlbmRlciI6MSwibWVtYmVyQ2F0IjoxLCJtZW1iZXJJZCI6MTAsInBsYWNlSWQiOjAsImpvaW5NZW1iZXJEYXRlIjoiMjAyMC0wNy0xNVQxMjo0ODozNy4wMDBaIiwiZW5kTWVtYmVyRGF0ZSI6IjIwMjAtMDgtMTRUMDA6MDA6MDAuMDAwWiIsInBob25lIjoiMDg1NzkxMzQxMTEzIiwiYWRkcmVzcyI6ImxhZ2lpIiwiZW1haWwiOiJsYWdpaUBnbWFpbC5jb20iLCJpYXQiOjE1OTQ4MDQyNTksImV4cCI6MTU5NDgyMjI1OSwiYXVkIjoiaHR0cDovL2ZpdGNsdWIuaWQiLCJpc3MiOiJGaXRDbHViIE5ldHdvcmsiLCJzdWIiOiJhZ25ldGl1c2xlZUBnbWFpbC5jb20ifQ.CrTqoYUjWWUnl-p83B30QA4S-sWvBvPHsgrkG7zNTNfO0eEvq47ykpnZu9AEoe18HyhZh-3QN5NsZpCTfgiM7g', 'online', '237378', 1, '2020-07-14 12:15:52');

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
-- Indexes for table `switchschedulerequest`
--
ALTER TABLE `switchschedulerequest`
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `classmember`
--
ALTER TABLE `classmember`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `classschedule`
--
ALTER TABLE `classschedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `coach`
--
ALTER TABLE `coach`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `coachactivity`
--
ALTER TABLE `coachactivity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `file`
--
ALTER TABLE `file`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `memberactivity`
--
ALTER TABLE `memberactivity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `personalrecord`
--
ALTER TABLE `personalrecord`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
-- AUTO_INCREMENT for table `switchschedulerequest`
--
ALTER TABLE `switchschedulerequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `temppayment`
--
ALTER TABLE `temppayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
