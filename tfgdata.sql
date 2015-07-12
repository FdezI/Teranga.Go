-- MySQL dump 10.13  Distrib 5.5.43, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: TFG
-- ------------------------------------------------------
-- Server version	5.5.43-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `TFG`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `TFG` /*!40100 DEFAULT CHARACTER SET latin1 */;

GRANT ALL PRIVILEGES ON TFG . * TO 'tfg'@'localhost' IDENTIFIED BY 'asdfasdf';
FLUSH PRIVILEGES;

USE `TFG`;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `idcar` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `model` varchar(45) DEFAULT NULL,
  `cvv` int(11) DEFAULT NULL,
  `seats` int(11) DEFAULT NULL,
  `iduser` int(11) NOT NULL,
  PRIMARY KEY (`idcar`),
  KEY `fk_car_1_idx` (`iduser`),
  CONSTRAINT `fk_car_1` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES (1,'MiCoche1','Audio A3',230,4,1),(2,'MiCoche2','Audio A4',250,5,2),(3,'MiCoche1.2','Audio A5',240,4,1),(5,'Coche1.3','Modelo1.3',NULL,4,1),(6,'Coche1.4','Modelo1.4',NULL,5,1),(7,'Coche1.4','Modelo1.5',NULL,4,1),(8,'Coche1.6','Modelo1.6',NULL,4,1),(9,'MiCoche1.7','Modelo1.7',NULL,7,1),(10,'Coche1.8','Modelo1.8',NULL,8,1),(11,'Coche1.9','Modelo1.9',NULL,9,1);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `idlocation` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idlocation`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Loc1'),(2,'Loc2');
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `idpackage` int(11) NOT NULL AUTO_INCREMENT,
  `size` enum('0','1','2','3','4','5') DEFAULT NULL,
  PRIMARY KEY (`idpackage`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packageTrips`
--

DROP TABLE IF EXISTS `packageTrips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `packageTrips` (
  `idtrip` int(11) NOT NULL,
  `idpackage` int(11) NOT NULL,
  PRIMARY KEY (`idtrip`,`idpackage`),
  KEY `fk_packageTrips_2_idx` (`idpackage`),
  CONSTRAINT `fk_packageTrips_1` FOREIGN KEY (`idtrip`) REFERENCES `trip` (`idtrip`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageTrips_2` FOREIGN KEY (`idpackage`) REFERENCES `package` (`idpackage`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packageTrips`
--

LOCK TABLES `packageTrips` WRITE;
/*!40000 ALTER TABLE `packageTrips` DISABLE KEYS */;
/*!40000 ALTER TABLE `packageTrips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `route`
--

DROP TABLE IF EXISTS `route`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `route` (
  `idroute` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idroute`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'Ruta1');
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip` (
  `idtrip` int(11) NOT NULL AUTO_INCREMENT,
  `packages` bit(1) DEFAULT b'0',
  `idcar` int(11) NOT NULL,
  `idroute` int(11) NOT NULL,
  `origin` int(11) DEFAULT NULL,
  `destiny` int(11) DEFAULT NULL,
  PRIMARY KEY (`idtrip`),
  KEY `trip_car_idx` (`idcar`),
  KEY `trip_route_idx` (`idroute`),
  KEY `trip_location_1_idx` (`origin`),
  KEY `trip_location_2_idx` (`destiny`),
  CONSTRAINT `fk_trip_location_1` FOREIGN KEY (`origin`) REFERENCES `location` (`idlocation`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_trip_location_2` FOREIGN KEY (`destiny`) REFERENCES `location` (`idlocation`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (1,'',1,1,1,2),(2,'\0',5,1,2,1);
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `nick` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` binary(32) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Usuario1','usuario1@mail.com','$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’'),(2,'Usuario2','usuario2@mail.com','$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’'),(3,NULL,'usuario3@gmail.com','asdfasdf\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(4,NULL,'usuario4@gmail.com','asdfasdf\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(5,NULL,'usuario5@gmail.com','asdfasdf\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0'),(6,NULL,'usuario6@gmail.com','asdfasdf\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userTrips`
--

DROP TABLE IF EXISTS `userTrips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userTrips` (
  `idtrip` int(11) NOT NULL,
  `iduser` int(11) NOT NULL,
  `accepted` bit(1) DEFAULT NULL,
  PRIMARY KEY (`idtrip`,`iduser`),
  KEY `fk_user_idx` (`iduser`),
  CONSTRAINT `fk_userTrips_1` FOREIGN KEY (`idtrip`) REFERENCES `trip` (`idtrip`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userTrips_2` FOREIGN KEY (`iduser`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userTrips`
--

LOCK TABLES `userTrips` WRITE;
/*!40000 ALTER TABLE `userTrips` DISABLE KEYS */;
INSERT INTO `userTrips` VALUES (1,1,''),(1,2,'\0'),(1,3,'');
/*!40000 ALTER TABLE `userTrips` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `waypoints`
--

DROP TABLE IF EXISTS `waypoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `waypoints` (
  `idroute` int(11) NOT NULL,
  `idlocation` int(11) NOT NULL,
  `type` enum('start','center','end') DEFAULT NULL,
  PRIMARY KEY (`idroute`,`idlocation`),
  KEY `fk_waypoints_2_idx` (`idlocation`),
  CONSTRAINT `fk_waypoints_1` FOREIGN KEY (`idroute`) REFERENCES `route` (`idroute`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_waypoints_2` FOREIGN KEY (`idlocation`) REFERENCES `location` (`idlocation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `waypoints`
--

LOCK TABLES `waypoints` WRITE;
/*!40000 ALTER TABLE `waypoints` DISABLE KEYS */;
/*!40000 ALTER TABLE `waypoints` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-07-12 22:48:16
