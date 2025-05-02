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
exports.userController = void 0;
const database_1 = __importDefault(require("../database"));
class UserController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT u.*,r.nombre as rol FROM user as u,rol as r WHERE u.id_rol=r.id');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT u.*,r.nombre as rol FROM user as u,rol as r WHERE u.id = ? AND u.id_rol=r.id', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                //console.log(respuesta[0])
                return;
            }
            res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO user set ?", [req.body]);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.body);
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE user set ? WHERE id = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM user WHERE id = ${id}`);
            res.json(resp);
        });
    }
    listUserRol(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT user.*, rol.nombre as nombreRol FROM  user LEFT JOIN rol on user.id_rol = rol.id WHERE user.id_Rol = ?;`, id);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay usuario en ese rol' });
        });
    }
    historial(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`SELECT v.id_producto,v.id, v.cantidad, v.monto, v.fecha FROM  user as u 
            LEFT JOIN venta as v on u.id = v.id_usuario WHERE u.id = ?;`, id);
            if (resp.length > 0) {
                for (let i = 0; i < resp.length; i++) {
                    var aux = "" + resp[i].fecha;
                    aux.substring(0, 10);
                    console.log(aux);
                    // resp[i].fecha = aux ; 
                    //console.log(resp[i].fecha)
                }
                res.json(resp);
                return;
            }
            res.status(404).json({ 'mensaje': 'No hay usuario en ese rol' });
        });
    }
    validarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            let aux = req.body;
            const resp = yield database_1.default.query("Select * from user WHERE correo = ? AND contra = ?;", [aux.correo, aux.contra]);
            if (resp.length > 0) {
                res.json(resp[0]);
                return;
            }
            else
                res.json({ "id": -1 });
        });
    }
}
exports.userController = new UserController();
