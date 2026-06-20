CREATE DATABASE IF NOT EXISTS `gamestore`;
USE `gamestore`;


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


DELETE FROM `games`;
INSERT INTO `games` (`id`, `slug`, `title`, `genre`, `price`, `image`, `rating`, `description`) VALUES
	(1, 'csgo', 'CS2', 'shooters', 2, 'assets/images/csgo.jpg', 2, 'CS');


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


DELETE FROM `purchuses`;


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


DELETE FROM `reviews`;
INSERT INTO `reviews` (`id`, `user_id`, `game_id`, `comment`, `rating`, `created_at`) VALUES
	(1, 1, 1, 'DS', 3, '2026-05-20');


CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE armscii8_bin NOT NULL DEFAULT '',
  `birth_date` date DEFAULT NULL,
  `password` varchar(50) COLLATE armscii8_bin NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;


DELETE FROM `users`;
INSERT INTO `users` (`id`, `email`, `birth_date`, `password`) VALUES
	(1, 'marina', '2026-03-29', '12345678');
