import { Router } from 'express';
import { validarToken } from '../middleware/auth';
import { ventaController } from '../controllers/ventaController';
class VentaRoutes
{
public router: Router=Router();
    constructor()
    {
    this.config();
    }
    config() : void{
        this.router.get('/',(req,res) => res.send('probando ventas'));
        this.router.post('/create', ventaController.create);
        this.router.put('/update/:id',ventaController.update);
        this.router.delete('/delete/:id', ventaController.delete);
        this.router.get('/showAll/', ventaController.list );
        this.router.get('/listOne/:id', ventaController.listOne );
        this.router.get('/ventasProducto/:id', ventaController.ventasProducto );
        this.router.get('/totalVentaProducto/:id', ventaController.totalVentaProducto );
        this.router.get('/gananciaVentaProducto/:id', ventaController.gananciaVentaProducto );
        this.router.get('/filtraYear/:year',ventaController.filtraYear);        
        this.router.get('/filtraMonthYear/:year/:mes',ventaController.filtraMonthYear);        
        this.router.get('/listVentasUsuario/:id',ventaController.listVentaUsuario);
        this.router.post('/filtraMonto/',ventaController.filtraMonto);
    }
}
const ventaRoutes= new VentaRoutes();
export default ventaRoutes.router;