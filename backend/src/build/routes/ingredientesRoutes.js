"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ingredientesController_1 = require("../controllers/ingredientesController");
class IngredientesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', (req, res) => res.send('probando ingredientes'));
        this.router.post('/create', ingredientesController_1.ingredientesController.create);
        this.router.put('/update/:id_ingrediente', ingredientesController_1.ingredientesController.update);
        this.router.delete('/delete/:id_ingrediente', ingredientesController_1.ingredientesController.delete);
        this.router.get('/showAll/', ingredientesController_1.ingredientesController.list);
        this.router.get('/listOne/:id', ingredientesController_1.ingredientesController.listOne);
    }
}
const ingredientesRoutes = new IngredientesRoutes();
exports.default = ingredientesRoutes.router;
