SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE IF NOT EXISTS `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

INSERT INTO `group` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'DEV', 'developer', '2022-10-14 11:36:10', '2022-10-14 11:36:10'),
(2, 'Customer', 'Khach hang', '2022-10-14 11:36:10', '2022-10-14 11:36:10'),
(3, 'LEAD', 'Leader', '2022-10-14 11:38:31', '2022-10-14 11:38:31'),
(4, 'Guest', 'View only', '2022-10-19 20:45:03', '2022-10-19 20:45:03');

CREATE TABLE IF NOT EXISTS `grouprole` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupID` int(11) DEFAULT NULL,
  `roleID` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

INSERT INTO `grouprole` (`id`, `groupID`, `roleID`, `createdAt`, `updatedAt`) VALUES
(1, 4, 1, '2022-10-14 11:39:18', '2022-10-14 11:39:18'),
(2, 4, 2, '2022-10-19 20:49:17', '2022-10-19 20:49:17'),
(3, 4, 3, '2022-10-20 10:02:16', '2022-10-20 10:02:16'),
(4, 4, 4, '2022-10-20 11:29:38', '2022-10-20 11:29:38'),
(5, 4, 5, '2022-10-20 11:29:44', '2022-10-20 11:29:44'),
(6, 4, 6, '2022-10-24 11:38:43', '2022-10-24 11:38:43'),
(7, 4, 7, '2022-10-24 17:51:52', '2022-10-24 17:51:52'),
(8, 4, 8, '2022-10-24 17:51:52', '2022-10-24 17:51:52'),
(11, 4, 9, '2022-10-24 21:40:42', '2022-10-24 21:40:42'),
(12, 4, 25, '2022-10-25 07:16:11', '2022-10-25 07:16:11');

CREATE TABLE IF NOT EXISTS `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `customerID` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `projectuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `projectID` int(11) DEFAULT NULL,
  `userID` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4;

INSERT INTO `role` (`id`, `url`, `description`, `createdAt`, `updatedAt`) VALUES
(1, '/user/read', 'Xem danh sách người dùng', '2022-10-14 11:37:11', '2022-10-14 11:37:11'),
(2, '/user/create\r\n', 'Tạo mới người dùng\r\n', '2022-10-14 11:37:11', '2022-10-14 11:37:11'),
(3, '/user/update', 'Xóa người dùng\r\n', '2022-10-14 11:37:11', '2022-10-14 11:37:11'),
(4, '/user/delete', 'update nguoi dung', '2022-10-20 09:54:53', '2022-10-20 09:54:53'),
(5, '/group/read', NULL, '2022-10-20 09:55:27', '2022-10-20 09:55:27'),
(6, '/role/create', 'Create New Role', '2022-10-24 11:38:02', '2022-10-24 11:38:02'),
(7, '/role/read', NULL, '2022-10-24 17:49:50', '2022-10-24 17:49:50'),
(8, '/role/delete', NULL, '2022-10-24 17:50:50', '2022-10-24 17:50:50'),
(9, '/role/bygroup', '', '2022-10-24 19:39:55', '2022-10-24 19:39:55'),
(25, '/role/assign-to-group', '', '2022-10-25 05:15:31', '2022-10-25 05:15:31');

CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `sequelizemeta` (`name`) VALUES
('20221012043621-create-user.js'),
('20221012043621-group.js'),
('20221012043621-GroupRole.js'),
('20221012043621-project.js'),
('20221012043621-ProjectUser.js'),
('20221012043621-role.js');

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `groupID` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4;

