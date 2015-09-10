-- MySQL dump 10.13  Distrib 5.5.44, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: TFGv3
-- ------------------------------------------------------
-- Server version	5.5.44-0ubuntu0.14.10.1

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
INSERT INTO `car` VALUES ('0000000',1,'0000000',1),('5555',2,'asdf',3),('8908098',1,'9809809',1),('aaaa',1,'asdf',1),('aasd',1,'asdf',1),('asdfasdf',1,'Modelo1',1),('asdfaww',2,'asdf',2),('asdfyyy',1,'asdf',1),('ccc',1,'aas',1),('cccd',1,'aas',1),('ew4',2,'asdg',3),('LKDP',4,'asdfkkkk',6),('M1XS',4,'Model1',100),('M2XS',4,'Model2',200),('M3XS',4,'Model3',300),('M4XS',4,'Model4',400),('M5XS',4,'Model5',500),('mmmmm',2,'assggghhhmmm',2),('rtur667',2,'asdg',3),('sdfffffff',3,'asdfassssss',3),('ttt',1,'as',1),('vvvv',1,'aaaa',1),('ww',1,'aas',1),('X123',2,'asdf',1),('XJSK766',1,'Modelo 1',2),('yuoylj',4,'fjjuy',4),('yuoyo',1,'asdf',1);
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
INSERT INTO `favorites` VALUES (12,1),(12,2),(1,3),(1,12);
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tfg`@`localhost`*/ /*!50003 TRIGGER `favorites_NOTIF` AFTER INSERT ON `favorites` FOR EACH ROW

BEGIN


REPLACE INTO `notification` (emitter, receiver, type) VALUES (NEW.user1, NEW.user2, 'favorite');

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `utcoffset` tinyint(2) NOT NULL,
  PRIMARY KEY (`idlocation`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `location`
--

LOCK TABLES `location` WRITE;
/*!40000 ALTER TABLE `location` DISABLE KEYS */;
INSERT INTO `location` VALUES (1,'Granada','EspaÃ±a','Granada es una ciudad y municipio espaÃ±ol, capital de la provincia homÃ³nima, en la comunidad autÃ³noma de AndalucÃ­a.','http://assets.tours2dream.com/images/tours/26',0),(2,'Motril','EspaÃ±a','Motril es una ciudad y municipio espaÃ±ol situado en la parte central de la comarca de la Costa Granadina, en la provincia de Granada, comunidad autÃ³noma de AndalucÃ­a.','http://canales.opinionmalaga.com/turismo/wp-c',0),(3,'Gibraltar','EspaÃ±a','Gibraltar es un territorio britÃ¡nico de ultramar situado en una pequeÃ±a penÃ­nsula del extremo sur de la penÃ­nsula ibÃ©rica, haciendo frontera Ãºnicamente con EspaÃ±a, paÃ­s que reclama su soberanÃ­a.','https://upload.wikimedia.org/wikipedia/common',0),(4,'Dogo','Mali','Dogo is a small town and commune in the Cercle of Bougouni in the Sikasso Region of southern Mali. As of 2009 the commune had a population of 33,466.','https://farm3.staticflickr.com/2775/438465531',0),(5,'Touba','Senegal','Touba es una ciudad en el corazÃ³n de Senegal. Se trata de la ciudad sagrada del Muridismo y lugar de entierro de su fundador, Shaikh Aamadu BÃ mba MbÃ kke. Cerca de su tumba se encuentra una gran mezquita fechada en 1963.','https://upload.wikimedia.org/wikipedia/common',0);
/*!40000 ALTER TABLE `location` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `idmessage` int(11) NOT NULL AUTO_INCREMENT,
  `emitter` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `subject` varchar(45) NOT NULL,
  `content` tinytext NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `read` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`idmessage`),
  KEY `fk_message_1_idx` (`emitter`),
  KEY `fk_message_2_idx` (`receiver`),
  CONSTRAINT `fk_message_1` FOREIGN KEY (`emitter`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `idnotification` int(11) NOT NULL AUTO_INCREMENT,
  `emitter` int(11) NOT NULL,
  `receiver` int(11) NOT NULL,
  `type` enum('favorite','reqStatus','tripReq') NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `object` int(11) NOT NULL DEFAULT '0',
  `read` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`idnotification`),
  UNIQUE KEY `index4` (`emitter`,`receiver`,`type`,`object`),
  KEY `fk_notification_1_idx` (`emitter`),
  KEY `fk_notification_2_idx` (`receiver`),
  CONSTRAINT `fk_notification_1` FOREIGN KEY (`emitter`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_notification_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (1,1,12,'favorite','2015-08-18 13:39:06',0,'');
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
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
INSERT INTO `owners` VALUES ('0000000',1,''),('5555',1,''),('8908098',1,''),('aaaa',1,''),('aasd',1,''),('asdfasdf',12,''),('asdfaww',1,''),('asdfyyy',1,''),('ccc',1,''),('cccd',1,''),('ew4',1,''),('LKDP',2,''),('M1XS',1,'Coche1'),('M1XS',2,'Coche1'),('M2XS',1,'Coche2'),('M3XS',3,'Coche1'),('mmmmm',1,''),('rtur667',1,''),('sdfffffff',12,''),('ttt',1,''),('vvvv',1,''),('ww',1,''),('X123',1,''),('XJSK766',1,''),('yuoylj',1,''),('yuoyo',1,'');
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
  `receiverID` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`idpackage`),
  KEY `fk_package_1_idx` (`emitter`),
  KEY `fk_package_2_idx` (`receiver`),
  CONSTRAINT `fk_package_1` FOREIGN KEY (`emitter`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_package_2` FOREIGN KEY (`receiver`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `package`
--

LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES (1,'Caja',2,1,NULL,'Este es un comentario del paquete 1, la caja!',NULL),(2,'Piano',5,1,2,NULL,NULL),(3,'Cajita',1,2,NULL,'Este es un comentario del paquete 3, la cajita!',NULL),(4,'PaqueteUno',2,1,2,NULL,NULL),(5,'asdf',1,1,3,NULL,NULL),(6,'aaa',5,1,3,NULL,NULL),(7,'bbbb',3,1,2,NULL,NULL),(8,'cccc',2,1,2,NULL,NULL),(9,'eeeee',2,1,2,NULL,NULL),(10,'fffff',2,1,2,NULL,NULL),(11,'ggggg',2,1,2,NULL,NULL),(12,'hhhhh',2,1,2,NULL,NULL),(13,'iiiiiii',3,1,2,NULL,NULL),(14,'jjjjjjjj',3,1,2,NULL,NULL),(15,'kkkkk',2,1,2,NULL,NULL),(16,'llllll',2,1,2,NULL,NULL),(17,'sdfsdg',2,1,2,NULL,NULL),(18,'mmmmmmmm',2,1,3,'texto aleatorio',NULL),(19,'nnnnnnn',1,1,2,'asdasdfasdf',NULL),(20,'ooooooo',0,1,2,'sdfsadf',NULL),(21,'ppppppp',1,1,2,'dfghfdh',NULL),(22,'qqqqq',1,1,2,'sdfsfd',NULL),(23,'rrrrrrrr',1,1,3,'sdfsdf',NULL),(24,'ssssss',1,1,3,'sdfasdfasdf',NULL),(25,'tttttt',1,1,3,'sdfsdf',NULL),(26,'uuuuuu',1,1,2,'adgdg',NULL),(27,'vvvvvvvv',2,1,2,'asdfasdf',NULL),(28,'asdfasd',2,1,2,'sdfgsdfg',NULL),(29,'wwwwww',3,1,2,'wwwwwwwww',NULL),(40,'aaaaa',1,12,1,'asdfasdf',''),(41,'sfgfgsfg',2,12,NULL,NULL,'24533334');
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
  `user` int(11) NOT NULL,
  `package` int(11) NOT NULL,
  `cost` int(8) DEFAULT NULL,
  PRIMARY KEY (`trip`,`user`,`package`),
  KEY `fk_packageRequest_3_idx` (`trip`),
  KEY `fk_packageRequest_4_idx` (`trip`),
  KEY `fk_packageRequests_2_idx` (`package`),
  CONSTRAINT `fk_packageRequests_1` FOREIGN KEY (`trip`, `user`) REFERENCES `requests` (`trip`, `user`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_packageRequests_2` FOREIGN KEY (`package`) REFERENCES `package` (`idpackage`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `packageRequests`
--

LOCK TABLES `packageRequests` WRITE;
/*!40000 ALTER TABLE `packageRequests` DISABLE KEYS */;
INSERT INTO `packageRequests` VALUES (2,12,40,123),(2,12,41,12);
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
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `trip` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `pointA` tinyint(3) NOT NULL,
  `pointB` tinyint(3) NOT NULL,
  `travels` bit(1) NOT NULL DEFAULT b'0',
  `cost` int(8) DEFAULT NULL,
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
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (2,8,0,1,'',30),(2,9,0,99,'',20),(2,12,0,99,'',20);
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`tfg`@`localhost`*/ /*!50003 TRIGGER `requests_NOTIF` AFTER INSERT ON `requests` FOR EACH ROW

BEGIN

DECLARE driver INT(11);


SELECT driver FROM trip WHERE idtrip = NEW.trip INTO driver;


REPLACE INTO `notification` (emitter, receiver, type, object) VALUES (NEW.user, driver, 'tripReq', NEW.trip);

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
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
  KEY `fk_trip_3_idx` (`car`,`driver`),
  CONSTRAINT `fk_trip_1` FOREIGN KEY (`driver`) REFERENCES `user` (`iduser`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_2` FOREIGN KEY (`car`) REFERENCES `car` (`idcar`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_trip_3` FOREIGN KEY (`car`, `driver`) REFERENCES `owners` (`car`, `owner`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trip`
--

LOCK TABLES `trip` WRITE;
/*!40000 ALTER TABLE `trip` DISABLE KEYS */;
INSERT INTO `trip` VALUES (2,1,'M1XS',3,'\0','\0','El conductor comenta que.... blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabl.... y eso es todo',NULL),(3,1,'M1XS',4,NULL,'',NULL,NULL),(4,1,'M1XS',4,'','\0','El conductor comenta que....12 blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabl.... y eso es todo',NULL),(5,1,'M1XS',4,'\0','',NULL,NULL),(6,1,'M1XS',3,'','','asdf iwerOOOOO mentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabla Comentario blablabl.... y eso es todo',NULL),(14,1,'asdfaww',1,'','',NULL,NULL),(15,1,'M1XS',3,'','','ffffffffffffffffffffffffffffffffffffffffffffffffffffffff ff',NULL),(16,1,'M2XS',1,'','','ff fff',NULL),(17,1,'M1XS',3,'','\0','ff ff',NULL),(18,1,'M1XS',2,NULL,NULL,NULL,NULL),(19,12,'sdfffffff',1,'',NULL,NULL,NULL),(20,1,'M1XS',2,'',NULL,'sssssss',NULL),(21,12,'sdfffffff',2,NULL,NULL,NULL,NULL);
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
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cost` float DEFAULT NULL,
  `pkcost` float DEFAULT NULL,
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
INSERT INTO `tripPoints` VALUES (2,0,1,'c/ carretera de mÃ¡laga, 115','','2015-09-09 21:00:00',0,0),(2,1,3,'c/ la piruleta','\0','2015-08-01 12:50:38',4,2),(2,2,4,'c/ aleatoria de dogo','','2015-08-01 12:50:38',4,3),(2,99,5,'c/ final de ruta','','2015-09-10 07:30:00',8,5),(3,0,4,'c/ inicio de dogo','','2016-09-10 07:30:00',NULL,NULL),(3,99,1,'c/ final de granada','','2016-09-15 07:30:00',NULL,NULL),(4,0,1,'c/ Sin fin','','0000-00-00 00:00:00',89,5),(4,99,3,'c/ algo con fin','','0000-00-00 00:00:00',23,6),(5,0,4,'c/ Inicio','','0000-00-00 00:00:00',23,24),(5,99,5,'c/ el fin','','0000-00-00 00:00:00',24,45),(6,0,4,'c/ africana','','0000-00-00 00:00:00',23,56),(6,99,2,'c/ espaÃ±ola','','0000-00-00 00:00:00',98,8),(14,0,1,'c/ random GXEOVIGZJCNXRYJYALKG, nÂº21','','2015-08-12 18:24:32',NULL,NULL),(14,1,2,'c/ random BZUSBALSXYQNXTKZKBDZ, nÂº71','','2015-08-12 18:24:32',NULL,NULL),(14,2,3,'c/ random OYGEGGVMABWWTZBETBNE, S/N','','2015-08-12 18:24:32',NULL,NULL),(14,99,5,'c/ random KGUENEZCQEKKJTRJHIIA, nÂº90','\0','2015-08-12 18:24:32',NULL,NULL),(15,0,1,'aaa','','2015-08-13 11:40:12',0,0),(15,1,2,'bbb','','2015-08-13 11:40:12',4,1),(15,2,3,'ccc','','2015-08-13 11:40:12',17,6),(15,99,4,'zzz','','2015-08-13 11:40:12',127,93),(16,0,1,'aaaa a','','2015-08-13 11:38:08',0,0),(16,1,2,'bbbb b','','2015-08-13 11:38:08',3.99,1.36),(16,2,3,'cccc c','','2015-08-13 11:38:08',17.49,5.97),(16,99,4,'zzzz z','','2015-08-13 11:38:08',273.47,93.34),(17,0,1,'a a','','2015-08-14 23:00:00',0,0),(17,1,2,'b b','','2015-08-15 00:51:45',3.99,1.36),(17,2,3,'c c','','2015-08-15 03:30:29',17.49,5.97),(17,99,4,'z z','','2015-08-17 11:32:23',273.47,93.34),(18,0,1,'ab','\0','2015-08-31 23:00:00',0,0),(18,1,2,'bc','\0','2015-09-01 00:51:45',3.99,1.36),(18,2,3,'cd','\0','2015-09-01 03:30:29',17.49,5.97),(18,99,5,'z','\0','2015-09-02 19:21:48',204.51,69.8),(19,0,1,'aaaaaaaa','\0','2015-08-14 23:00:00',0,0),(19,1,2,'dddddddddd','\0','2015-08-14 23:51:45',3.99,1.36),(19,2,3,'ccccccccccc','\0','2015-08-15 02:30:29',17.49,5.97),(19,99,4,'bbbbbbbbbb','\0','2015-08-17 10:32:23',273.47,93.34),(20,0,1,'a','\0','2015-09-14 23:00:00',0,0),(20,1,2,'','\0','2015-09-14 23:51:45',3.99,1.36),(20,2,3,'','\0','2015-09-15 02:30:29',17.49,5.97),(20,99,4,'z','\0','2015-09-17 10:32:23',273.47,93.34),(21,0,1,'5555555','','2015-08-14 23:01:00',0,0),(21,1,2,'asdfasdf','','2015-08-14 23:52:45',3.99,1.36),(21,2,3,'asdfasdf','','2015-08-15 02:31:29',17.49,5.97),(21,99,4,'777777','','2015-08-17 10:33:23',273.47,93.34);
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
  PRIMARY KEY (`iduser`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Usuario1',NULL,'usuario1@mail.com','avatar1','','1990-10-02','$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',0,111),(2,'Usuario2',NULL,'usuario2@mail.com','avatar2','\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,999),(3,'Usuario3',NULL,'usuario3@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(4,'Usuario4',NULL,'usuario4@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(5,'Usuario5',NULL,'usuario5@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(6,'Usuario6',NULL,'usuario6@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(7,'Usuario7',NULL,'usuario7@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(8,'Usuario8',NULL,'usuario8@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(9,'Usuario9',NULL,'usuario9@mail.com',NULL,'\0',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,0),(12,'asdf','asdfasdf','asdfasdf@asdf.com',NULL,'',NULL,'$û7	°Y9ðLòé/}—ü%–ù­Šž¨UÇ¿ëªè’',NULL,453453);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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

-- Dump completed on 2015-09-10 19:43:05
