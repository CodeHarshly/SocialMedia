-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: sql101.byetcluster.com
-- Generation Time: Mar 22, 2026 at 12:09 PM
-- Server version: 11.4.10-MariaDB
-- PHP Version: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `if0_41449887_Social_media`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `post_id`, `user_id`, `comment`, `time`) VALUES
(2, 7, 204980282, 'hey! iron man', '2023-11-21 12:50:37'),
(3, 6, 204980282, 'hey', '2023-11-21 12:55:39'),
(4, 7, 204980282, 'hey', '2023-11-21 12:57:30'),
(16, 7, 204980282, 'hey! iron man', '2023-11-21 14:35:33'),
(17, 7, 204980282, 'hey! iron man', '2023-11-21 14:36:55'),
(18, 7, 204980282, 'hey! iron man', '2023-11-21 14:37:44'),
(19, 7, 204980282, 'hey! iron man', '2023-11-21 14:40:25'),
(20, 7, 204980282, 'gg', '2023-11-21 14:41:41'),
(21, 7, 204980282, 'hey', '2023-11-21 14:42:10'),
(22, 7, 204980282, 'hey! iron man', '2023-11-21 14:43:08'),
(23, 7, 204980282, 'hey! iron man', '2023-11-21 19:45:23'),
(24, 6, 204980282, 'how you doing?', '2023-11-22 19:42:28'),
(25, 6, 204980282, 'gg', '2023-11-23 12:22:14'),
(26, 6, 204980282, 'gg', '2023-11-23 12:22:14'),
(27, 6, 204980282, 'gg', '2023-11-23 12:22:15'),
(28, 6, 204980282, 'gg', '2023-11-23 12:22:15'),
(29, 6, 204980282, 'gg', '2023-11-23 12:22:15'),
(30, 6, 204980282, 'gg', '2023-11-23 12:22:15'),
(31, 6, 204980282, 'gg', '2023-11-23 12:22:15'),
(32, 6, 204980282, 'gg', '2023-11-23 12:22:16'),
(33, 6, 204980282, 'gg', '2023-11-23 12:22:16'),
(34, 6, 204980282, 'hey! iron man', '2023-11-23 12:34:21'),
(35, 6, 204980282, 'hey! iron man', '2023-11-23 12:35:03'),
(36, 6, 204980282, 'hey! iron man', '2023-11-23 12:35:17'),
(37, 6, 204980282, 'gg', '2023-11-23 12:35:31'),
(38, 6, 204980282, 'hey', '2023-11-23 12:37:13'),
(39, 6, 204980282, 'hey', '2023-11-23 12:38:21'),
(40, 6, 204980282, 'yo', '2023-11-23 12:38:42'),
(41, 6, 204980282, 'hi', '2023-11-23 12:39:57'),
(42, 6, 204980282, 'hey', '2023-11-23 12:42:04'),
(43, 6, 204980282, 'j', '2023-11-23 12:42:51'),
(44, 8, 204980282, 'hey! Caps', '2023-11-23 12:43:38'),
(45, 6, 204980282, 'hey', '2023-11-23 12:43:49'),
(46, 6, 204980282, 'hey', '2023-11-23 12:50:06'),
(47, 8, 204980282, 'hey', '2023-11-23 13:01:30'),
(48, 8, 204980282, 'yo', '2023-11-25 16:06:18'),
(49, 8, 204980282, 'gh', '2023-11-25 16:06:56'),
(50, 8, 204980282, 'f', '2023-11-25 16:07:59'),
(51, 8, 204980282, 'j', '2023-11-25 16:11:40'),
(52, 9, 204980282, 'hey', '2023-11-25 16:17:31'),
(53, 9, 204980282, 'hey', '2023-11-25 16:17:36'),
(54, 9, 1265043065, 'f', '2023-12-06 19:05:18'),
(55, 10, 233227825, 'yo', '2024-04-13 13:08:18'),
(56, 9, 233227825, 'hey', '2024-04-13 13:08:41'),
(57, 9, 233227825, 'hey', '2024-04-13 13:08:47'),
(58, 10, 204980282, 'hey', '2024-04-16 18:29:50'),
(59, 9, 204980282, 'hey', '2024-04-18 13:07:03'),
(60, 0, 129009182, 'hey! iron man', '2024-04-19 11:24:57'),
(61, 9, 204980282, 'hey', '2024-04-19 11:36:29'),
(62, 12, 204980282, 'hey', '2024-04-19 12:42:19'),
(63, 12, 204980282, 'hey! Caps', '2024-04-19 12:42:29');

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `id` int(11) NOT NULL,
  `follower_id` int(11) DEFAULT NULL,
  `following_id` int(11) DEFAULT NULL,
  `time` int(11) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`id`, `follower_id`, `following_id`, `time`) VALUES
