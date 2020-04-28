-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 28, 2020 at 01:09 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shade_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `account_head`
--

CREATE TABLE `account_head` (
  `id_account_head` int(11) NOT NULL,
  `account_head` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_head`
--

INSERT INTO `account_head` (`id_account_head`, `account_head`) VALUES
(1, 'ACCOUNT HEAD 1'),
(2, 'ACC 2');

-- --------------------------------------------------------

--
-- Table structure for table `account_voucher`
--

CREATE TABLE `account_voucher` (
  `id_account_voucher` int(11) NOT NULL,
  `id_ledger_from` int(11) NOT NULL,
  `id_ledger_to` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `description` varchar(400) NOT NULL,
  `rate` double NOT NULL,
  `amount` double NOT NULL,
  `type` varchar(80) NOT NULL,
  `voucher_no` int(11) NOT NULL,
  `id_invoice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `account_voucher`
--

INSERT INTO `account_voucher` (`id_account_voucher`, `id_ledger_from`, `id_ledger_to`, `date`, `description`, `rate`, `amount`, `type`, `voucher_no`, `id_invoice`) VALUES
(1, 2, 2, '2020-04-25 00:00:00', 'zxsd', 1000, 20000, 'Payment', 1, 3),
(2, 1, 2, '2020-04-25 00:00:00', 'desc', 1500, 25000, 'Payment', 1, 3),
(3, 2, 2, '2020-04-25 00:00:00', 'new', 1000, 100000, 'Payment', 1, 3),
(4, 2, 1, '2020-04-25 00:00:00', 'gfgf', 45, 3000, 'Payment', 1, 3),
(5, 2, 2, '2020-04-27 00:00:00', 'gh', 7, 7, 'Receipt', 7, 1),
(6, 2, 2, '2020-04-27 00:00:00', 'gh', 7, 7, 'Receipt', 7, 1),
(7, 2, 2, '2020-04-27 00:00:00', 'szda', 2000, 2000, 'Receipt', 2000, 1),
(8, 2, 2, '2020-04-27 00:00:00', 'jiya jale', 0, 1000, 'Payment', 1, 1),
(9, 2, 2, '2020-04-27 00:00:00', 'sdf', 0, 2000, 'Receipt', 1, 1),
(10, 2, 2, '2020-04-27 00:00:00', 'aa', 0, 10, 'Payment', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `id_invoice` int(11) NOT NULL,
  `invoice_no` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `order_no` varchar(11) NOT NULL,
  `buyer_date` date NOT NULL,
  `exporter` varchar(500) NOT NULL,
  `consignee` varchar(500) NOT NULL,
  `other` varchar(250) NOT NULL,
  `buyer` varchar(250) NOT NULL,
  `country_origin` varchar(110) NOT NULL,
  `country_final` varchar(110) NOT NULL,
  `pre_carriage` varchar(100) NOT NULL,
  `receipt_place` varchar(100) NOT NULL,
  `vessel_no` varchar(100) NOT NULL,
  `port_load` varchar(110) NOT NULL,
  `port_discharge` varchar(110) NOT NULL,
  `final_destination` varchar(110) NOT NULL,
  `marks` varchar(110) NOT NULL,
  `container_no` varchar(110) NOT NULL,
  `awb_no` varchar(100) NOT NULL,
  `terms` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`id_invoice`, `invoice_no`, `date`, `order_no`, `buyer_date`, `exporter`, `consignee`, `other`, `buyer`, `country_origin`, `country_final`, `pre_carriage`, `receipt_place`, `vessel_no`, `port_load`, `port_discharge`, `final_destination`, `marks`, `container_no`, `awb_no`, `terms`) VALUES
(1, '2', '2020-04-21 00:00:00', '25', '2020-04-08', 'Expo\r\nDubai', 'Jim\r\nVuhan', 'Other', 'hh', 'INDIA', 'CHINA', 'Pre', 'UK', 'VS05', 'GOA', 'KERALA', 'US', '125', '1', 'AWB002', 'NA'),
(2, '3', '2020-04-01 00:00:00', '0', '2020-04-08', '', 'Karla', '', '', '0', '0', '', '', '', '0', '0', '0', '0', '0', '', ''),
(3, '10', '2020-04-07 00:00:00', '0', '2020-04-09', '', 'Gayan', '', '', '0', '0', '', '', '', '0', '0', '0', '0', '0', '', ''),
(10, '2', '2020-04-21 00:00:00', '25', '2020-04-08', 'Expo\r\nDubai', 'Jim\r\nVuhan', 'Other', 'hh', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(11, '2', '2020-04-21 00:00:00', '25', '2020-04-08', 'Expo\r\nDubai', 'Jim\r\nVuhan', 'Other', 'hh', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(12, '11', '2020-04-20 00:00:00', '25', '2020-04-07', 'Expo\r\nDubai', 'Jim\r\nVuhan', '', '', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(13, '11', '2020-04-20 00:00:00', '25', '2020-04-07', 'Expo\r\nDubai', 'Jim\r\nVuhan', '', '', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(14, 'undefined', '2020-04-24 00:00:00', 'undefined', '2020-04-24', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined');

-- --------------------------------------------------------

--
-- Table structure for table `invoice_labour`
--

CREATE TABLE `invoice_labour` (
  `id_labour` int(11) NOT NULL,
  `id_account_head` int(11) NOT NULL,
  `amount` double NOT NULL,
  `id_invoice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_labour`
--

INSERT INTO `invoice_labour` (`id_labour`, `id_account_head`, `amount`, `id_invoice`) VALUES
(1, 1, 5000, 1),
(2, 2, 4500, 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_packing_expense`
--

CREATE TABLE `invoice_packing_expense` (
  `id_other_exp` int(11) NOT NULL,
  `id_account_head` int(11) NOT NULL,
  `amount` double NOT NULL,
  `id_invoice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_packing_expense`
--

INSERT INTO `invoice_packing_expense` (`id_other_exp`, `id_account_head`, `amount`, `id_invoice`) VALUES
(1, 1, 20000, 1),
(2, 2, 5000, 2);

-- --------------------------------------------------------

--
-- Table structure for table `invoice_packing_list`
--

CREATE TABLE `invoice_packing_list` (
  `id_packing_list` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `id_invoice` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `invoice_packing_list`
--

INSERT INTO `invoice_packing_list` (`id_packing_list`, `id_product`, `weight`, `id_invoice`) VALUES
(1, 1, '250', 1),
(2, 2, '500', 2);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id_login` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `password` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `payroll`
--

CREATE TABLE `payroll` (
  `id_payroll` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `id_ledger` int(11) NOT NULL,
  `type` varchar(100) NOT NULL,
  `amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payroll`
--

INSERT INTO `payroll` (`id_payroll`, `date`, `id_ledger`, `type`, `amount`) VALUES
(1, '2020-04-28 00:00:00', 2, 'Salary', 2000),
(2, '2020-04-28 00:00:00', 2, 'Salary', 2433),
(3, '2020-04-26 15:33:08', 1, 'Loan', 1000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `name`) VALUES
(1, 'prod 1'),
(2, 'prod'),
(3, 'product '),
(4, 'product 3');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account_head`
--
ALTER TABLE `account_head`
  ADD PRIMARY KEY (`id_account_head`);

--
-- Indexes for table `account_voucher`
--
ALTER TABLE `account_voucher`
  ADD PRIMARY KEY (`id_account_voucher`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`id_invoice`);

--
-- Indexes for table `invoice_labour`
--
ALTER TABLE `invoice_labour`
  ADD PRIMARY KEY (`id_labour`);

--
-- Indexes for table `invoice_packing_expense`
--
ALTER TABLE `invoice_packing_expense`
  ADD PRIMARY KEY (`id_other_exp`);

--
-- Indexes for table `invoice_packing_list`
--
ALTER TABLE `invoice_packing_list`
  ADD PRIMARY KEY (`id_packing_list`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id_login`);

--
-- Indexes for table `payroll`
--
ALTER TABLE `payroll`
  ADD PRIMARY KEY (`id_payroll`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id_product`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_head`
--
ALTER TABLE `account_head`
  MODIFY `id_account_head` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `account_voucher`
--
ALTER TABLE `account_voucher`
  MODIFY `id_account_voucher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id_invoice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `invoice_packing_expense`
--
ALTER TABLE `invoice_packing_expense`
  MODIFY `id_other_exp` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `invoice_packing_list`
--
ALTER TABLE `invoice_packing_list`
  MODIFY `id_packing_list` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payroll`
--
ALTER TABLE `payroll`
  MODIFY `id_payroll` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
