-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 07, 2015 at 05:48 PM
-- Server version: 5.5.25
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `pgg`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `addressID` int(9) NOT NULL AUTO_INCREMENT,
  `address1` varchar(255) NOT NULL,
  `address2` varchar(255) NOT NULL,
  `address3` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `politicalDivision1` varchar(255) NOT NULL,
  `politicalDivision2` varchar(255) NOT NULL,
  PRIMARY KEY (`addressID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`addressID`, `address1`, `address2`, `address3`, `city`, `state`, `postalCode`, `country`, `politicalDivision1`, `politicalDivision2`) VALUES
(1, 'SomewhereCool', '', '', 'YupVeryCoolPlace', 'StateOfAwesome', '99999', 'CountryOfFire', '', ''),
(2, 'SomewhereCool', '', '', 'YupVeryCoolPlace', 'StateOfAwesome', '99999', 'CountryOfFire', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `alias`
--

CREATE TABLE `alias` (
  `aliasID` int(11) NOT NULL AUTO_INCREMENT,
  `alias` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  PRIMARY KEY (`aliasID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `alias`
--

INSERT INTO `alias` (`aliasID`, `alias`, `category`) VALUES
(1, 'Chronos', 'Titan'),
(2, 'Jeter', 'Yankees');

-- --------------------------------------------------------

--
-- Table structure for table `bidding`
--

CREATE TABLE `bidding` (
  `biddingID` int(4) NOT NULL AUTO_INCREMENT,
  `gameID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `roundID` int(11) NOT NULL,
  `overallBids` decimal(10,0) NOT NULL,
  `userBid` decimal(10,0) NOT NULL,
  `currentAmount` decimal(10,0) NOT NULL,
  PRIMARY KEY (`biddingID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `bidding`
--

INSERT INTO `bidding` (`biddingID`, `gameID`, `userID`, `roundID`, `overallBids`, `userBid`, `currentAmount`) VALUES
(1, 1, 1, 1, 1, 1, 0),
(2, 1, 1, 1, 1, 1, 0),
(3, 1112, 2, 1, 3, 25, 9000);

-- --------------------------------------------------------

--
-- Table structure for table `game`
--

CREATE TABLE `game` (
  `gameID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(9) NOT NULL COMMENT 'Foreign key to user table',
  `control` tinyint(4) NOT NULL COMMENT '0 for false 1 for true',
  PRIMARY KEY (`gameID`),
  KEY `userID` (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`gameID`, `userID`, `control`) VALUES
(1, 0, 0),
(2, 2, 0),
(3, 2, 0),
(4, 2, 0),
(5, 1, 0),
(6, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `preferencesID` int(4) NOT NULL AUTO_INCREMENT,
  `round` int(4) NOT NULL,
  `endowment` float NOT NULL,
  `multiplierFactor` float NOT NULL,
  `lowestDonation` float NOT NULL,
  `highestDonation` float NOT NULL,
  `gameID` int(11) NOT NULL,
  PRIMARY KEY (`preferencesID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `preferences`
--

INSERT INTO `preferences` (`preferencesID`, `round`, `endowment`, `multiplierFactor`, `lowestDonation`, `highestDonation`, `gameID`) VALUES
(1, 1, 100, 0, 0, 0, 1),
(2, 10, 100, 0, 0, 0, 0),
(3, 10, 100, 1.5, 0, 100, 2),
(4, 10, 100, 1.5, 0, 100, 2),
(5, 1, 12, 12, 0, 5, 1112);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(9) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `dateOfBirth` datetime NOT NULL,
  `ethnicity` varchar(255) NOT NULL,
  `firstLanguage` varchar(255) NOT NULL,
  `secondLanguage` varchar(255) NOT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `middleName`, `lastName`, `dateOfBirth`, `ethnicity`, `firstLanguage`, `secondLanguage`) VALUES
(1, 'Brian', 'Ronald', 'MacMillan', '0000-00-00 00:00:00', 'Anglo', 'English', 'Japanese'),
(2, 'Carlos', 'Augusto', 'Peralta', '0000-00-00 00:00:00', 'hispanic', 'English', 'Binary');
