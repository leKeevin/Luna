import { Router } from 'express';
import { carritoController } from '../controllers/carritoController';
import { validarToken } from '../middleware/auth';
class CarritoRoutes
{
public router: Router=Router();
    constructor()
    {
    this.config();
    }
    config() : void{
        this.router.get('/',(req,res) => res.send('probando carritos'));
        this.router.post('/create', carritoController.create);
        this.router.put('/update/:id',carritoController.update);
        this.router.delete('/delete/:id', carritoController.delete);
        this.router.get('/showAll/', carritoController.list );
        this.router.get('/listOne/:id', carritoController.listOne );
        this.router.get('/listCarritoUsuario/:id',carritoController.listCarritoUsuario);
        this.router.get('/totalCarrito/:id',carritoController.totalCarrito);                
        this.router.get('/listCarritoProducto/:id',carritoController.listCarritoProducto);        
    }
}
const carritoRoutes= new CarritoRoutes();
export default carritoRoutes.router;