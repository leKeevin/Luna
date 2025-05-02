import {Request,Response} from 'express';
import pool from '../database';
class VentaController
{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT v.id, v.monto, v.cantidad, v.fecha, v.id_producto, p.nombre  FROM venta as v LEFT JOIN producto as p ON v.id_producto = p.id');
        res.json( respuesta );
    }
    
    public async listOne(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM venta WHERE id = ?', [id]);
        if(respuesta.length>0){
            res.json(respuesta[0]);
            return ;
        }
        res.status(404).json({'mensaje': 'venta no encontrado'});
        }

    public async create(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO venta set ?", [req.body]);
        res.json(resp);
    }
    public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    const resp = await pool.query("UPDATE venta set ? WHERE id = ?", [req.body, id]);
    res.json(resp);
    }
    public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query(`DELETE FROM venta WHERE id = ${id}`);
    res.json(resp);
    }
    public async listVentaUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        //const resp = await pool.query(`SELECT venta.*, user.nombre as nombreUsuario FROM  user,venta WHERE user.id=venta.id_usuario AND venta.id_usuario = ?;`,id);
        const resp = await pool.query(`SELECT v.id, v.monto, v.cantidad, v.fecha, v.id_producto, p.nombre  FROM venta as v LEFT JOIN producto as p ON v.id_producto = p.id WHERE v.id_usuario = ?;`,id);
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay venta de ese usuario'});
    }

    public async ventasProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`SELECT v.id, v.monto, v.cantidad, v.fecha, v.id_producto, p.nombre  FROM venta as v 
        LEFT JOIN producto as p ON v.id_producto = p.id  WHERE v.id_producto = ?;`,id);
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay venta de este producto'});
    }
    public async totalVentaProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`SELECT COUNT(*) as total
            FROM  venta as v LEFT JOIN producto as p on v.id_producto = p.id  WHERE v.id_producto = ?;`,id);
        if(resp.length>0){
           res.json(resp[0]);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay venta de ese usuario'});
    }
    public async gananciaVentaProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`SELECT SUM(v.monto) as gananciaTotal
            FROM  venta as v LEFT JOIN producto as p on v.id_producto = p.id  WHERE v.id_producto = ?;`,id);
        if(resp.length>0){
           res.json(resp[0]);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay venta de ese usuario'});
    }
    public async filtraMonto(req: Request, res: Response): Promise<void> {
        const monto = req.body;
        // console.log(precio) 
        const resp = await pool.query(`SELECT * FROM venta WHERE monto BETWEEN ? AND ?;`,[monto.valor1,monto.valor2] );
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay productos en ese rango de precios'});
    }
    public async filtraYear(req: Request, res: Response): Promise<void> {
        const year = req.params.year;
        const resp = await pool.query(`SELECT * FROM venta WHERE YEAR(fecha) = ?;` , [year] );
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay productos vendidos en ese año'});
    }

    public async filtraMonthYear(req: Request, res: Response): Promise<void> {
        const aux = req.params;
        const resp = await pool.query(`SELECT * FROM venta WHERE YEAR(fecha) = ? AND MONTH(fecha)= ?;` , [aux.year, aux.mes] );
        if(resp.length>0){
           res.json(resp);
           return ;
        }
        res.status(404).json({'mensaje': 'No hay productos vendidos en este mes con ese año'});
    }

    // public async filtraYear(req: Request, res: Response): Promise<void> {
    //     const year = req.body.year;
    //     // console.log(precio) 
    //     let aux1 = '' + year + '-01-01 00:00:00'
    //     let aux2 = '' + year + '-01-31 23:59:59'
    //     console.log(aux1)
    //     const resp = await pool.query(`SELECT * FROM venta WHERE YEAR(fecha) = ?;` , [aux1,aux2] );
    //     if(resp.length>0){
    //        res.json(resp);
    //        return ;
    //     }
    //     res.status(404).json({'mensaje': 'No hay productos en ese rango de precios'});
    // }



}

export const ventaController = new VentaController();