(19, 233227825, 204980282, 2147483647),
(107, 204980282, 1265043065, 2147483647),
(111, 204980282, 233227825, 2147483647),
(112, 239919895, 204980282, 2147483647),
(113, 239919895, 233227825, 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `liked`
--

CREATE TABLE `liked` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `liked`
--

INSERT INTO `liked` (`id`, `post_id`, `user_id`, `time`) VALUES
(17, 4, 204980282, '2023-11-20 06:53:31'),
(18, 5, 204980282, '2023-11-20 06:53:45'),
(21, 2, 204980282, '2023-11-20 07:30:46'),
(22, 1, 204980282, '2023-11-20 07:30:49'),
(110, 9, 1265043065, '2023-12-06 19:04:46'),
(119, 8, 1265043065, '2023-12-09 07:42:15'),
(123, 6, 233227825, '2024-04-13 13:13:27'),
(126, 0, 129009182, '2024-04-19 11:24:51'),
(216, 8, 233227825, '2024-04-20 17:55:33'),
(219, 1, 233227825, '2024-04-20 18:17:05'),
(221, 11, 233227825, '2024-04-20 19:42:42'),
(222, 10, 233227825, '2024-04-20 19:42:51'),
(241, 12, 233227825, '2024-04-20 19:54:10'),
(242, 9, 233227825, '2024-04-20 19:54:23'),
(247, 6, 204980282, '2024-04-22 16:21:52'),
(248, 7, 204980282, '2024-04-22 16:21:53'),
(249, 8, 204980282, '2024-04-22 16:21:54'),
(250, 9, 204980282, '2024-04-22 16:21:55'),
(251, 10, 204980282, '2024-04-22 16:21:57'),
(252, 11, 204980282, '2024-04-22 16:21:58'),
(253, 12, 204980282, '2024-04-22 16:22:02');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` bigint(20) NOT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `message` text NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `message`, `time`, `is_read`) VALUES
(1, 239919895, 204980282, 'hi', '2026-03-22 15:20:49', 0),
(2, 519820113, 204980282, 'hi', '2026-03-22 15:47:52', 0),
(3, 519820113, 204980282, 'hi', '2026-03-22 15:48:06', 0),
(4, 519820113, 239919895, 'hi', '2026-03-22 15:48:26', 1),
(5, 239919895, 519820113, 'hi', '2026-03-22 15:49:16', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `from_user_id` bigint(20) NOT NULL,
  `type` varchar(50) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(50) NOT NULL,
  `user_id` int(50) NOT NULL,
  `imagepath` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp(),
  `likes` int(50) DEFAULT 0,
  `comments` int(50) DEFAULT 0,
  `shares` int(50) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `imagepath`, `caption`, `time`, `likes`, `comments`, `shares`) VALUES
(6, 204980282, 'upload/204980282/posts/1700290700_ironman1.jpg', '', '2023-11-18 06:58:20', 2, 23, 0),
(7, 204980282, 'upload/204980282/posts/1700569557_blackwidwo2.jpg', '', '2023-11-21 12:25:57', 1, 10, 0),
(8, 204980282, 'upload/204980282/posts/1700743392_Captainamerica2.jpg', '', '2023-11-23 12:43:12', 3, 6, 0),
(9, 204980282, 'upload/204980282/posts/1700928933_spiderman1.jpg', '', '2023-11-25 16:15:33', 3, 7, 0),
(10, 233227825, 'upload/233227825/posts/1713013687_homep1.png', '', '2024-04-13 13:08:07', 2, 2, 0),
(11, 204980282, 'upload/204980282/posts/1713445684_homep1.png', '', '2024-04-18 13:08:04', 2, 0, 0),
(12, 233227825, 'upload/233227825/posts/1713529588_aboutp1.png', 'fk', '2024-04-19 12:26:28', 2, 2, 0);

-- --------------------------------------------------------

--
-- Table structure for table `saved`
--

CREATE TABLE `saved` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved`
--

INSERT INTO `saved` (`id`, `post_id`, `user_id`, `time`) VALUES
(9, 9, 1265043065, '2023-12-09 08:07:23'),
(13, 11, 204980282, '2024-04-22 15:55:12'),
(15, 12, 204980282, '2024-04-22 16:02:21');

-- --------------------------------------------------------

--
-- Table structure for table `userdetails`
--

CREATE TABLE `userdetails` (
  `id` int(11) NOT NULL,
  `user_id` int(50) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `profileimage` varchar(255) DEFAULT 'upload/default/profile.jpg',
  `password` varchar(255) DEFAULT NULL,
  `otp` int(50) DEFAULT NULL,
  `verfication` varchar(50) DEFAULT NULL,
  `role` varchar(50) NOT NULL,
  `bio` varchar(255) NOT NULL,
  `followers` int(50) DEFAULT 0,
  `following` int(50) DEFAULT 0,
  `posts` int(11) DEFAULT 0,
  `joined` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userdetails`
--

INSERT INTO `userdetails` (`id`, `user_id`, `fname`, `username`, `email`, `phone`, `profileimage`, `password`, `otp`, `verfication`, `role`, `bio`, `followers`, `following`, `posts`, `joined`) VALUES
(15, 204980282, 'Harshdeep', 'harshdeep', 'harshdeepsinghchoudhary1@gmail.com', '8493015407', 'upload/204980282/profile/1700464353_blackwidwo1.jpg', 'd4e3730e8cba214f85cddae5f9331d74', 0, 'no', 'user', 'Hello', 2, 2, 5, '2023-11-16 13:35:48'),
(23, 233227825, 'Harshdeep Singh', 'harshdeepsingh1', 'harshdeepsinghchoudhary@gmail.com', '8493015407', 'upload/233227825/profile/1700123553_Harsh.png', 'd4e3730e8cba214f85cddae5f9331d74', 0, 'Verified', 'user', '', 2, 2, 2, '2023-11-16 13:35:48'),
(24, 1265043065, 'Harshdeep Singh', 'sharma', 'harshdeepsinghchoudhary4321@gmail.com', '8493015407', 'upload/default/profile.jpg', 'harsh\r\n', 0, 'Verified', 'user', '', 1, 0, 0, '2023-11-25 16:55:17'),
(26, 519820113, 'Harshdeep Singh', 'harshdeepsinghchoudhary1', 'harshdeepsinghdour@gmail.com', '8493015407', 'upload/default/profile.jpg', 'd6b8294df3871e4689e0f4964b4a1219', 6306, 'no', 'user', '', 0, 0, 0, '2026-03-22 12:47:51'),
(27, 239919895, 'Harshdeep Singh', 'harshdeepsinghgamer', 'iharshdeepdhillon@gmail.com', '8493015407', 'upload/default/profile.jpg', 'd4e3730e8cba214f85cddae5f9331d74', 0, 'Verified', 'user', '', 0, 2, 0, '2026-03-22 14:43:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follower_id` (`follower_id`),
  ADD KEY `following_id` (`following_id`);

--
-- Indexes for table `liked`
--
ALTER TABLE `liked`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `saved`
--
ALTER TABLE `saved`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdetails`
--
ALTER TABLE `userdetails`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `followers`
--
ALTER TABLE `followers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `liked`
--
ALTER TABLE `liked`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `saved`
--
ALTER TABLE `saved`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `userdetails`
--
ALTER TABLE `userdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `userdetails` (`user_id`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `userdetails` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
