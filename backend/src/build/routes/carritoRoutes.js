"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = require("../controllers/carritoController");
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando carritos'));
        this.router.post('/create', carritoController_1.carritoController.create);
        this.router.put('/update/:id', carritoController_1.carritoController.update);
        this.router.delete('/delete/:id', carritoController_1.carritoController.delete);
        this.router.get('/showAll/', carritoController_1.carritoController.list);
        this.router.get('/listOne/:id', carritoController_1.carritoController.listOne);
        this.router.get('/listCarritoUsuario/:id', carritoController_1.carritoController.listCarritoUsuario);
        this.router.get('/totalCarrito/:id', carritoController_1.carritoController.totalCarrito);
        this.router.get('/listCarritoProducto/:id', carritoController_1.carritoController.listCarritoProducto);
    }
}
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;
