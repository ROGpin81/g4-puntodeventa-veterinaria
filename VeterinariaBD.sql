-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema VeterinariaBaseDatosPF
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema VeterinariaBaseDatosPF
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `VeterinariaBaseDatosPF` DEFAULT CHARACTER SET utf8mb3 ;
USE `VeterinariaBaseDatosPF` ;

-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`permisos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`permisos` (
  `idpermisos` INT NOT NULL AUTO_INCREMENT,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idpermisos`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`roles` (
  `id_rol` INT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`roles_has_permisos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`roles_has_permisos` (
  `roles_id_rol` INT NOT NULL AUTO_INCREMENT,
  `permisos_idpermisos` INT NOT NULL,
  PRIMARY KEY (`roles_id_rol`, `permisos_idpermisos`),
  INDEX `fk_roles_has_permisos_permisos1_idx` (`permisos_idpermisos` ASC) VISIBLE,
  INDEX `fk_roles_has_permisos_roles1_idx` (`roles_id_rol` ASC) VISIBLE,
  CONSTRAINT `fk_roles_has_permisos_permisos1`
    FOREIGN KEY (`permisos_idpermisos`)
    REFERENCES `VeterinariaBaseDatosPF`.`permisos` (`idpermisos`),
  CONSTRAINT `fk_roles_has_permisos_roles1`
    FOREIGN KEY (`roles_id_rol`)
    REFERENCES `VeterinariaBaseDatosPF`.`roles` (`id_rol`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`usuarios` (
  `idusuario` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`usuarios_has_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`usuarios_has_roles` (
  `usuarios_idusuario` INT NOT NULL AUTO_INCREMENT,
  `roles_id_rol` INT NOT NULL,
  PRIMARY KEY (`usuarios_idusuario`, `roles_id_rol`),
  INDEX `fk_usuarios_has_roles_roles1_idx` (`roles_id_rol` ASC) VISIBLE,
  INDEX `fk_usuarios_has_roles_usuarios_idx` (`usuarios_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_has_roles_roles1`
    FOREIGN KEY (`roles_id_rol`)
    REFERENCES `VeterinariaBaseDatosPF`.`roles` (`id_rol`),
  CONSTRAINT `fk_usuarios_has_roles_usuarios`
    FOREIGN KEY (`usuarios_idusuario`)
    REFERENCES `VeterinariaBaseDatosPF`.`usuarios` (`idusuario`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`CategoriaProducto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`CategoriaProducto` (
  `idCategorias` INT NOT NULL,
  `Nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCategorias`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`Producto` (
  `idProducto` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NOT NULL,
  `Descripcion` VARCHAR(100) NOT NULL,
  `Precio` INT NOT NULL,
  `Stock` INT NOT NULL,
  `CategoriaProducto_idCategorias` INT NOT NULL,
  PRIMARY KEY (`idProducto`, `CategoriaProducto_idCategorias`),
  INDEX `fk_Producto_CategoriaProducto1_idx` (`CategoriaProducto_idCategorias` ASC) VISIBLE,
  CONSTRAINT `fk_Producto_CategoriaProducto1`
    FOREIGN KEY (`CategoriaProducto_idCategorias`)
    REFERENCES `VeterinariaBaseDatosPF`.`CategoriaProducto` (`idCategorias`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`Cliente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`Cliente` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `Nombre` VARCHAR(45) NULL,
  `Telefono` INT NULL,
  PRIMARY KEY (`idCliente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`DetalleVenta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`DetalleVenta` (
  `idDetalleVenta` INT NOT NULL AUTO_INCREMENT,
  `Cantidad` INT NULL,
  `Subtotal` INT NULL,
  `Producto_idProducto` INT NOT NULL,
  PRIMARY KEY (`idDetalleVenta`, `Producto_idProducto`),
  INDEX `fk_DetalleVenta_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_DetalleVenta_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `VeterinariaBaseDatosPF`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `VeterinariaBaseDatosPF`.`Venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `VeterinariaBaseDatosPF`.`Venta` (
  `idVenta` INT NOT NULL AUTO_INCREMENT,
  `Fecha` DATE NULL,
  `Total` INT NULL,
  `DetalleVenta_idDetalleVenta` INT NOT NULL,
  `DetalleVenta_Producto_idProducto` INT NOT NULL,
  `Cliente_idCliente` INT NOT NULL,
  `usuarios_idusuario` INT NOT NULL,
  PRIMARY KEY (`idVenta`, `DetalleVenta_idDetalleVenta`, `DetalleVenta_Producto_idProducto`, `Cliente_idCliente`, `usuarios_idusuario`),
  INDEX `fk_Venta_DetalleVenta1_idx` (`DetalleVenta_idDetalleVenta` ASC, `DetalleVenta_Producto_idProducto` ASC) VISIBLE,
  INDEX `fk_Venta_Cliente1_idx` (`Cliente_idCliente` ASC) VISIBLE,
  INDEX `fk_Venta_usuarios1_idx` (`usuarios_idusuario` ASC) VISIBLE,
  CONSTRAINT `fk_Venta_DetalleVenta1`
    FOREIGN KEY (`DetalleVenta_idDetalleVenta` , `DetalleVenta_Producto_idProducto`)
    REFERENCES `VeterinariaBaseDatosPF`.`DetalleVenta` (`idDetalleVenta` , `Producto_idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Venta_Cliente1`
    FOREIGN KEY (`Cliente_idCliente`)
    REFERENCES `VeterinariaBaseDatosPF`.`Cliente` (`idCliente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Venta_usuarios1`
    FOREIGN KEY (`usuarios_idusuario`)
    REFERENCES `VeterinariaBaseDatosPF`.`usuarios` (`idusuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
/* Pruebas de conexion con express */ 
USE veterinariabasedatospf;

SELECT * FROM usuarios;
INSERT INTO usuarios (username , email, password) VALUES('kingfish23','kingfish23@hotmail.com','1223');

/* Se tuvo que expandir la columna Password de 45 caracteres a 300*/
ALTER TABLE usuarios MODIFY COLUMN password varchar(300) not null;

/* Contraseña encriptada del primer usuario*/
UPDATE usuarios set password = '$2b$10$Qxf6FWsuL3bXfv2WNrfsKu.PCCo0myM3.7hNLYFV6l9nojnwTdVvS' WHERE idusuario = 1;

SELECT * FROM usuarios where username='kevinespinal';

SELECT idusuario,username,email,password FROM usuarios;
UPDATE usuarios SET username = 'kevinespinal', email = kevinespinal@hotmail.com, password = '01234' WHERE idusuario = 1;

