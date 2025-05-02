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
exports.carritoController = void 0;
const database_1 = __importDefault(require("../database"));
class CarritoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM carrito');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carrito WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'carrito no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO carrito set ?", [req.body]);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE carrito set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carrito WHERE id = ${id}`);
            res.json(resp);
        });
    }
    listCarritoUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //const resp = await pool.query(`SELECT carrito.*, user.nombre as nombreUsuario FROM  user,carrito WHERE user.id=carrito.id_usuario AND carrito.id_usuario = ?;`,id);
            const resp = yield database_1.default.query(`SELECT carrito.* FROM  carrito LEFT JOIN user on carrito.id_usuario = user.id WHERE carrito.id_usuario = ?;`, id);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay carrito de ese usuario' });
        });
    }
    listCarritoProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //const resp = await pool.query(`SELECT venta.*, user.nombre as nombreUsuario FROM  user,venta WHERE user.id=venta.id_usuario AND venta.id_usuario = ?;`,id);
            const resp = yield database_1.default.query(`SELECT c.id, c.cantidad, p.nombre, p.precio, c.id_usuario, c.id_producto
        FROM carrito as c LEFT JOIN producto as p ON c.id_producto = p.id WHERE c.id_usuario = ?;`, id);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay venta de ese usuario' });
        });
    }
    totalCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('SELECT SUM(p.precio * c.cantidad) as precioTotal FROM carrito as c JOIN producto as p ON c.id_producto = p.id WHERE c.id_usuario = ?;', id);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay venta de ese usuario' });
        });
    }
}
exports.carritoController = new CarritoController();