INSERT INTO `user` (`id`, `email`, `password`, `username`, `address`, `sex`, `phone`, `groupID`, `createdAt`, `updatedAt`) VALUES
(33, '456', '123', 'nghi', 'hp', 'Other', '123', 1, '2022-10-18 16:36:45', '2022-10-23 19:08:20'),
(34, 'bug@gmail.com', '123', '123', '123', '', '456', 3, '2022-10-18 16:50:27', '2022-10-18 16:50:27'),
(37, 'nghi12345@gmail.com', '$2a$10$Fj9ryUMpGS889Usq6BRPNeC2Y9WdD3GhYHMI2F0oAeXJXh1XNPlIi', '123', '123', '', '12341', 3, '2022-10-18 19:45:21', '2022-10-18 19:45:21'),
(39, 'test2@gmail.com', '$2a$10$LTJdx/Tbva410UMdOBOcpO2wV08b68LOIOqWVe.bJS8wBH3Mgg.AO', '12313', '21312421', 'Female', '124124214', 3, '2022-10-18 20:04:22', '2022-10-18 20:04:22'),
(40, 'abab@gmail.com', '$2a$10$LTJdx/Tbva410UMdOBOcpO2wV08b68LOIOqWVe.bJS8wBH3Mgg.AO', 'nghibabab', '1321421421', '', '032103210', 1, '2022-10-18 20:05:46', '2022-10-18 20:05:46'),
(41, '1@gmail.com', '$2a$10$LTJdx/Tbva410UMdOBOcpO2wV08b68LOIOqWVe.bJS8wBH3Mgg.AO', '123', '123213', 'Other', '0123123', 3, '2022-10-18 20:10:07', '2022-10-19 07:33:03'),
(42, '2@gmail.com', '$2a$10$LTJdx/Tbva410UMdOBOcpOMSukE9yCd0yhjF/A7X.fOF//hXApqT2', '213123', '1312321312', 'Other', '2131312', 3, '2022-10-18 20:13:33', '2022-10-18 20:13:33'),
(43, 'cde@gmail.com', '$2a$10$LTJdx/Tbva410UMdOBOcpOm66X8xUogGAwBcM.JvU/mk7JTOXuDpu', '32131231', '1214124214', '', '123123123', 2, '2022-10-18 20:13:56', '2022-10-18 20:13:56'),
(44, 'ababa', '$2a$10$jAaQ3AW4zRyRyIjIf2brjuH0KZEtbZ/bzFGO/8L43qRmpfTR.zhVm', '421421', '241421', '', '123213214', 2, '2022-10-18 20:15:56', '2022-10-18 20:15:56'),
(45, 'e@gmail.com', '$2a$10$jAaQ3AW4zRyRyIjIf2brjue0LI1Z2vYJdgbhbDDWAa/lZdf.nDLoS', '123', '214', '', '123421421', 1, '2022-10-18 20:18:45', '2022-10-18 20:18:45'),
(46, 'o@gmail.com', '$2a$10$jAaQ3AW4zRyRyIjIf2brjuVaFTkd5kW5qbMuA.pwWhnq5rnl8I6O2', '1233', '3213231', '', '1232313213', 3, '2022-10-18 20:28:40', '2022-10-18 20:28:40'),
(47, 'touyen@gmail.com', '$2a$10$jAaQ3AW4zRyRyIjIf2brjuVaFTkd5kW5qbMuA.pwWhnq5rnl8I6O2', 'uyen', '123', 'Male', '76799', 2, '2022-10-19 02:39:09', '2022-10-19 07:21:23'),
(48, 'nghi1@gmail.com', '$2a$10$jAaQ3AW4zRyRyIjIf2brjuVaFTkd5kW5qbMuA.pwWhnq5rnl8I6O2', 'nghi', '123213', '', '0909', 3, '2022-10-19 02:39:55', '2022-10-19 02:39:55'),
(49, 'nghi2@gmail.com', '$2a$10$jAaQ3AW4zRyRyIjIf2brjuVaFTkd5kW5qbMuA.pwWhnq5rnl8I6O2', 'nghi', '123', '', '01010', 2, '2022-10-19 02:44:13', '2022-10-19 07:19:15'),
(50, 'nghi@gmail.com1', '$2a$10$5rV6n/DRyJAnWMLl7Jy2OuvUTxXZELTuR41qOvR5bMR/iy1OFS6A6', '3123123', '312312', '', '12321321', 3, '2022-10-19 02:46:00', '2022-10-19 02:46:00'),
(52, 'nghi@yahoo.com', '$2a$10$5rV6n/DRyJAnWMLl7Jy2Ou5VuRXiJvg2HqY2I4boWht1QyDNEffrW', '312321', '1', '', '123213', 3, '2022-10-19 02:55:21', '2022-10-19 02:55:21'),
(53, 'z@gmail.com', '$2a$10$5rV6n/DRyJAnWMLl7Jy2OuVd3QlZi0vPsw71R0chGzK.64GW.obPC', '123', '123123', 'Other', '92929', 1, '2022-10-19 02:58:42', '2022-10-19 02:58:42'),
(55, 'u@gmail.com', '$2a$10$bGWeoaAM5/eNO6BlSos/yupDPs/fdHB2/Lp6jAUDTgHWw3.voBhiC', 'u', '123', 'Female', '0123', 2, '2022-10-19 07:16:30', '2022-10-19 07:17:27'),
(56, 'mu@gmail.com', '$2a$10$nRSgofgjvSF2qlWSR.kJHOHNa4elQ8pItsit.4B3LbvkoqMO0Qz4W', 'mu', '13223', 'Female', '01234', 3, '2022-10-19 07:20:06', '2022-10-19 07:21:03'),
(57, 'iii@gmail.com999', '$2a$10$nRSgofgjvSF2qlWSR.kJHOHNa4elQ8pItsit.4B3LbvkoqMO0Qz4W', '999', '123', '', '999', 3, '2022-10-19 07:30:31', '2022-10-19 07:30:31'),
(58, '98@gmail.com', '$2a$10$nRSgofgjvSF2qlWSR.kJHOHNa4elQ8pItsit.4B3LbvkoqMO0Qz4W', '123', '123', 'Female', '12344', 3, '2022-10-19 07:32:26', '2022-10-19 07:32:44'),
(59, 'nghinghi@gmail.com', '$2a$10$nRSgofgjvSF2qlWSR.kJHOHNa4elQ8pItsit.4B3LbvkoqMO0Qz4W', '132', '123', 'Other', '1232131', 1, '2022-10-19 08:43:45', '2022-10-19 08:43:58'),
(60, 'nghi23@gmail.com', '$2a$10$nRSgofgjvSF2qlWSR.kJHOHNa4elQ8pItsit.4B3LbvkoqMO0Qz4W', '123', '4141', NULL, '12313123213', 1, '2022-10-19 08:44:18', '2022-10-19 08:46:06'),
(62, 'nghiabc@gmail.com', '$2a$10$nRSgofgjvSF2qlWSR.kJHOHNa4elQ8pItsit.4B3LbvkoqMO0Qz4W', '1231', '123', '', '1234444', 1, '2022-10-19 08:49:03', '2022-10-19 08:49:03'),
(64, 'nghi98@gmail.com', '$2a$10$6GNtSEKmPc2HQ.ZVJbz9CeeMgA0.3KavkBjPYkUA7lg5cjtTHWqvS', '123', NULL, NULL, '0922', 4, '2022-10-19 18:45:38', '2022-10-19 18:45:38');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
