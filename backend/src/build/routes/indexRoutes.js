"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.get('/a', (req, res) => res.send('a chiquita'));
        this.router.get('/aguacate/', (req, res) => res.send('aqui hay aguacates'));
        this.router.get('/omar/', (req, res) => res.send("Hola gay"));
        this.router.get('/eli/', (req, res) => res.send("Hola gay"));
        this.router.get('/moises/', (req, res) => res.send("Tu me saliste mas cabron"));
        this.router.get('/jose/', (req, res) => res.send("Hola gay"));
        this.router.get('/Carlos/', (req, res) => res.send("QUE SUPER HOMOSEXUAL"));
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
