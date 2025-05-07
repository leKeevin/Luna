-- Base de datos: `joyeria_luna`

CREATE DATABASE IF NOT EXISTS `joyeria_luna`;
USE `joyeria_luna`;

-- --------------------------------------------------------
-- Tabla: rol
-- --------------------------------------------------------

CREATE TABLE `rol` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` text NOT NULL,
  `descripcion` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `rol` (`id`, `nombre`, `descripcion`) VALUES
(1, 'cliente', 'Puede comprar productos y consultar sus pedidos'),
(2, 'empleado', 'Puede gestionar productos y ventas'),
(3, 'administrador', 'Acceso total excepto contraseñas de otros usuarios');

-- --------------------------------------------------------
-- Tabla: usuario
-- --------------------------------------------------------

CREATE TABLE `usuario` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_rol` bigint NOT NULL,
  `nombre` text NOT NULL,
  `correo` text NOT NULL,
  `telefono` text NOT NULL,
  `contra` text NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Tabla: producto
-- --------------------------------------------------------

CREATE TABLE `producto` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `tipo` text NOT NULL, -- Anillo, Collar, Pulsera...
  `nombre` text NOT NULL,
  `precio` float NOT NULL,
  `cantidad` float NOT NULL,
  `material` text NOT NULL, -- Oro, Plata, Acero inoxidable...
  `descripcion` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `producto` (`tipo`, `nombre`, `precio`, `cantidad`, `material`, `descripcion`) VALUES
('Anillo', 'Anillo de compromiso', 1500, 5, 'Oro blanco', 'Anillo con diamante de 0.3 quilates'),
('Collar', 'Collar Corazón', 900, 10, 'Plata', 'Collar en forma de corazón con incrustaciones de zirconia'),
('Pulsera', 'Pulsera de eslabones', 1200, 3, 'Oro', 'Pulsera clásica de eslabones dorados'),
('Aretes', 'Aretes Luna', 600, 8, 'Plata', 'Aretes pequeños con forma de luna');

-- --------------------------------------------------------
-- Tabla: carrito
-- --------------------------------------------------------

CREATE TABLE `carrito` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `cantidad` float NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------
-- Tabla: venta
-- --------------------------------------------------------

CREATE TABLE `venta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `id_producto` bigint NOT NULL,
  `id_usuario` bigint NOT NULL,
  `fecha` DATE NOT NULL,
  `cantidad` float NOT NULL,
  `monto` float NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
