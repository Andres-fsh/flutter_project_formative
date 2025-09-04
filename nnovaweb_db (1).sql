-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-09-2025 a las 22:29:43
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nnovaweb_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `applicationforms`
--

CREATE TABLE `applicationforms` (
  `id` int(11) NOT NULL,
  `userType` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `identificationType` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `fkIdTypeForms` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoriesnews`
--

CREATE TABLE `categoriesnews` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consultancies`
--

CREATE TABLE `consultancies` (
  `id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fkIdUsers` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informationsennovas`
--

CREATE TABLE `informationsennovas` (
  `id` int(11) NOT NULL,
  `mision` varchar(255) DEFAULT NULL,
  `vision` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `staff` varchar(255) DEFAULT NULL,
  `lineSennova` varchar(255) DEFAULT NULL,
  `ourServices` varchar(255) DEFAULT NULL,
  `updateDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `linessennovas`
--

CREATE TABLE `linessennovas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `fkIdUsers` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `fkIdCategoriesNews` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projectsennovas`
--

CREATE TABLE `projectsennovas` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `startDate` datetime DEFAULT NULL,
  `endDate` datetime DEFAULT NULL,
  `fkIdConsultancies` int(11) DEFAULT NULL,
  `fkIdLinesSennova` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `projectsmonitorings`
--

CREATE TABLE `projectsmonitorings` (
  `id` int(11) NOT NULL,
  `phase` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `registrationDate` datetime DEFAULT NULL,
  `fkIdUsers` int(11) DEFAULT NULL,
  `fkIdProjectSennova` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Aministrador', 'Actualiza toda la información', '2025-09-04 20:27:00', '2025-09-04 20:27:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `satisfactionsurveys`
--

CREATE TABLE `satisfactionsurveys` (
  `id` int(11) NOT NULL,
  `surveyOne` text DEFAULT NULL,
  `surveyTwo` text DEFAULT NULL,
  `surveyThree` text DEFAULT NULL,
  `surveyFour` text DEFAULT NULL,
  `surveyFive` text DEFAULT NULL,
  `surveySix` text DEFAULT NULL,
  `surveySeven` text DEFAULT NULL,
  `surveyEight` text DEFAULT NULL,
  `observations` text DEFAULT NULL,
  `fkIdTypeForms` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Volcado de datos para la tabla `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20250902143157-create-information-sennova.js'),
('20250902151204-create-roles.js'),
('20250902162932-create-categories-news.js'),
('20250902162944-create-news.js'),
('20250902162959-create-users.js'),
('20250902163008-create-consultancies.js'),
('20250902163018-create-lines-sennova.js'),
('20250902163129-create-type-forms.js'),
('20250902163626-create-project-sennova.js'),
('20250902163650-create-application-forms.js'),
('20250902163703-create-satisfaction-survey.js'),
('20250902163719-create-projects-monitoring.js'),
('20250904195539-add-role-association-to-users.js');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `typeforms`
--

CREATE TABLE `typeforms` (
  `id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `fkIdLinesSennova` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `phone` int(11) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `fkIdRoles` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `userName`, `password`, `email`, `name`, `lastName`, `phone`, `photo`, `fkIdRoles`, `createdAt`, `updatedAt`) VALUES
(4, 'johndoe', 'password123', 'john.doe@example.com', 'John', 'Doe', 123456789, 'http://example.com/photo.jpg', 1, '2025-09-04 20:27:14', '2025-09-04 20:27:14');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `applicationforms`
--
ALTER TABLE `applicationforms`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categoriesnews`
--
ALTER TABLE `categoriesnews`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `consultancies`
--
ALTER TABLE `consultancies`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `informationsennovas`
--
ALTER TABLE `informationsennovas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `linessennovas`
--
ALTER TABLE `linessennovas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `projectsennovas`
--
ALTER TABLE `projectsennovas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `projectsmonitorings`
--
ALTER TABLE `projectsmonitorings`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `satisfactionsurveys`
--
ALTER TABLE `satisfactionsurveys`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indices de la tabla `typeforms`
--
ALTER TABLE `typeforms`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_roles` (`fkIdRoles`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `applicationforms`
--
ALTER TABLE `applicationforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categoriesnews`
--
ALTER TABLE `categoriesnews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `consultancies`
--
ALTER TABLE `consultancies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `informationsennovas`
--
ALTER TABLE `informationsennovas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `linessennovas`
--
ALTER TABLE `linessennovas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `projectsennovas`
--
ALTER TABLE `projectsennovas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `projectsmonitorings`
--
ALTER TABLE `projectsmonitorings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `satisfactionsurveys`
--
ALTER TABLE `satisfactionsurveys`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `typeforms`
--
ALTER TABLE `typeforms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_users_roles` FOREIGN KEY (`fkIdRoles`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
