"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM producto');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM producto WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Producto no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO producto set ?", [req.body]);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE producto set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM producto WHERE id = ${id}`);
            res.json(resp);
        });
    }
    filtraPrecio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const precio = req.body;
            // console.log(precio) 
            const resp = yield database_1.default.query(`SELECT * FROM  producto WHERE precio BETWEEN ? AND ?;`, [precio.valor1, precio.valor2]);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay productos en ese rango de precios' });
        });
    }
    getCantidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('SELECT cantidad FROM producto WHERE id = ?', id);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'No existe este producto' });
        });
    }
    getNombresProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('SELECT nombre,id FROM producto', id);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No existe este producto' });
        });
    }
    getTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query('SELECT DISTINCT tipo  FROM producto ');
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No existe este producto' });
        });
    }
    listTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            console.log(nombre);
            const resp = yield database_1.default.query(`SELECT * FROM  producto WHERE tipo = ?;`, nombre);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay productos de ese tipo' });
        });
    }
    getMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query('SELECT DISTINCT material  FROM producto ');
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No existe este producto' });
        });
    }
    listMaterial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre } = req.params;
            console.log(nombre);
            const resp = yield database_1.default.query(`SELECT * FROM  producto WHERE material = ?;`, nombre);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay productos de ese material' });
        });
    }
    getPrecio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('SELECT precio FROM producto WHERE id = ?', id);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No existe este producto' });
        });
    }
}
exports.productoController = new ProductoController();
