-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 13, 2020 at 02:04 PM
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
  `code` varchar(100) NOT NULL,
  `account_head` varchar(100) NOT NULL,
  `id_ledger_group` int(11) NOT NULL,
  `opening_balance` double NOT NULL,
  `address` varchar(500) NOT NULL,
  `phone` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `account_head`
--

INSERT INTO `account_head` (`id_account_head`, `code`, `account_head`, `id_ledger_group`, `opening_balance`, `address`, `phone`) VALUES
(1, 'LABOUR', 'LABOUR', 0, 0, '', ''),
(2, 'CR', 'NEW', 1, 20000, 'Address', '9895891245'),
(19, 'x', 'zzzzz', 3, 5466, 'fdg', '67867876986'),
(18, 'vb', 'Yum', 1, 25000, 'atring', '9898563427'),
(7, 'AHC', 'AHC NEW', 1, 5000, 'Calicut University', '9089563425'),
(8, 'st', 'chidambaram', 2, 200, 'chennai', '9811178267'),
(9, 'nq', 'vc', 2, 1000, 'ash', '7865344324'),
(10, 'ab', 'NEW ACC', 3, 2500, 'hill', '95468903'),
(5, 'hj', '56', 3, 65, 'xfvx', '76797998080'),
(13, '', 'a1', 2, 1000, 'new', '0000000000'),
(20, 'gh', 'qqqqqq', 3, 78, 'hghj', '787897986798'),
(23, 'jh', '9999', 3, 7, 'h', '78789798798'),
(24, 'sn', 'sneha', 4, 1000000, 'jjjjj', '9877898678'),
(25, '', 'sd', 1, 545, 'fgd', '56456464564');

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
(19, 18, 8, '2020-05-11 00:00:00', 'szxaS', 100, 1000, 'Payment', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id_document` int(11) NOT NULL,
  `id_invoice` int(11) NOT NULL,
  `name` varchar(120) NOT NULL,
  `remarks` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id_document`, `id_invoice`, `name`, `remarks`) VALUES
