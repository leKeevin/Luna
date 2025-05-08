import {Request,Response} from 'express';
import pool from '../database';
class UserController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT u.*,r.nombre as rol FROM usuario as u,rol as r WHERE u.id_rol=r.id');
        res.json( respuesta );
    }
    
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT u.*,r.nombre as rol FROM usuario as u,rol as r WHERE u.id = ? AND u.id_rol=r.id', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            //console.log(respuesta[0])
            return ;
        }
        res.status(404).json({'mensaje': 'Usuario no encontrado'});
    }

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO usuario set ?", [req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.body);
    console.log(req.params);    
    const resp = await pool.query("UPDATE usuario set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM usuario WHERE id = ${id}`);
    res.json(resp);
    }
    public async listUserRol(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`SELECT usuario.*, rol.nombre as nombreRol FROM  usuario LEFT JOIN rol on usuario.id_rol = rol.id WHERE usuario.id_Rol = ?;`,id);
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay usuario en ese rol'});
    }
    public async historial(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`SELECT v.id_producto,v.id, v.cantidad, v.monto, v.fecha FROM  usuario as u 
            LEFT JOIN venta as v on u.id = v.id_usuario WHERE u.id = ?;`,id);
        if(resp.length>0){
            for(let i =0; i<resp.length; i++){
                var aux = "" + resp[i].fecha;
                aux.substring(0,10)
                console.log(aux)
                // resp[i].fecha = aux ; 
                //console.log(resp[i].fecha)

            }

           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay usuario en ese rol'});
    }
    
    public async validarUsuario(req: Request, res: Response): Promise<void> {
        console.log(req.params);
        let aux = req.body;
        const resp = await pool.query("Select * from usuario WHERE correo = ? AND contra = ?;",[aux.correo, aux.contra]);
        if(resp.length>0){
            res.json(resp[0]);
            return ;
        }else
            res.json({"id":-1});
    }



}

export const userController = new UserController();