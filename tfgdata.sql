-- MySQL dump 10.13  Distrib 5.5.44, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: TFGv3
-- ------------------------------------------------------
-- Server version	5.5.44-0ubuntu0.14.04.1

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
-- Current Database: `TFGv3`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `TFGv3` /*!40100 DEFAULT CHARACTER SET utf8 */;

GRANT ALL PRIVILEGES ON TFGv3.* TO 'tfg'@'localhost' IDENTIFIED BY 'asdfasdf';
FLUSH PRIVILEGES;

USE `TFGv3`;

--
-- Table structure for table `assessment`
--

DROP TABLE IF EXISTS `assessment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `assessment` (
  `trip` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `driver` tinyint(2) NOT NULL,
  `car` tinyint(2) NOT NULL,
  `comment` tinytext,
  PRIMARY KEY (`user`,`trip`),
  CONSTRAINT `fk_assessment_1` FOREIGN KEY (`user`, `trip`) REFERENCES `userTrips` (`user`, `trip`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assessment`
--

LOCK TABLES `assessment` WRITE;
/*!40000 ALTER TABLE `assessment` DISABLE KEYS */;
INSERT INTO `assessment` VALUES (2,2,3,4,'Mi comentario es bastante positivo (3 conductor, 4 coche)');
/*!40000 ALTER TABLE `assessment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `car`
--

DROP TABLE IF EXISTS `car`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `car` (
  `idcar` varchar(10) NOT NULL,
  `seats` tinyint(4) NOT NULL,
  `model` varchar(45) DEFAULT NULL,
  `hp` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`idcar`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `car`
--

LOCK TABLES `car` WRITE;
/*!40000 ALTER TABLE `car` DISABLE KEYS */;
INSERT INTO `car` VALUES ('5555',2,'asdf',3),('aaaa',1,'asdf',1),('aasd',1,'asdf',1),('asdfaww',2,'asdf',2),('asdfyyy',1,'asdf',1),('ccc',1,'aas',1),('cccd',1,'aas',1),('ew4',2,'asdg',3),('LKDP',4,'asdfkkkk',6),('M1XS',4,'Model1',100),('M2XS',4,'Model2',200),('M3XS',4,'Model3',300),('M4XS',4,'Model4',400),('M5XS',4,'Model5',500),('mmmmm',2,'assggghhhmmm',2),('rtur667',2,'asdg',3),('ttt',1,'as',1),('vvvv',1,'aaaa',1),('ww',1,'aas',1),('X123',2,'asdf',1),('XJSK766',1,'Modelo 1',2),('yuoylj',4,'fjjuy',4),('yuoyo',1,'asdf',1);
/*!40000 ALTER TABLE `car` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorites` (
  `user1` int(11) NOT NULL,
  `user2` int(11) NOT NULL,
  PRIMARY KEY (`user1`,`user2`),
  KEY `fk_favorites_2_idx` (`user2`),
  CONSTRAINT `fk_favorites_1` FOREIGN KEY (`user1`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_favorites_2` FOREIGN KEY (`user2`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `location`
--

DROP TABLE IF EXISTS `location`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `location` (
  `idlocation` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `description` tinytext,
  `image` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idlocation`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Granada','EspaÃ±a','',''),(2,'Motril','EspaÃ±a','',''),(3,'Gibraltar','EspaÃ±a','',''),(4,'Dogo','Senegal','',''),(5,'Portos','Senegal',NULL,NULL);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `owners`
--

DROP TABLE IF EXISTS `owners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `owners` (
  `car` varchar(10) NOT NULL,
  `owner` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`car`,`owner`),
  KEY `fk_owners_2_idx` (`owner`),
  CONSTRAINT `fk_owners_1` FOREIGN KEY (`car`) REFERENCES `car` (`idcar`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_owners_2` FOREIGN KEY (`owner`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `owners`
--

LOCK TABLES `owners` WRITE;
/*!40000 ALTER TABLE `owners` DISABLE KEYS */;
INSERT INTO `owners` VALUES ('5555',1,''),('aaaa',1,''),('aasd',1,''),('asdfaww',1,''),('asdfyyy',1,''),('ccc',1,''),('cccd',1,''),('ew4',1,''),('LKDP',2,''),('M1XS',1,'Coche1'),('M1XS',2,'Coche1'),('M2XS',1,'Coche2'),('M3XS',3,'Coche1'),('mmmmm',1,''),('rtur667',1,''),('ttt',1,''),('vvvv',1,''),('ww',1,''),('X123',1,''),('XJSK766',1,''),('yuoylj',1,''),('yuoyo',1,'');
/*!40000 ALTER TABLE `owners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `package`
--

DROP TABLE IF EXISTS `package`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `package` (
  `idpackage` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `size` tinyint(2) NOT NULL,
  `emitter` int(11) NOT NULL,
  `receiver` int(11) DEFAULT NULL,
  `description` tinytext,
  PRIMARY KEY (`idpackage`),
  KEY `fk_package_1_idx` (`emitter`),
  KEY `fk_package_2_idx` (`receiver`),
  CONSTRAINT `fk_package_1` FOREIGN KEY (`emitter`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_package_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'Caja',2,1,NULL,'Este es un comentario del paquete 1, la caja!'),(2,'Piano',5,1,2,NULL),(3,'Cajita',1,2,NULL,'Este es un comentario del paquete 3, la cajita!');
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packageRequests`
--

DROP TABLE IF EXISTS `packageRequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `packageRequests` (
  `trip` int(11) NOT NULL,
  `package` int(11) NOT NULL,
  `pointA` tinyint(3) NOT NULL,
  `pointB` tinyint(3) NOT NULL,
  `cost` int(8) DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`trip`,`package`),
  KEY `fk_packageRequest_2_idx` (`package`),
  KEY `fk_packageRequest_3_idx` (`trip`,`pointA`),
  KEY `fk_packageRequest_4_idx` (`trip`,`pointB`),
  CONSTRAINT `fk_packageRequest_3` FOREIGN KEY (`trip`, `pointA`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageRequest_4` FOREIGN KEY (`trip`, `pointB`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageRequest_1` FOREIGN KEY (`trip`) REFERENCES `trip` (`idtrip`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageRequest_2` FOREIGN KEY (`package`) REFERENCES `package` (`idpackage`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packageRequests`
--

LOCK TABLES `packageRequests` WRITE;
/*!40000 ALTER TABLE `packageRequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `packageRequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `packageTrips`
--

DROP TABLE IF EXISTS `packageTrips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `packageTrips` (
  `trip` int(11) NOT NULL,
  `package` int(11) NOT NULL,
  `pointA` tinyint(3) NOT NULL,
  `pointB` tinyint(3) NOT NULL,
  `cost` int(8) DEFAULT NULL,
  PRIMARY KEY (`trip`,`package`),
  KEY `fk_packageTrips_2_idx` (`package`),
  KEY `fk_packageTrips_3_idx` (`pointA`),
  KEY `fk_packageTrips_3_idx1` (`trip`,`pointA`),
  KEY `fk_packageTrips_4_idx` (`trip`,`pointB`),
  CONSTRAINT `fk_packageTrips_1` FOREIGN KEY (`trip`) REFERENCES `trip` (`idtrip`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageTrips_2` FOREIGN KEY (`package`) REFERENCES `package` (`idpackage`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageTrips_3` FOREIGN KEY (`trip`, `pointA`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageTrips_4` FOREIGN KEY (`trip`, `pointB`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`idroute`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `route`
--

LOCK TABLES `route` WRITE;
/*!40000 ALTER TABLE `route` DISABLE KEYS */;
INSERT INTO `route` VALUES (1,'Ruta1'),(2,'Ruta2');
/*!40000 ALTER TABLE `route` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `routePoints`
--

DROP TABLE IF EXISTS `routePoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `routePoints` (
  `route` int(11) NOT NULL,
  `location` int(11) NOT NULL,
  `type` enum('start','center','end') NOT NULL,
  `order` tinyint(4) NOT NULL,
  PRIMARY KEY (`route`,`location`),
  KEY `fk_routePoints_2_idx` (`location`),
  CONSTRAINT `fk_routePoints_1` FOREIGN KEY (`route`) REFERENCES `route` (`idroute`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_routePoints_2` FOREIGN KEY (`location`) REFERENCES `location` (`idlocation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `routePoints`
--

LOCK TABLES `routePoints` WRITE;
/*!40000 ALTER TABLE `routePoints` DISABLE KEYS */;
INSERT INTO `routePoints` VALUES (1,1,'start',1),(1,2,'center',2),(1,3,'center',3),(1,4,'end',4),(1,5,'end',4);
/*!40000 ALTER TABLE `routePoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trip`
--

DROP TABLE IF EXISTS `trip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trip` (
  `idtrip` int(11) NOT NULL AUTO_INCREMENT,
  `driver` int(11) NOT NULL,
  `car` varchar(10) NOT NULL,
  `seats` tinyint(4) NOT NULL,
  `packages` bit(1) DEFAULT NULL,
  `animals` bit(1) DEFAULT NULL,
  `comment` text,
  `expiration` date DEFAULT NULL,
  PRIMARY KEY (`idtrip`),
  KEY `fk_trip_1_idx` (`driver`),
  KEY `fk_trip_2_idx` (`car`),
  CONSTRAINT `fk_trip_1` FOREIGN KEY (`driver`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_2` FOREIGN KEY (`car`) REFERENCES `car` (`idcar`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (2,1,'M1XS',3,'\0','\0','El conductor comenta que.... blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabl.... y eso es todo',NULL),(3,1,'M1XS',4,NULL,'',NULL,NULL),(4,1,'M1XS',4,'','\0','El conductor comenta que....12 blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabl.... y eso es todo',NULL),(5,1,'M1XS',4,'\0','',NULL,NULL),(6,1,'M1XS',3,'','','asdf iwerOOOOO mentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabl.... y eso es todo',NULL);
/*!40000 ALTER TABLE `trip` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tripPoints`
--

DROP TABLE IF EXISTS `tripPoints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tripPoints` (
  `trip` int(11) NOT NULL,
  `order` tinyint(3) NOT NULL,
  `location` int(11) NOT NULL,
  `address` varchar(45) NOT NULL,
  `stop` bit(1) NOT NULL DEFAULT b'0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `cost` tinyint(4) DEFAULT NULL,
  `pkcost` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`trip`,`order`),
  KEY `fk_tripPoints_2_idx` (`location`),
  CONSTRAINT `fk_tripPoints_1` FOREIGN KEY (`trip`) REFERENCES `trip` (`idtrip`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_tripPoints_2` FOREIGN KEY (`location`) REFERENCES `location` (`idlocation`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tripPoints`
--

LOCK TABLES `tripPoints` WRITE;
/*!40000 ALTER TABLE `tripPoints` DISABLE KEYS */;
INSERT INTO `tripPoints` VALUES (2,0,1,'c/ carretera de mÃ¡laga, 115','','2015-09-09 21:00:00',0,0),(2,1,3,'c/ la piruleta','\0','2015-08-01 12:50:38',4,2),(2,2,4,'c/ aleatoria de dogo','','2015-08-01 12:50:38',4,3),(2,99,5,'c/ final de ruta','','2015-09-10 07:30:00',8,5),(3,0,4,'c/ inicio de dogo','','2016-09-10 07:30:00',NULL,NULL),(3,99,1,'c/ final de granada','','2016-09-15 07:30:00',NULL,NULL),(4,0,1,'c/ Sin fin','','0000-00-00 00:00:00',89,5),(4,99,3,'c/ algo con fin','','0000-00-00 00:00:00',23,6),(5,0,4,'c/ Inicio','','0000-00-00 00:00:00',23,24),(5,99,5,'c/ el fin','','0000-00-00 00:00:00',24,45),(6,0,4,'c/ africana','','0000-00-00 00:00:00',23,56),(6,99,2,'c/ espaÃ±ola','','0000-00-00 00:00:00',98,8);
/*!40000 ALTER TABLE `tripPoints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `iduser` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `surnames` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `carnet` bit(1) NOT NULL DEFAULT b'0',
  `birth` date DEFAULT NULL,
  `password` binary(32) NOT NULL,
  `karma` tinyint(2) DEFAULT NULL,
  `phone` bigint(14) NOT NULL,
  PRIMARY KEY (`iduser`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Usuario1',NULL,'usuario1@mail.com','avatar1','','1990-10-02','$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',0,111),(2,'Usuario2',NULL,'usuario2@mail.com','avatar2','\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,999),(3,'Usuario3',NULL,'usuario3@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(4,'Usuario4',NULL,'usuario4@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(5,'Usuario5',NULL,'usuario5@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(6,'Usuario6',NULL,'usuario6@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(7,'Usuario7',NULL,'usuario7@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(8,'Usuario8',NULL,'usuario8@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(9,'Usuario9',NULL,'usuario9@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userRequests`
--

DROP TABLE IF EXISTS `userRequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userRequests` (
  `trip` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `pointA` tinyint(3) NOT NULL,
  `pointB` tinyint(3) NOT NULL,
  `cost` int(8) DEFAULT NULL,
  `comment` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`trip`,`user`),
  KEY `fk_userRequest_2_idx` (`user`),
  KEY `fk_userRequest_3_idx` (`trip`,`pointA`),
  KEY `fk_userRequest_4_idx` (`trip`,`pointB`),
  CONSTRAINT `fk_userRequest_1` FOREIGN KEY (`trip`) REFERENCES `trip` (`idtrip`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userRequest_2` FOREIGN KEY (`user`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userRequest_3` FOREIGN KEY (`trip`, `pointA`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userRequest_4` FOREIGN KEY (`trip`, `pointB`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userRequests`
--

LOCK TABLES `userRequests` WRITE;
/*!40000 ALTER TABLE `userRequests` DISABLE KEYS */;
/*!40000 ALTER TABLE `userRequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userTrips`
--

DROP TABLE IF EXISTS `userTrips`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userTrips` (
  `trip` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `pointA` tinyint(3) NOT NULL,
  `pointB` tinyint(3) NOT NULL,
  `cost` int(8) DEFAULT NULL,
  PRIMARY KEY (`trip`,`user`),
  KEY `fk_userTrips_2_idx` (`user`),
  KEY `fk_userTrips_3_idx` (`pointA`,`pointB`),
  KEY `fk_userTrips_3_idx1` (`trip`,`pointA`),
  KEY `fk_userTrips_4_idx` (`trip`,`pointB`),
  CONSTRAINT `fk_userTrips_1` FOREIGN KEY (`trip`) REFERENCES `trip` (`idtrip`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userTrips_2` FOREIGN KEY (`user`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userTrips_3` FOREIGN KEY (`trip`, `pointA`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_userTrips_4` FOREIGN KEY (`trip`, `pointB`) REFERENCES `tripPoints` (`trip`, `order`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userTrips`
--

LOCK TABLES `userTrips` WRITE;
/*!40000 ALTER TABLE `userTrips` DISABLE KEYS */;
INSERT INTO `userTrips` VALUES (2,2,1,99,90),(2,3,2,99,150),(2,4,0,2,50),(3,2,0,99,60);
/*!40000 ALTER TABLE `userTrips` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-08-05 16:38:19
