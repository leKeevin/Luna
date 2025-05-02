"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventaController_1 = require("../controllers/ventaController");
class VentaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ventas'));
        this.router.post('/create', ventaController_1.ventaController.create);
        this.router.put('/update/:id', ventaController_1.ventaController.update);
        this.router.delete('/delete/:id', ventaController_1.ventaController.delete);
        this.router.get('/showAll/', ventaController_1.ventaController.list);
        this.router.get('/listOne/:id', ventaController_1.ventaController.listOne);
        this.router.get('/ventasProducto/:id', ventaController_1.ventaController.ventasProducto);
        this.router.get('/totalVentaProducto/:id', ventaController_1.ventaController.totalVentaProducto);
        this.router.get('/gananciaVentaProducto/:id', ventaController_1.ventaController.gananciaVentaProducto);
        this.router.get('/filtraYear/:year', ventaController_1.ventaController.filtraYear);
        this.router.get('/filtraMonthYear/:year/:mes', ventaController_1.ventaController.filtraMonthYear);
        this.router.get('/listVentasUsuario/:id', ventaController_1.ventaController.listVentaUsuario);
        this.router.post('/filtraMonto/', ventaController_1.ventaController.filtraMonto);
    }
}
const ventaRoutes = new VentaRoutes();
exports.default = ventaRoutes.router;
