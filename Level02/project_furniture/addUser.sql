-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 09, 2021 at 07:56 PM
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
-- Database: `mysql`
--
USE `mysql`;

-- --------------------------------------------------------

DELETE FROM `global_priv` WHERE `User` = 'php';

INSERT INTO `global_priv` (`Host`, `User`, `Priv`) VALUES
('localhost', 'php', '{\"access\":0,\"plugin\":\"mysql_native_password\",\"authentication_string\":\"*CBDCA3740706821CB6AEC7D678984524B187CC97\",\"password_last_changed\":1617683873,\"ssl_type\":0,\"ssl_cipher\":\"\",\"x509_issuer\":\"\",\"x509_subject\":\"\",\"max_questions\":0,\"max_updates\":0,\"max_connections\":0,\"max_user_connections\":0}');

DELETE FROM `db` WHERE `User` = 'php';

INSERT INTO `db` (`Host`, `Db`, `User`, `Select_priv`, `Insert_priv`, `Update_priv`, `Delete_priv`, `Create_priv`, `Drop_priv`, `Grant_priv`, `References_priv`, `Index_priv`, `Alter_priv`, `Create_tmp_table_priv`, `Lock_tables_priv`, `Create_view_priv`, `Show_view_priv`, `Create_routine_priv`, `Alter_routine_priv`, `Execute_priv`, `Event_priv`, `Trigger_priv`, `Delete_history_priv`) VALUES
('localhost', 'furnitures', 'php', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y');


COMMIT;

GRANT USAGE ON *.* TO `php`@`localhost` IDENTIFIED BY PASSWORD '*CBDCA3740706821CB6AEC7D678984524B187CC97';

GRANT ALL PRIVILEGES ON `furnitures`.* TO `php`@`localhost` WITH GRANT OPTION;



/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;