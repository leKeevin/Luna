import {Request,Response} from 'express';
import pool from '../database';

class CarritoController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM carrito');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM carrito WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'carrito no encontrado'});
        }

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO carrito set ?", [req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE carrito set ? WHERE id = ?", [req.body, id]);
        res.json(resp);
        }
        public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM carrito WHERE id = ${id}`);
    res.json(resp);
    }
    public async listCarritoUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const resp = await pool.query(`SELECT carrito.*, user.nombre as nombreUsuario FROM  user,carrito WHERE user.id=carrito.id_usuario AND carrito.id_usuario = ?;`,id);
        const resp = await pool.query(`SELECT carrito.* FROM  carrito LEFT JOIN user on carrito.id_usuario = user.id WHERE carrito.id_usuario = ?;`,id);
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay carrito de ese usuario'});
    }
    public async listCarritoProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const resp = await pool.query(`SELECT venta.*, user.nombre as nombreUsuario FROM  user,venta WHERE user.id=venta.id_usuario AND venta.id_usuario = ?;`,id);
        const resp = await pool.query(`SELECT c.id, c.cantidad, p.nombre, p.precio, c.id_usuario, c.id_producto
        FROM carrito as c LEFT JOIN producto as p ON c.id_producto = p.id WHERE c.id_usuario = ?;`,id);
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay venta de ese usuario'});
    }
    public async totalCarrito(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('SELECT SUM(p.precio * c.cantidad) as precioTotal FROM carrito as c JOIN producto as p ON c.id_producto = p.id WHERE c.id_usuario = ?;',id);
        if(resp.length>0){
           res.json(resp[0]);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay venta de ese usuario'});
    }
}

export const carritoController = new CarritoController();