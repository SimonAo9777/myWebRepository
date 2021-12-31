-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2021 at 07:26 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


--
-- Database: `furnitures`
--
DROP DATABASE IF EXISTS `furnitures`;
CREATE DATABASE IF NOT EXISTS `furnitures` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `furnitures`;

-- --------------------------------------------------------

--
-- Stand-in structure for view `findsubcategories`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `findsubcategories`;
CREATE TABLE `findsubcategories` (
`categoryId` varchar(20)
,`header` varchar(50)
,`name` varchar(50)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `findsubcategoriesforfiltering`
-- (See below for the actual view)
--
DROP VIEW IF EXISTS `findsubcategoriesforfiltering`;
CREATE TABLE `findsubcategoriesforfiltering` (
`categoryId` varchar(20)
,`displayOrder` int(2)
,`categoryHeader` varchar(50)
,`name` varchar(50)
);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `id` int(10) NOT NULL,
  `category` varchar(50) DEFAULT NULL,
  `subCategory` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `mainImage` varchar(50) DEFAULT NULL,
  `detailImage1` varchar(50) DEFAULT NULL,
  `detailImage2` varchar(50) DEFAULT NULL,
  `detailImage3` varchar(50) DEFAULT NULL,
  `detailImage4` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `shortDesc` text DEFAULT NULL,
  `features` text DEFAULT NULL,
  `dimensions` text DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `availableQty` int(11) DEFAULT NULL,
  `rating` tinyint(4) NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `category`, `subCategory`, `name`, `mainImage`, `detailImage1`, `detailImage2`, `detailImage3`, `detailImage4`, `description`, `shortDesc`, `features`, `dimensions`, `price`, `availableQty`, `rating`) VALUES
(1, 'Living Room', 'Sofa', 'RS01', 'imgs/sofa1.jpg', 'imgs/sofa1-1.jpg', 'imgs/sofa1-2.jpg', 'imgs/sofa1-3.jpg', 'imgs/sofa1-4.jpg', 'Bring a fresh, contemporary feel to your home or office with leather seating that offers practicality, longevity and style, and reflects your good taste. Rowan is a striking sofa reminiscent of mid-century modern design. Its durable frame, slender track arms, splayed, tapered legs and ample padded seating with loose-back and side cushions are a welcome addition that provide everyday comfort and support.', 'ROWAN 100% leather 3-seater sofa', 'Cover material: full-grain leather Frame: solid pine wood and plywood Legs: rubberwood Back cushions: webbing, foam, fibre and feather Seat cushions: spring, webbing, foam, fibre and feathers Armrests: foam and dacron Cushion padding density: 32kg/m3', 'PRODUCT DIMENSIONS Depth: 91 cm (36\") Width: 223 cm (88\") Height: 84 cm (33\") Seat Depth: 56 cm (22\") Click here for detailed dimensions PACKAGING DIMENSIONS BOX 1 OF 1 Width: 228 cm (90\") Depth: 96 cm (38\") Height: 55 cm (21.5\") Weight: 68.00 kg (149.91 lbs)', '1999.99', 99, 5),
(2, 'Living Room', 'Sofa', 'RS02', 'imgs/sofa2.jpg', '', '', '', '', '[COPIED]Bring a fresh, contemporary feel to your home or office with leather seating that offers practicality, longevity and style, and reflects your good taste. Rowan is a striking sofa reminiscent of mid-century modern design. Its durable frame, slender track arms, splayed, tapered legs and ample padded seating with loose-back and side cushions are a welcome addition that provide everyday comfort and support.', '[COPIED]ROWAN 100% leather 3-seater sofa', '[COPIED]Cover material: full-grain leather Frame: solid pine wood and plywood Legs: rubberwood Back cushions: webbing, foam, fibre and feather Seat cushions: spring, webbing, foam, fibre and feathers Armrests: foam and dacron Cushion padding density: 32kg/m3', '[COPIED]PRODUCT DIMENSIONS Depth: 91 cm (36\") Width: 223 cm (88\") Height: 84 cm (33\") Seat Depth: 56 cm (22\") Click here for detailed dimensions PACKAGING DIMENSIONS BOX 1 OF 1 Width: 228 cm (90\") Depth: 96 cm (38\") Height: 55 cm (21.5\") Weight: 68.00 kg (149.91 lbs)', '104109.99', 4, 4);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` varchar(20) NOT NULL,
  `header` varchar(50) NOT NULL,
  `categoryDisplayOrder` int(2) NOT NULL,
  `forDisplayOnly` char(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`id`, `header`, `categoryDisplayOrder`, `forDisplayOnly`) VALUES
('bedroom', 'Bed Room', 4, 'N'),
('dining', 'Dining Room', 3, 'N'),
('living', 'Living Room', 2, 'N'),
('new', 'New', 1, 'Y'),
('office', 'Office', 5, 'N'),
('price', 'Filter By Price', 7, 'Y'),
('sale', 'Sale', 6, 'Y');

-- --------------------------------------------------------

--
-- Table structure for table `product_subcategory`
--

DROP TABLE IF EXISTS `product_subcategory`;
CREATE TABLE `product_subcategory` (
  `id` int(10) NOT NULL,
  `categoryId` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_subcategory`
--

INSERT INTO `product_subcategory` (`id`, `categoryId`, `name`) VALUES
(1, 'new', 'Furniture'),
(2, 'new', 'Decor'),
(3, 'living', 'Sofa'),
(4, 'living', 'Loveseats'),
(5, 'living', 'Coffee Tables'),
(6, 'dining', 'Table'),
(7, 'dining', 'Chairs'),
(8, 'dining', 'Sideboards'),
(9, 'bedroom', 'Bed'),
(10, 'bedroom', 'Mattresses'),
(11, 'bedroom', 'Nightstands'),
(12, 'office', 'Desk'),
(13, 'office', 'Chairs'),
(14, 'office', 'Storage'),
(15, 'sale', 'Furniture'),
(16, 'sale', 'Decor'),
(17, 'price', '$0-$100'),
(18, 'price', '$100-$1000'),
(19, 'price', '$1000-$10000'),
(20, 'price', '$10000-$20000'),
(21, 'price', '$20000+');

-- --------------------------------------------------------

--
-- Structure for view `findsubcategories`
--
DROP TABLE IF EXISTS `findsubcategories`;

DROP VIEW IF EXISTS `findsubcategories`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `findsubcategories`  AS SELECT `product_subcategory`.`categoryId` AS `categoryId`, `product_category`.`header` AS `header`, `product_subcategory`.`name` AS `name` FROM (`product_subcategory` join `product_category` on(`product_subcategory`.`categoryId` = `product_category`.`id`)) WHERE `product_category`.`forDisplayOnly` = 'N' ;

-- --------------------------------------------------------

--
-- Structure for view `findsubcategoriesforfiltering`
--
DROP TABLE IF EXISTS `findsubcategoriesforfiltering`;

DROP VIEW IF EXISTS `findsubcategoriesforfiltering`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `findsubcategoriesforfiltering`  AS SELECT `product_subcategory`.`categoryId` AS `categoryId`, `product_category`.`categoryDisplayOrder` AS `displayOrder`, `product_category`.`header` AS `categoryHeader`, `product_subcategory`.`name` AS `name` FROM (`product_subcategory` join `product_category` on(`product_subcategory`.`categoryId` = `product_category`.`id`)) ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categoryDisplayOrder` (`categoryDisplayOrder`);

--
-- Indexes for table `product_subcategory`
--
ALTER TABLE `product_subcategory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `product_subcategory`
--
ALTER TABLE `product_subcategory`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
