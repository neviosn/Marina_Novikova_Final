-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.24 - MySQL Community Server (GPL)
-- Операционная система:         Win64
-- HeidiSQL Версия:              12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных gamestore
CREATE DATABASE IF NOT EXISTS `gamestore` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */;
USE `gamestore`;

-- Дамп структуры для таблица gamestore.games
CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `slug` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  `title` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `genre` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `image` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `description` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Дамп данных таблицы gamestore.games: ~1 rows (приблизительно)
DELETE FROM `games`;
INSERT INTO `games` (`id`, `slug`, `title`, `genre`, `price`, `image`, `rating`, `description`) VALUES
	(1, 'csgo', 'CS2', 'shooters', 2, 'assets/images/csgo.jpg', 2, 'CS');

-- Дамп структуры для таблица gamestore.purchuses
CREATE TABLE IF NOT EXISTS `purchuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `game_id` int(11) NOT NULL,
  `purchase_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserPurchase` (`user_id`),
  KEY `GamePurchase` (`game_id`),
  CONSTRAINT `GamePurchase` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UserPurchase` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Дамп данных таблицы gamestore.purchuses: ~0 rows (приблизительно)
DELETE FROM `purchuses`;

-- Дамп структуры для таблица gamestore.reviews
CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned NOT NULL,
  `game_id` int(11) NOT NULL,
  `comment` varchar(255) COLLATE armscii8_bin DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UsersReview` (`user_id`),
  KEY `GameReview` (`game_id`),
  CONSTRAINT `GameReview` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `UsersReview` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Дамп данных таблицы gamestore.reviews: ~1 rows (приблизительно)
DELETE FROM `reviews`;
INSERT INTO `reviews` (`id`, `user_id`, `game_id`, `comment`, `rating`, `created_at`) VALUES
	(1, 1, 1, 'DS', 3, '2026-05-20');

-- Дамп структуры для таблица gamestore.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE armscii8_bin NOT NULL DEFAULT '',
  `birth_date` date DEFAULT NULL,
  `password` varchar(50) COLLATE armscii8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Дамп данных таблицы gamestore.users: ~1 rows (приблизительно)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `email`, `birth_date`, `password`) VALUES
	(1, 'marina', '2026-03-29', '12345678');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