(5, 1, 'Document 1', 'no remarks'),
(6, 1, 'Document 2', 'no');

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
(1, '2', '2020-05-11 00:00:00', '25', '2020-05-11', ' Exp Neon\nDubai ', 'Jim\r\nVuhan', 'Other', 'hh', 'INDIA', 'CHINA', 'Pre', 'UK', 'VS05', 'GOA', 'KERALA', 'US', '125', '1', 'AWB002', 'NA'),
(2, '3', '2020-04-01 00:00:00', '0', '2020-04-08', '', 'Karla', '', '', '0', '0', '', '', '', '0', '0', '0', '0', '0', '', ''),
(3, '10', '2020-04-07 00:00:00', '0', '2020-04-09', '', 'Gayan', '', '', '0', '0', '', '', '', '0', '0', '0', '0', '0', '', ''),
(10, '2', '2020-04-21 00:00:00', '25', '2020-04-08', 'Expo\r\nDubai', 'Jim\r\nVuhan', 'Other', 'hh', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(11, '2', '2020-04-21 00:00:00', '25', '2020-04-08', 'Expo\r\nDubai', 'Jim\r\nVuhan', 'Other', 'hh', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(12, '11', '2020-04-20 00:00:00', '25', '2020-04-07', 'Expo\r\nDubai', 'Jim\r\nVuhan', '', '', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(13, '11', '2020-04-20 00:00:00', '25', '2020-04-07', 'Expo\r\nDubai', 'Jim\r\nVuhan', '', '', '2', '3', 'Pre', 'UK', 'VS05', '1', '2', '1', '125', '1', 'AWB002', 'NA'),
(14, 'undefined', '2020-04-24 00:00:00', 'undefined', '2020-04-24', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined', 'undefined'),
(15, '10', '2020-05-06 00:00:00', '25', '2020-05-06', 'Exporters\nJamanthy', 'Jim\r\nVuhan', 'Other', 'hh', 'INDIA', 'CHINA', 'Pre', 'UK', 'VS05', 'GOA', 'KERALA', 'US', '125', '1', 'AWB002', 'NA'),
(16, '25', '2020-05-11 00:00:00', '26', '2020-05-11', '11 Expo', 'consignee 11', '11 ref', 'b11', '2', '1', 'd', 'f', '112', '1', '3', '1', '12', '7', '115', 'z');

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
-- Table structure for table `ledger_group`
--

CREATE TABLE `ledger_group` (
  `id_ledger_group` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `ledger_group`
--

INSERT INTO `ledger_group` (`id_ledger_group`, `name`) VALUES
(1, 'SUPPLIER'),
(2, 'STAFF'),
(3, 'ACCOUNT HEAD'),
(4, 'undefined'),
(5, 'hai'),
(6, 'NEW'),
(7, 'NEW'),
(8, 'Q');

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
(2, '2020-04-28 00:00:00', 2, 'Salary', 2433);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id_product` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `unit` varchar(150) NOT NULL,
  `purchase_price` double NOT NULL,
  `selling_price` double NOT NULL,
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id_product`, `name`, `unit`, `purchase_price`, `selling_price`, `category`) VALUES
(1, 'PRODUCT1', 'a', 1000, 1200, 0),
(2, 'PROD1', 'P1', 1150, 1200, 0),
(3, 'PROD2', 'hg', 1000, 500, 0),
(4, 'SAD', 'ZC', 100, 200, 0),
(5, 'PROD3', 'F', 2000, 2500, 0),
(6, 'PROD4', 'PR4', 1000, 1200, 0),
(7, 'P5', '5', 1200, 1400, 0),
(8, 'QWERTY', '3', 100, 300, 0),
(9, 'R', 'F', 3, 20, 0),
(10, 'F', 'Y', 8, 10, 0);

-- --------------------------------------------------------

--
-- Table structure for table `rough_invoice`
--

CREATE TABLE `rough_invoice` (
  `id_rough_invoice` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `port_load` int(11) NOT NULL,
  `consigner` varchar(500) NOT NULL,
  `consignee` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rough_invoice`
--

INSERT INTO `rough_invoice` (`id_rough_invoice`, `date`, `port_load`, `consigner`, `consignee`) VALUES
(1, '2020-05-12 00:00:00', 1, 'zxc', 'xcv'),
(2, '2020-05-12 00:00:00', 2, 'xc', 'xcv');

-- --------------------------------------------------------

--
-- Table structure for table `rough_invoice_items`
--

CREATE TABLE `rough_invoice_items` (
  `id_rough_invoice_items` int(11) NOT NULL,
  `id_rough_invoice` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `kg` double NOT NULL,
  `box` int(11) NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `z_purchase_expenses`
--

CREATE TABLE `z_purchase_expenses` (
  `id_purchase_expense` int(11) NOT NULL,
  `expense` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `id_purchase_voucher` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `z_purchase_expenses`
--

INSERT INTO `z_purchase_expenses` (`id_purchase_expense`, `expense`, `amount`, `id_purchase_voucher`) VALUES
(83, 'LABOUR', 10, 1),
(84, 'CLEAR RECEIPT', 20, 1),
(85, 'AC', 0, 1),
(86, 'ACC', 0, 1),
(87, 'MIN', 0, 1),
(88, 'ACC', 0, 1),
(89, 'AHC', 0, 1),
(90, 'LABOUR', 0, 2),
(91, 'CLEAR RECEIPT', 0, 2),
(92, 'AC', 0, 2),
(93, 'ACC', 0, 2),
(94, 'MIN', 0, 2),
(95, 'ACC', 0, 2),
(96, 'AHC', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `z_purchase_voucher`
--

CREATE TABLE `z_purchase_voucher` (
  `id_purchase_voucher` int(11) NOT NULL,
  `voucher_no` int(11) NOT NULL,
  `date` date NOT NULL,
  `id_account_head` int(11) NOT NULL,
  `payable` double NOT NULL DEFAULT 0,
  `gross` double NOT NULL DEFAULT 0,
  `narration` varchar(250) NOT NULL DEFAULT '0',
  `_old_balance` double NOT NULL,
  `ref_no` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `z_purchase_voucher`
--

INSERT INTO `z_purchase_voucher` (`id_purchase_voucher`, `voucher_no`, `date`, `id_account_head`, `payable`, `gross`, `narration`, `_old_balance`, `ref_no`) VALUES
(1, 1, '2020-03-22', 1, 0, 100000, '', 3027590, ''),
(2, 2, '2020-04-22', 7, 0, 50000, '', 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `z_purchase_voucher_item`
--

CREATE TABLE `z_purchase_voucher_item` (
  `id_purchase_voucher_item` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `kg` double NOT NULL,
  `unit_price` double NOT NULL,
  `total` double NOT NULL DEFAULT 0,
  `id_purchase_voucher` int(11) NOT NULL,
  `remarks` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `z_purchase_voucher_item`
--

INSERT INTO `z_purchase_voucher_item` (`id_purchase_voucher_item`, `id_product`, `quantity`, `kg`, `unit_price`, `total`, `id_purchase_voucher`, `remarks`) VALUES
(3, 2, 25, 0, 10, 250, 2, 'no'),
(21, 2, 100, 0, 1000, 100000, 1, NULL),
(22, 3, 250, 0, 200, 50000, 2, NULL);

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
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id_document`);

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
-- Indexes for table `ledger_group`
--
ALTER TABLE `ledger_group`
  ADD PRIMARY KEY (`id_ledger_group`);

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
-- Indexes for table `rough_invoice`
--
ALTER TABLE `rough_invoice`
  ADD PRIMARY KEY (`id_rough_invoice`);

--
-- Indexes for table `rough_invoice_items`
--
ALTER TABLE `rough_invoice_items`
  ADD PRIMARY KEY (`id_rough_invoice_items`);

--
-- Indexes for table `z_purchase_expenses`
--
ALTER TABLE `z_purchase_expenses`
  ADD PRIMARY KEY (`id_purchase_expense`);

--
-- Indexes for table `z_purchase_voucher`
--
ALTER TABLE `z_purchase_voucher`
  ADD PRIMARY KEY (`id_purchase_voucher`);

--
-- Indexes for table `z_purchase_voucher_item`
--
ALTER TABLE `z_purchase_voucher_item`
  ADD PRIMARY KEY (`id_purchase_voucher_item`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account_head`
--
ALTER TABLE `account_head`
  MODIFY `id_account_head` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `account_voucher`
--
ALTER TABLE `account_voucher`
  MODIFY `id_account_voucher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id_document` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `id_invoice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

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
-- AUTO_INCREMENT for table `ledger_group`
--
ALTER TABLE `ledger_group`
  MODIFY `id_ledger_group` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `payroll`
--
ALTER TABLE `payroll`
  MODIFY `id_payroll` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rough_invoice`
--
ALTER TABLE `rough_invoice`
  MODIFY `id_rough_invoice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `rough_invoice_items`
--
ALTER TABLE `rough_invoice_items`
  MODIFY `id_rough_invoice_items` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `z_purchase_expenses`
--
ALTER TABLE `z_purchase_expenses`
  MODIFY `id_purchase_expense` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `z_purchase_voucher`
--
ALTER TABLE `z_purchase_voucher`
  MODIFY `id_purchase_voucher` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `z_purchase_voucher_item`
--
ALTER TABLE `z_purchase_voucher_item`
  MODIFY `id_purchase_voucher_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
