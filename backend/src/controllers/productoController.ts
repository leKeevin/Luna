import {Request,Response} from 'express';
import pool from '../database';
class ProductoController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM producto');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM producto WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Producto no encontrado'});
        }

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO producto set ?", [req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE producto set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM producto WHERE id = ${id}`);
    res.json(resp);
    }
    public async listAnimal(req: Request, res: Response): Promise<void> {
        const {nombre} = req.params;
        console.log(nombre) 
        const resp = await pool.query(`SELECT * FROM  producto WHERE animal = ?;`, nombre);
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay productos de ese animal'});
    }

    public async filtraPrecio(req: Request, res: Response): Promise<void> {
        const precio = req.body;
        // console.log(precio) 
        const resp = await pool.query(`SELECT * FROM  producto WHERE precio BETWEEN ? AND ?;`,[precio.valor1,precio.valor2] );
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay productos en ese rango de precios'});
    }

    public async getCantidad(req: Request, res : Response):Promise<void>{
        const {id} = req.params;
        const resp = await pool.query('SELECT cantidad FROM producto WHERE id = ?',id);
        if(resp.length>0){
            res.json(resp[0]);
            return ;
         }
         res.status(404).json({'mensaje': 'No existe este producto'});
    }
    public async getNombresProducto(req: Request, res : Response):Promise<void>{
        const {id} = req.params;
        const resp = await pool.query('SELECT nombre,id FROM producto',id);
        if(resp.length>0){
            res.json(resp);
            return ;
         }
         res.status(404).json({'mensaje': 'No existe este producto'});
    }
    public async getAnimal(req: Request, res : Response):Promise<void>{
        const resp = await pool.query('SELECT DISTINCT animal  FROM producto ',);
        if(resp.length>0){
            res.json(resp);
            return ;
         }
         res.status(404).json({'mensaje': 'No existe este producto'});
    }
    public async getPrecio(req: Request, res : Response):Promise<void>{
        const {id} = req.params;
        const resp = await pool.query('SELECT precio FROM producto WHERE id = ?',id);
        if(resp.length>0){
            res.json(resp);
            return ;
         }
         res.status(404).json({'mensaje': 'No existe este producto'});
    }
}

export const productoController = new ProductoController();