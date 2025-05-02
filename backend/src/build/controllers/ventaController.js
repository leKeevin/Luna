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
exports.ventaController = void 0;
const database_1 = __importDefault(require("../database"));
class VentaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT v.id, v.monto, v.cantidad, v.fecha, v.id_producto, p.nombre  FROM venta as v LEFT JOIN producto as p ON v.id_producto = p.id');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM venta WHERE id = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'venta no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO venta set ?", [req.body]);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE venta set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM venta WHERE id = ${id}`);
            res.json(resp);
        });
    }
    listVentaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            //const resp = await pool.query(`SELECT venta.*, user.nombre as nombreUsuario FROM  user,venta WHERE user.id=venta.id_usuario AND venta.id_usuario = ?;`,id);
            const resp = yield database_1.default.query(`SELECT v.id, v.monto, v.cantidad, v.fecha, v.id_producto, p.nombre  FROM venta as v LEFT JOIN producto as p ON v.id_producto = p.id WHERE v.id_usuario = ?;`, id);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay venta de ese usuario' });
        });
    }
    ventasProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT v.id, v.monto, v.cantidad, v.fecha, v.id_producto, p.nombre  FROM venta as v 
        LEFT JOIN producto as p ON v.id_producto = p.id  WHERE v.id_producto = ?;`, id);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay venta de este producto' });
        });
    }
    totalVentaProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT COUNT(*) as total
            FROM  venta as v LEFT JOIN producto as p on v.id_producto = p.id  WHERE v.id_producto = ?;`, id);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay venta de ese usuario' });
        });
    }
    gananciaVentaProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT SUM(v.monto) as gananciaTotal
            FROM  venta as v LEFT JOIN producto as p on v.id_producto = p.id  WHERE v.id_producto = ?;`, id);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay venta de ese usuario' });
        });
    }
    filtraMonto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const monto = req.body;
            // console.log(precio) 
            const resp = yield database_1.default.query(`SELECT * FROM venta WHERE monto BETWEEN ? AND ?;`, [monto.valor1, monto.valor2]);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay productos en ese rango de precios' });
        });
    }
    filtraYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = req.params.year;
            const resp = yield database_1.default.query(`SELECT * FROM venta WHERE YEAR(fecha) = ?;`, [year]);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay productos vendidos en ese año' });
        });
    }
    filtraMonthYear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aux = req.params;
            const resp = yield database_1.default.query(`SELECT * FROM venta WHERE YEAR(fecha) = ? AND MONTH(fecha)= ?;`, [aux.year, aux.mes]);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay productos vendidos en este mes con ese año' });
        });
    }
}
exports.ventaController = new VentaController();
