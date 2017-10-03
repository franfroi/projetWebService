-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  mar. 03 oct. 2017 à 16:24
-- Version du serveur :  10.1.24-MariaDB
-- Version de PHP :  7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `projetwebservice`
--

-- --------------------------------------------------------

--
-- Structure de la table `festival`
--

CREATE TABLE `festival` (
  `id` int(11) NOT NULL,
  `title` varchar(256) NOT NULL,
  `lat` varchar(256) NOT NULL,
  `lng` varchar(256) NOT NULL,
  `url` varchar(256) NOT NULL,
  `typeMusic` varchar(256) NOT NULL,
  `dateDeb` varchar(256) NOT NULL,
  `dateFin` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `festival`
--

INSERT INTO `festival` (`id`, `title`, `lat`, `lng`, `url`, `typeMusic`, `dateDeb`, `dateFin`) VALUES
(9, 'Les Branleurs', '42.98855358865986', '2.131378878839314', 'http://www.idemconseil.com/EcoleDuNumerique/francois/img/2.png', '[\"Alternative Music\",\"Hip Hop \\/ Rap\"]', '18/10/2017', '21/10/2017'),
(10, 'Les chicos', '44.418065613020765', '3.284943331964314', 'http://www.idemconseil.com/EcoleDuNumerique/francois/img/3.png', '[\"Jazz\"]', '23/10/2017', '29/10/2017');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `festival`
--
ALTER TABLE `festival`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `festival`
--
ALTER TABLE `festival`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
