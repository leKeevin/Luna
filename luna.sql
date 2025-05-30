-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 30-05-2025 a las 03:36:43
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `joyeria_luna`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

DROP TABLE IF EXISTS `carrito`;
CREATE TABLE IF NOT EXISTS `carrito` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `cantidad` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo` text NOT NULL,
  `nombre` text NOT NULL,
  `precio` float NOT NULL,
  `cantidad` float NOT NULL,
  `material` text NOT NULL,
  `descripcion` text,
  `imagen_nombre` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `tipo`, `nombre`, `precio`, `cantidad`, `material`, `descripcion`, `imagen_nombre`) VALUES
(1, 'Anillo', 'Anillo de compromiso', 1500, 5, 'Oro blanco', 'Anillo con diamante de 0.3 quilates', NULL),
(2, 'Collar', 'Collar Corazón', 900, 10, 'Plata', 'Collar en forma de corazón con incrustaciones de zirconia', NULL),
(3, 'Pulsera', 'Pulsera de eslabones', 1200, 3, 'Oro', 'Pulsera clásica de eslabones dorados', 'pulsera_eslabones.jpg'),
(4, 'Aretes', 'Aretes Luna', 600, 8, 'Plata', 'Aretes pequeños con forma de luna', NULL),
(5, 'Anillo', 'Anillo de promesa', 800, 10, 'Plata', 'Anillo con grabado \"Te amo\" y zirconia cúbica.', 'anillo_promesa.jpg'),
(6, 'Anillo', 'Anillo con esmeralda', 2200, 4, 'Oro amarillo', 'Anillo con esmeralda colombiana de 0.5 quilates.', 'anillo_esmeralda.jpg'),
(7, 'Anillo', 'Anillo de eternidad', 2500, 3, 'Platino', 'Anillo con incrustaciones de diamantes en todo el contorno.', 'anillo_eternidad.jpg'),
(8, 'Pulsera', 'Pulsera de eslabones', 950, 7, 'Acero inoxidable', 'Pulsera estilo cubano con cierre magnético.', 'pulsera_eslabones.jpg'),
(9, 'Pulsera', 'Pulsera con charms', 700, 8, 'Plata', 'Pulsera con dijes de corazón, estrella y luna.', 'pulsera_charms.jpg'),
(10, 'Pulsera', 'Pulsera minimalista', 350, 12, 'Cuero y acero', 'Pulsera delgada negra con broche ajustable.', 'pulsera_minimalista.jpg'),
(11, 'Collar', 'Collar con dije de luna', 980, 5, 'Oro rosado', 'Collar fino con colgante en forma de luna creciente.', 'collar_luna.jpg'),
(12, 'Collar', 'Gargantilla estilo vintage', 1350, 6, 'Plata', 'Gargantilla con filigrana y piedra amatista.', 'gargantilla_vintage.jpg'),
(13, 'Collar', 'Collar doble cadena', 1100, 4, 'Oro laminado', 'Collar con dos niveles y dijes de hoja y estrella.', 'collar_doble.jpg'),
(14, 'Aretes', 'Aretes de perlas', 750, 9, 'Oro blanco', 'Aretes de perlas cultivadas con base dorada.', 'aretes_perlas.jpg'),
(15, 'Aretes', 'Aretes largos con cristales', 980, 5, 'Acero', 'Aretes colgantes con cristales Swarovski.', 'aretes_cristales.jpg'),
(16, 'Aretes', 'Aretes pequeños en forma de flor', 400, 10, 'Plata', 'Aretes con diseño floral y piedra central rosa.', 'aretes_flor.jpg'),
(17, 'Broche', 'Broche mariposa esmaltada', 620, 3, 'Plata', 'Broche esmaltado a mano con detalles dorados.', 'broche_mariposa.jpg'),
(18, 'Broche', 'Broche vintage', 890, 2, 'Cobre antiguo', 'Broche con camafeo clásico y detalles florales.', 'broche_vintage.jpg'),
(19, 'Tobillera', 'Tobillera con dijes', 500, 6, 'Acero', 'Tobillera con pequeños dijes de playa.', 'tobillera_dijes.jpg'),
(20, 'Tobillera', 'Tobillera con cuentas', 430, 7, 'Cuerda y metal', 'Tobillera colorida con cuentas de madera.', 'tobillera_cuentas.jpg'),
(21, 'Anillo', 'Anillo trenzado', 620, 6, 'Plata', 'Diseño entrelazado pulido, elegante y moderno.', 'anillo_trenzado.jpg'),
(22, 'Anillo', 'Anillo vikingo', 780, 4, 'Acero negro', 'Anillo grueso con runas grabadas.', 'anillo_vikingo.jpg'),
(23, 'Collar', 'Collar infinito', 980, 5, 'Oro blanco', 'Dije en forma de infinito con circonias.', 'collar_infinito.jpg'),
(24, 'Collar', 'Collar piedra lunar', 870, 4, 'Plata', 'Dije redondo con piedra lunar iridiscente.', 'collar_piedra_lunar.jpg'),
(25, 'Pulsera', 'Pulsera de nudos', 300, 9, 'Hilo y cuentas', 'Pulsera tejida a mano con nudos de macramé.', 'pulsera_nudos.jpg'),
(26, 'Aretes', 'Aretes geométricos', 620, 8, 'Acero dorado', 'Diseño moderno en forma triangular.', 'aretes_geometricos.jpg'),
(27, 'Aretes', 'Aretes colgantes con cadenas', 750, 5, 'Plata', 'Cadenas múltiples que cuelgan del lóbulo.', 'aretes_cadenas.jpg'),
(28, 'Broche', 'Broche de rosa con cristales', 1000, 3, 'Oro rosado', 'Flor tridimensional con cristales.', 'broche_rosa.jpg'),
(29, 'Pulsera', 'Pulsera con perlas cultivadas', 1250, 4, 'Oro amarillo', 'Elegante diseño con cierre oculto.', 'pulsera_perlas.jpg'),
(30, 'Anillo', 'Anillo de sello personalizado', 1050, 3, 'Plata', 'Personalizable con inicial o símbolo.', 'anillo_sello.jpg'),
(31, 'Collar', 'Collar con nombre personalizado', 1350, 6, 'Acero dorado', 'Dije con nombre grabado en cursiva.', 'collar_nombre.jpg'),
(32, 'Tobillera', 'Tobillera con piedras naturales', 620, 7, 'Hilo y piedras', 'Piedras de amatista, jade y cuarzo.', 'tobillera_piedras.jpg'),
(33, 'Aretes', 'Aretes de estrella y luna', 680, 5, 'Plata', 'Juego asimétrico, una estrella y una luna.', 'aretes_estrella_luna.jpg'),
(34, 'Anillo', 'Anillo con piedra ónix', 790, 5, 'Acero', 'Piedra negra engarzada en estilo elegante.', 'anillo_onix.jpg'),
(35, 'Pulsera', 'Pulsera de esferas magnéticas', 890, 5, 'Titanio', 'Estilo terapéutico con diseño masculino.', 'pulsera_magnetica.jpg'),
(36, 'Broche', 'Broche de colibrí con esmalte', 720, 3, 'Plata y esmalte', 'Diseño artístico con colores vivos.', 'broche_colibri.jpg'),
(37, 'Collar', 'Choker negro con dije dorado', 420, 10, 'Tela y metal', 'Estilo moderno y juvenil.', 'choker_negro.jpg'),
(38, 'Aretes', 'Aretes de aro', 500, 8, 'Oro laminado', 'Aros medianos, básicos y elegantes.', 'aretes_aro.jpg'),
(39, 'Anillo', 'Anillo flor de loto', 980, 4, 'Plata', 'Diseño inspirado en el misticismo oriental.', 'anillo_loto.jpg'),
(40, 'Pulsera', 'Pulsera rígida martillada', 670, 6, 'Latón', 'Efecto martillado y forma ovalada.', 'pulsera_martillada.jpg'),
(41, 'Collar', 'Collar con llave antigua', 930, 4, 'Bronce', 'Estilo steampunk con cadena larga.', 'collar_llave.jpg'),
(42, 'Broche', 'Broche de gato', 620, 5, 'Plata', 'Con forma de gato sentado, ojos verdes.', 'broche_gato.jpg'),
(43, 'Tobillera', 'Tobillera con estrella de mar', 450, 7, 'Acero y cuerda', 'Ideal para look veraniego.', 'tobillera_estrella_mar.jpg'),
(44, 'Aretes', 'Aretes de corazón con rubí', 1150, 3, 'Oro blanco', 'Corazones pequeños con rubíes sintéticos.', 'aretes_rubi.jpg'),
(45, 'Anillo', 'Anillo ajustable', 350, 10, 'Acero', 'Para cualquier medida de dedo, estilo simple.', 'anillo_ajustable.jpg'),
(46, 'Collar', 'Collar estilo bohemio', 700, 6, 'Hilo y piedras', 'Diseño con turquesa y cuentas talladas.', 'collar_bohemio.jpg'),
(47, 'Pulsera', 'Pulsera con doble vuelta', 800, 4, 'Cuero trenzado', 'Se enrolla dos veces con broche metálico.', 'pulsera_doble.jpg'),
(48, 'Aretes', 'Aretes de hojas doradas', 620, 6, 'Acero dorado', 'Hojas largas con acabado brillante.', 'aretes_hojas.jpg'),
(49, 'Broche', 'Broche con iniciales', 530, 5, 'Acero', 'Se personaliza con letra elegida.', 'broche_inicial.jpg'),
(50, 'Collar', 'Collar cruz con cristales', 850, 4, 'Plata', 'Cruz latina con pequeñas circonias blancas.', 'collar_cruz.jpg'),
(51, 'Tobillera', 'Tobillera de corazones', 480, 7, 'Acero', 'Con dijes pequeños en forma de corazón.', 'tobillera_corazones.jpg'),
(52, 'Anillo', 'Anillo de pareja grabado', 1500, 6, 'Acero', 'Grabado \"Siempre juntos\" en ambos lados.', 'anillo_pareja.jpg'),
(53, 'Collar', 'Collar con medallón', 1300, 4, 'Oro amarillo', 'Medallón redondo, se puede abrir.', 'collar_medallon.jpg'),
(54, 'Aretes', 'Aretes tipo ear cuff', 590, 8, 'Plata', 'Se ajustan a la oreja sin perforación.', 'aretes_earcuff.jpg'),
(55, 'Pulsera', 'Pulsera triple hilo', 520, 9, 'Cuerda y acero', 'Tres colores entrelazados con dije central.', 'pulsera_triple.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

DROP TABLE IF EXISTS `rol`;
CREATE TABLE IF NOT EXISTS `rol` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`, `descripcion`) VALUES
(1, 'cliente', 'Puede comprar productos y consultar sus pedidos'),
(2, 'empleado', 'Puede gestionar productos y ventas'),
(3, 'administrador', 'Acceso total excepto contraseñas de otros usuarios');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_rol` bigint NOT NULL,
  `nombre` text NOT NULL,
  `correo` text NOT NULL,
  `telefono` text NOT NULL,
  `contra` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `venta`
--

DROP TABLE IF EXISTS `venta`;
CREATE TABLE IF NOT EXISTS `venta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `fecha` date NOT NULL,
  `cantidad` float NOT NULL,
  `monto` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_producto` (`id_producto`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Filtros para la tabla `venta`
--
ALTER TABLE `venta`
  ADD CONSTRAINT `venta_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `venta_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
