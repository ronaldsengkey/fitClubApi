-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 17, 2020 at 04:30 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.2

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
  `code` int(11) DEFAULT NULL,
  `billNumber` varchar(50) DEFAULT NULL,
  `billName` text,
  `branch` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 1, 1, '10:00:00', '12:00:00', '2019-12-23', '2019-12-23', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `coach`
--

CREATE TABLE `coach` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `joinDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `coach`
--

INSERT INTO `coach` (`id`, `userId`, `status`, `joinDate`, `endDate`) VALUES
(1, 2, 1, '2019-12-20 10:03:18', '2020-01-20 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `coachactivity`
--

CREATE TABLE `coachactivity` (
  `id` int(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `dateTrain` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  `joinDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `endDate` date NOT NULL,
  `status` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `member`
--

INSERT INTO `member` (`id`, `userId`, `code`, `memberCat`, `joinDate`, `endDate`, `status`) VALUES
(1, 1, 'FCG001', 2, '2019-12-20 09:52:14', '2020-01-20', 1);

-- --------------------------------------------------------

--
-- Table structure for table `memberactivity`
--

CREATE TABLE `memberactivity` (
  `id` int(11) NOT NULL,
  `scheduleId` int(11) NOT NULL,
  `action` char(20) NOT NULL,
  `memberId` int(11) NOT NULL,
  `dateRecord` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `memberactivity`
--

INSERT INTO `memberactivity` (`id`, `scheduleId`, `action`, `memberId`, `dateRecord`) VALUES
(1, 1, 'joined', 1, '2020-01-04 17:29:49');

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
(1, 1, 50000, 30, NULL),
(2, 2, 100000, 30, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `memberpayment`
--

CREATE TABLE `memberpayment` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `nominal` bigint(20) DEFAULT NULL,
  `memberCat` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdDate` bigint(20) DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `bankId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `joinDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  `joinDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `registerDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `gender`, `phone`, `address`, `email`, `password`, `imgProfile`, `accessToken`, `onlineStatus`, `verificationCode`, `accountStatus`, `registerDate`) VALUES
(1, 'agnetiuslee', 1, '085854333433', 'Jl. Panjang', 'agnetiuslee@gmail.com', '$argon2i$v=19$m=4096,t=3,p=1$EmeVP5GlwJQCWJ45zvc7sQ$PZfjjt0vrwZ+lYIbgi63/bNhfRYljMnZnx5XJ18klA8', 'none', 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6ImFnbmV0aXVzbGVlIiwiZ2VuZGVyIjoxLCJtZW1iZXJDYXQiOjIsIm1lbWJlcklkIjoxLCJqb2luTWVtYmVyRGF0ZSI6IjIwMTktMTItMjBUMDk6NTI6MTQuMDAwWiIsImVuZE1lbWJlckRhdGUiOiIyMDIwLTAxLTIwVDAwOjAwOjAwLjAwMFoiLCJwaG9uZSI6IjA4NTg1NDMzMzQzMyIsImFkZHJlc3MiOiJKbC4gUGFuamFuZyIsImVtYWlsIjoiYWduZXRpdXNsZWVAZ21haWwuY29tIiwiaWF0IjoxNTc4MzcyNDM2LCJleHAiOjE1NzgzOTA0MzYsImF1ZCI6Imh0dHA6Ly9maXRjbHViLmlkIiwiaXNzIjoiRml0Q2x1YiBOZXR3b3JrIiwic3ViIjoiYWduZXRpdXNsZWVAZ21haWwuY29tIn0.c7m5Ua7cRshw5T-S9A2oakTTeWw6ZBooZBS0iKFc69_zutpcUVfROSWwaHMztRv2F20RJJTjZYO5hR_DrYIs9Q', 'online', '531433', 0, '2019-12-21 15:29:11'),
(2, 'coach 1', 1, '7787878787', 'jl. Gulung kuming', 'coach1@mail.com', '7777777', '', '', 'online', '', 1, '2020-01-04 17:45:10');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coach`
--
ALTER TABLE `coach`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `coachactivity`
--
ALTER TABLE `coachactivity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `member`
--
ALTER TABLE `member`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `memberactivity`
--
ALTER TABLE `memberactivity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
