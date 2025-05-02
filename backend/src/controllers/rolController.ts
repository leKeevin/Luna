import {Request,Response} from 'express';
import pool from '../database';
class RolController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM rol');
        res.json( respuesta );
    }
    
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM rol WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'Rol no encontrado'});
        }

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO rol set ?", [req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE rol set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM rol WHERE id = ${id}`);
    res.json(resp);
    }
}

export const rolController = new RolController();