import {Request,Response} from 'express';
import pool from '../database';

class IngrdienteController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM ingrediente');
        res.json( respuesta );
    }

    public async listOne(req: Request, res: Response): Promise <void>{
        const {id_ingrediente} = req.params;
        const respuesta = await pool.query('SELECT * FROM ingrediente WHERE id_ingrediente = ?', [id_ingrediente]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'carrito no encontrado'});
        }

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO ingrediente set ?", [req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
        const { id_ingrediente } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE ingrediente set ? WHERE id_ingrediente = ?", [req.body, id_ingrediente]);
        res.json(resp);
        }
        public async delete(req: Request, res: Response): Promise<void> {
        const { id_ingrediente } = req.params;
        const resp = await pool.query(`DELETE FROM ingrediente WHERE id_ingrediente = ${id_ingrediente}`);
    res.json(resp);
    }
}

export const ingredientesController = new IngrdienteController();