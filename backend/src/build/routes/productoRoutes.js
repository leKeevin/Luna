"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
class ProductoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando productos'));
        this.router.post('/create', productoController_1.productoController.create);
        this.router.put('/update/:id', productoController_1.productoController.update);
        this.router.delete('/delete/:id', productoController_1.productoController.delete);
        this.router.get('/showAll/', productoController_1.productoController.list);
        this.router.get('/listOne/:id', productoController_1.productoController.listOne);
        this.router.get('/listAnimal/:nombre', productoController_1.productoController.listAnimal);
        this.router.post('/filtraPrecio/', productoController_1.productoController.filtraPrecio);
        this.router.get('/getCantidad/:id', productoController_1.productoController.getCantidad);
        this.router.get('/getPrecio/:id', productoController_1.productoController.getPrecio);
        this.router.get('/getAnimal/', productoController_1.productoController.getAnimal);
        this.router.get('/getNombreProducto/', productoController_1.productoController.getNombresProducto);
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;
