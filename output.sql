-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: todoapp
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `list`
--

DROP TABLE IF EXISTS `list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `list` (
  `num` int NOT NULL COMMENT '학번',
  `sub_num` int NOT NULL COMMENT '과목번호',
  `li_date` date NOT NULL COMMENT '수강신청날짜'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `list`
--

LOCK TABLES `list` WRITE;
/*!40000 ALTER TABLE `list` DISABLE KEYS */;
INSERT INTO `list` VALUES (2,301,'2024-02-16'),(2,302,'2024-02-16'),(2,303,'2024-02-16'),(2,401,'2024-02-16'),(2,402,'2024-02-16'),(2,403,'2024-02-16'),(3,301,'2024-02-16'),(3,302,'2024-02-16'),(3,303,'2024-02-16'),(3,401,'2024-02-16'),(3,402,'2024-02-16'),(3,403,'2024-02-16'),(4,301,'2024-02-16'),(4,302,'2024-02-16'),(4,303,'2024-02-16'),(4,401,'2024-02-16'),(4,402,'2024-02-16'),(4,403,'2024-02-16'),(5,301,'2024-02-16'),(5,302,'2024-02-16'),(5,303,'2024-02-16'),(5,401,'2024-02-16'),(5,402,'2024-02-16'),(5,403,'2024-02-16');
/*!40000 ALTER TABLE `list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `num` int NOT NULL COMMENT '학생번호',
  `name` varchar(10) NOT NULL COMMENT '학생이름',
  `gender` char(1) NOT NULL COMMENT '성별(남,여)',
  `birth` date NOT NULL COMMENT '생일(yyyy-mm-dd)',
  `dept` varchar(10) NOT NULL COMMENT '학과',
  `credit` int NOT NULL DEFAULT '18' COMMENT '최대이수학점'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'이승수','남','1989-01-13','기계공학과',18),(2,'변진석','남','2001-07-11','정보통신공학과',18),(3,'이수정','여','2000-08-04','언론정보전공',18),(4,'오서진','여','2001-09-10','컴퓨터공학과',18),(5,'웨이얀표','남','1996-05-22','경영학과',18);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subject`
--

DROP TABLE IF EXISTS `subject`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subject` (
  `sub_num` int NOT NULL COMMENT '과목번호',
  `sub_name` varchar(10) NOT NULL COMMENT '과목이름',
  `sub_person` int NOT NULL COMMENT '수강인원',
  `sub_credit` int NOT NULL COMMENT '학점',
  `sub_professor` varchar(10) NOT NULL COMMENT '담당교수'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subject`
--

LOCK TABLES `subject` WRITE;
/*!40000 ALTER TABLE `subject` DISABLE KEYS */;
/*!40000 ALTER TABLE `subject` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-16 17:46:42
