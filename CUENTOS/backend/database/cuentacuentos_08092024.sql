CREATE DATABASE  IF NOT EXISTS `cuentacuentos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cuentacuentos`;
-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cuentacuentos
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UIBook` varchar(255) NOT NULL,
  `UIUser` varchar(255) NOT NULL,
  `Title` varchar(80) NOT NULL,
  `Sinopsis` longtext DEFAULT NULL,
  `Tags` longtext DEFAULT NULL,
  `UICategory` varchar(255) DEFAULT NULL,
  `Cover` longtext DEFAULT NULL,
  `Pages` int(11) DEFAULT NULL,
  `Created_At` datetime DEFAULT current_timestamp(),
  `Views` int(11) DEFAULT 0,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UIBook_UNIQUE` (`UIBook`),
  KEY `category_idx` (`UICategory`),
  KEY `bookuser_idx` (`UIUser`),
  CONSTRAINT `bookuser` FOREIGN KEY (`UIUser`) REFERENCES `users` (`UIUser`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `category` FOREIGN KEY (`UICategory`) REFERENCES `categories` (`UICategory`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (11,'e68759a4-6df3-11ef-8a50-a036bcb7cc40','d5e6400f-6875-11ef-ad79-a036bcb7cc40','La Biblioteca de los Mil Sueños','En un pequeño pueblo, Lúcas, un joven apasionado por los libros, crea una web llamada \"La Biblioteca de los Mil Sueños\", donde las personas pueden escribir y ver cómo sus historias cobran vida. Sin embargo, su proyecto desata una antigua magia que comienza a romper la barrera entre la realidad y la fantasía. Los personajes de los libros empiezan a aparecer en el mundo real, creando caos y confusión. Guiado por el misterioso Guardián de las Historias, Lúcas emprende un viaje a través de los mundos que creó, destruyendo las anclas que los unen a la realidad. Finalmente, debe tomar una decisión dolorosa para restaurar el equilibrio y cerrar la puerta que abrió.','Fantasía,Aventura,Misterio y Suspenso,Magia,Ficción,Cuentos','74be25ae-6881-11ef-ad79-a036bcb7cc40','ec3cc392bfbea09ae81ab6cbae12041c3e63ce22a6b5a7b6f0d98056b317c92c.jpeg',102,'2024-09-08 17:06:18',2),(12,'7fa65d9a-6df9-11ef-8a50-a036bcb7cc40','3ffd54af-6876-11ef-ad79-a036bcb7cc40','El Guardián del Silencio','En el lejano reino de Morval, una tierra envuelta en misterio y magia antigua, los habitantes han vivido durante siglos bajo la sombra de un bosque oscuro conocido como El Bosque del Silencio. Este bosque esconde secretos prohibidos, habitado por criaturas cuya existencia ha sido olvidada por la mayoría. Los aldeanos lo evitan, pero una maldición ancestral ha comenzado a despertar, extendiendo sus raíces desde las profundidades del bosque hacia la aldea de Erindale.\r\n\r\nCuando jóvenes desaparecen sin dejar rastro, un grupo de valientes aventureros decide adentrarse en el bosque para desentrañar el misterio. Entre ellos se encuentra Alaric, un cazador que guarda un secreto doloroso, y Elowen, una hechicera con un poder oscuro. A medida que se adentran en el corazón del bosque, se encuentran con fuerzas mucho más allá de su comprensión, enfrentándose a horrores inimaginables y a la posibilidad de que ninguno de ellos regrese con vida.','Terror,Fantasía,Aventuras oscuras,Espiritus malignos,Magia prohibida,Misterio y Suspenso','74be25d8-6881-11ef-ad79-a036bcb7cc40','0c5ceab0292c3a557d44a730986a91e26a74c544eb08f32f29f905738753d785.jpeg',170,'2024-09-08 17:46:22',2);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UICategory` varchar(255) DEFAULT NULL,
  `Name` longtext NOT NULL,
  `Max_Pages` int(11) DEFAULT NULL,
  `Min_Pages` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UICategory_UNIQUE` (`UICategory`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'74be1b7a-6881-11ef-ad79-a036bcb7cc40','Novela',400,300),(2,'74be24c3-6881-11ef-ad79-a036bcb7cc40','Ensayo corto',120,80),(3,'74be251d-6881-11ef-ad79-a036bcb7cc40','Libro de autoayuda',280,200),(4,'74be2553-6881-11ef-ad79-a036bcb7cc40','Biografía',600,440),(5,'74be2582-6881-11ef-ad79-a036bcb7cc40','Libros ilustrados',48,36),(6,'74be25ae-6881-11ef-ad79-a036bcb7cc40','Primeros lectores',120,84),(7,'74be25d8-6881-11ef-ad79-a036bcb7cc40','Novelas juveniles',200,140),(8,'74be2601-6881-11ef-ad79-a036bcb7cc40','Tesis',300,200),(9,'74be262f-6881-11ef-ad79-a036bcb7cc40','Colección de poemas',200,125);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UIBook` varchar(255) NOT NULL,
  `UIUser` varchar(255) NOT NULL,
  `Comment` text NOT NULL,
  `Rating` int(11) DEFAULT NULL CHECK (`Rating` >= 1 and `Rating` <= 5),
  `Created_at` datetime NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`Id`),
  KEY `bookcomments` (`UIBook`),
  KEY `usercomments` (`UIUser`),
  CONSTRAINT `bookcomments` FOREIGN KEY (`UIBook`) REFERENCES `books` (`UIBook`) ON DELETE CASCADE,
  CONSTRAINT `usercomments` FOREIGN KEY (`UIUser`) REFERENCES `users` (`UIUser`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (5,'7fa65d9a-6df9-11ef-8a50-a036bcb7cc40','d5e6400f-6875-11ef-ad79-a036bcb7cc40','Que libro mas chulo está quedando :)',NULL,'2024-09-08 17:52:56');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UIPage` varchar(255) NOT NULL,
  `UIBook` varchar(255) NOT NULL,
  `UIUser` varchar(255) NOT NULL,
  `Content` text NOT NULL,
  `PageNumber` int(10) unsigned NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `book_idx` (`UIBook`),
  KEY `user_idx` (`UIUser`),
  CONSTRAINT `book` FOREIGN KEY (`UIBook`) REFERENCES `books` (`UIBook`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `pageuser` FOREIGN KEY (`UIUser`) REFERENCES `users` (`UIUser`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (49,'c46ce0f4-6df5-11ef-8a50-a036bcb7cc40','e68759a4-6df3-11ef-8a50-a036bcb7cc40','d5e6400f-6875-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"insert\":\"asdsad\\n\"}]}',1),(50,'c46d59dd-6df5-11ef-8a50-a036bcb7cc40','e68759a4-6df3-11ef-8a50-a036bcb7cc40','d5e6400f-6875-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"insert\":\"asdsadsadsadsad\\n\"}]}',2),(51,'439a2a32-6df6-11ef-8a50-a036bcb7cc40','e68759a4-6df3-11ef-8a50-a036bcb7cc40','d5e6400f-6875-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"insert\":\"sadsadsad\\n\"}]}',3),(52,'f5cbdcb3-6df9-11ef-8a50-a036bcb7cc40','7fa65d9a-6df9-11ef-8a50-a036bcb7cc40','3ffd54af-6876-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"attributes\":{\"size\":\"huge\",\"font\":\"monospace\",\"bold\":true},\"insert\":\"CAPITULO 1\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"size\":\"large\",\"font\":\"monospace\",\"italic\":true},\"insert\":\"La Sombra del Bosque del Silencio\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"En el reino de Morval, el Bosque del Silencio es m\\u00e1s que un simple lugar; es un territorio donde la luz rara vez penetra y donde la esperanza se desvanece. La aldea de Erindale ha estado a la sombra de este bosque durante generaciones, y los aldeanos han aprendido a respetar sus l\\u00edmites. \"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Sin embargo, cuando tres j\\u00f3venes desaparecen en circunstancias misteriosas, el miedo se convierte en p\\u00e1nico. Los rumores sobre la reactivaci\\u00f3n de una antigua maldici\\u00f3n se esparcen como fuego, y los m\\u00e1s viejos en la aldea recuerdan cuentos aterradores de seres que habitan en las profundidades del bosque.\"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Alaric, un cazador con una dolorosa p\\u00e9rdida en su pasado, siente la obligaci\\u00f3n de actuar. Sus pesadillas recurrentes, en las que escucha voces que lo llaman desde el bosque, lo han atormentado durante semanas.\"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"A pesar de las advertencias, decide reunir un grupo de voluntarios para adentrarse en el Bosque del Silencio y encontrar a los desaparecidos, o al menos descubrir qu\\u00e9 los acecha.\"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\"}]}',1),(53,'f5cc48ab-6df9-11ef-8a50-a036bcb7cc40','7fa65d9a-6df9-11ef-8a50-a036bcb7cc40','3ffd54af-6876-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"attributes\":{\"size\":\"huge\",\"font\":\"monospace\",\"bold\":true},\"insert\":\"CAPITULO 2\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"size\":\"large\",\"font\":\"monospace\",\"italic\":true},\"insert\":\"Los Susurros de los \\u00c1rboles\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"insert\":\"El viaje hacia el bosque comienza en silencio, pero pronto los susurros de las hojas y los crujidos de las ramas se convierten en una siniestra cacofon\\u00eda que rodea a los aventureros. Alaric lidera el grupo, pero no puede evitar sentir que algo los est\\u00e1 observando desde la oscuridad. \"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\\n\"},{\"insert\":\"Elowen, la hechicera, percibe una presencia oscura que parece seguir cada uno de sus movimientos. Los \\u00e1rboles, antiguos y retorcidos, parecen estar vivos, sus ramas extendi\\u00e9ndose como garras, sus ra\\u00edces pulsando con energ\\u00eda maligna.\"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\\n\"},{\"insert\":\"A medida que el grupo avanza, encuentran rastros de los desaparecidos: un colgante abandonado, marcas de lucha, pero ning\\u00fan cuerpo. Los susurros aumentan en intensidad, y Alaric comienza a escuchar su nombre en la voz de su difunta esposa, que muri\\u00f3 misteriosamente en el mismo bosque a\\u00f1os atr\\u00e1s. \"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\\n\"},{\"insert\":\"La realidad y la locura comienzan a mezclarse, y el grupo empieza a dudar de lo que es real y lo que es una ilusi\\u00f3n creada por el bosque.\"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\"}]}',2),(54,'f5cc9841-6df9-11ef-8a50-a036bcb7cc40','7fa65d9a-6df9-11ef-8a50-a036bcb7cc40','3ffd54af-6876-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"attributes\":{\"size\":\"huge\",\"font\":\"monospace\",\"bold\":true},\"insert\":\"CAPITULO 3\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\",\"size\":\"large\",\"italic\":true},\"insert\":\"La Maldici\\u00f3n Despertada\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"El grupo llega a un claro donde descubren un antiguo altar, cubierto de runas que nadie puede leer excepto Elowen. La hechicera revela que el altar es parte de un antiguo ritual dise\\u00f1ado para sellar a una entidad maligna dentro del bosque. \"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Sin embargo, con el paso del tiempo, el sello se ha debilitado, permitiendo que la maldici\\u00f3n se extienda nuevamente. La entidad, conocida como \\\"El Guardi\\u00e1n del Silencio\\\", es un ser que se alimenta del miedo y la desesperaci\\u00f3n, y ha estado cazando a los aldeanos para recuperar su poder.\"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Elowen intenta reforzar el sello, pero el Guardi\\u00e1n se manifiesta, un ser espectral de sombras y ojos brillantes que destila puro terror. La presencia del Guardi\\u00e1n desata los peores miedos de cada miembro del grupo, haci\\u00e9ndolos revivir sus traumas m\\u00e1s profundos. \"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Para Alaric, es la visi\\u00f3n de su esposa llam\\u00e1ndolo desde el abismo; para otros, son horrores a\\u00fan m\\u00e1s personales. La lucha se convierte en una batalla no solo por la supervivencia f\\u00edsica, sino por la cordura\"},{\"insert\":\".\"},{\"attributes\":{\"align\":\"justify\"},\"insert\":\"\\n\"}]}',3),(55,'359aa4ee-6dfa-11ef-8a50-a036bcb7cc40','7fa65d9a-6df9-11ef-8a50-a036bcb7cc40','d5e6400f-6875-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"attributes\":{\"size\":\"huge\",\"font\":\"monospace\",\"bold\":true},\"insert\":\"CAPITULO 4\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\",\"size\":\"large\",\"italic\":true},\"insert\":\"Los Esp\\u00edritus de los Ca\\u00eddos\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"El grupo, ahora disminuido, descubre que los desaparecidos no est\\u00e1n muertos, sino atrapados en un estado de no-muerte, sirviendo al Guardi\\u00e1n como sus lacayos. Los esp\\u00edritus de los j\\u00f3venes se materializan, atacando a los aventureros con una ferocidad sobrenatural. \"},{\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Entre ellos, Alaric reconoce a su esposa, transformada en una sombra vengativa. Desgarrado entre el amor y el deber, Alaric lucha para liberar a su esposa de su maldici\\u00f3n, pero cada enfrentamiento debilita su esp\\u00edritu.\"},{\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Elowen, en un \\u00faltimo intento desesperado, utiliza una magia prohibida que amenaza con consumirla. Invoca a los antiguos guardianes del bosque, esp\\u00edritus benignos que alguna vez protegieron el equilibrio de la naturaleza. Estos esp\\u00edritus luchan contra el Guardi\\u00e1n del Silencio, pero el costo es alto. \"},{\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"La magia oscura consume a Elowen, y el bosque comienza a desmoronarse, atrapando a todos los que est\\u00e1n dentro en una prisi\\u00f3n eterna.\"},{\"insert\":\"\\n\"}]}',4),(56,'359afbb9-6dfa-11ef-8a50-a036bcb7cc40','7fa65d9a-6df9-11ef-8a50-a036bcb7cc40','d5e6400f-6875-11ef-ad79-a036bcb7cc40','{\"ops\":[{\"attributes\":{\"font\":\"monospace\",\"size\":\"huge\",\"bold\":true},\"insert\":\"CAPITULO 5\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\",\"size\":\"large\",\"italic\":true},\"insert\":\"El \\u00daltimo Suspiro del Silencio\"},{\"attributes\":{\"align\":\"center\",\"header\":4},\"insert\":\"\\n\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"En el enfrentamiento final, Alaric se enfrenta cara a cara con el Guardi\\u00e1n del Silencio, ahora debilitado pero a\\u00fan mortalmente peligroso. \"},{\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Con la ayuda de los esp\\u00edritus de los guardianes, logra destruir el altar, rompiendo el v\\u00ednculo entre el Guardi\\u00e1n y el bosque. Sin embargo, la victoria no es sin consecuencias. Elowen desaparece, absorbida por la magia que liber\\u00f3, y el bosque, sin su fuente de oscuridad, comienza a morir.\"},{\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Alaric, el \\u00fanico sobreviviente, regresa a la aldea, marcado por cicatrices tanto f\\u00edsicas como emocionales. \"},{\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"El Bosque del Silencio, ahora convertido en un campo de \\u00e1rboles muertos, sigue siendo un recordatorio de los horrores que una vez habit\\u00f3. Pero con la muerte del Guardi\\u00e1n, la maldici\\u00f3n se rompe, y la aldea finalmente puede vivir sin miedo.\"},{\"insert\":\"\\n\"},{\"attributes\":{\"font\":\"monospace\"},\"insert\":\"Sin embargo, Alaric sabe que algunos secretos nunca deber\\u00edan haber sido revelados, y aunque el Guardi\\u00e1n ha sido derrotado, siente que algo a\\u00fan lo observa desde las sombras, esperando el momento oportuno para regresar.\"},{\"insert\":\"\\n\"}]}',5);
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) NOT NULL,
  `UITag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name` (`Name`),
  UNIQUE KEY `UITag_UNIQUE` (`UITag`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (1,'Ficción','c38a542d-6d34-11ef-94dc-a036bcb7cc40'),(2,'No Ficción','c38a84f1-6d34-11ef-94dc-a036bcb7cc40'),(3,'Poesía','c38a8560-6d34-11ef-94dc-a036bcb7cc40'),(4,'Drama','c38a8596-6d34-11ef-94dc-a036bcb7cc40'),(5,'Ficción Histórica','c38a85cc-6d34-11ef-94dc-a036bcb7cc40'),(6,'Ciencia Ficción','c38a8605-6d34-11ef-94dc-a036bcb7cc40'),(7,'Fantasía','c38a8633-6d34-11ef-94dc-a036bcb7cc40'),(8,'Romance','c38a8664-6d34-11ef-94dc-a036bcb7cc40'),(9,'Terror','c38a8695-6d34-11ef-94dc-a036bcb7cc40'),(10,'Misterio y Suspenso','c38a86c3-6d34-11ef-94dc-a036bcb7cc40'),(11,'Aventura','c38a86f0-6d34-11ef-94dc-a036bcb7cc40'),(12,'Fábula','c38a871c-6d34-11ef-94dc-a036bcb7cc40'),(13,'Mitología','c38a874c-6d34-11ef-94dc-a036bcb7cc40'),(14,'Biografía','c38a877a-6d34-11ef-94dc-a036bcb7cc40'),(15,'Autobiografía','c38a87a5-6d34-11ef-94dc-a036bcb7cc40'),(16,'Ensayo','c38a87cf-6d34-11ef-94dc-a036bcb7cc40'),(17,'Crónica','c38a87fd-6d34-11ef-94dc-a036bcb7cc40'),(18,'Cuento','c38a882c-6d34-11ef-94dc-a036bcb7cc40'),(19,'Narrativa','c38a885a-6d34-11ef-94dc-a036bcb7cc40'),(20,'Memorias','c38a8887-6d34-11ef-94dc-a036bcb7cc40');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UIUser` varchar(255) NOT NULL,
  `Username` longtext NOT NULL,
  `Password` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Image` text DEFAULT NULL,
  `Token` varchar(255) DEFAULT NULL,
  `Token_created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `UIUser_UNIQUE` (`UIUser`),
  UNIQUE KEY `token_UNIQUE` (`Token`),
  UNIQUE KEY `Username` (`Username`) USING HASH,
  UNIQUE KEY `Email` (`Email`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'d5e6400f-6875-11ef-ad79-a036bcb7cc40','Vampy','$2y$10$RBNPDXyZtz7bLf77q2/AMO37K6SdsJgjyX.S5f0nLk.B1H2PX1uyO','cpr.1992@gmail.com','e10163e9b623b5276b3058a59ada4485fa4e6f630bda616ed0de8d8fe487133c.png',NULL,NULL),(2,'3ffd54af-6876-11ef-ad79-a036bcb7cc40','Franky','$2y$10$H4Sr.xswtY.xkHWrb.9mt..w08630rW4mraeVxa/nB7x4BDOlDj22','franky@gmail.com','f036dd2ff1d93b3b84472106ff745f5a5a6c3c76b1c7b5c69b3a4efc005bf4e2.png',NULL,NULL),(3,'f16b5af0-6877-11ef-ad79-a036bcb7cc40','Mummy','$2y$10$/.lzjOJEf5jWELL0mSV7A.D5LvDB0.FTcOkdkvxT2PZWHFRhh4njK','mummy@gmail.com','0cb2ad0ee991a0f72b575c8cb338648fc6986675c7c0ae11a83c4bfbfdc5b8f1.png',NULL,NULL),(4,'a938b65f-6d2c-11ef-94dc-a036bcb7cc40','Anakarina','$2y$10$ngdqh0OLcv9eenRR6KZ0KeL8tqoAdfyNC7PfSUM5m0cJDdzwaN2/S','anna9545rt@gmail.com','50d56dce514d95656b8fbf92ae8fbf4016d2d6c80550d59ed66dbb79e28a2d50.png',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-08 17:55:04
