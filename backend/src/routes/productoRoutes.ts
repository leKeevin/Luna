import { Router } from 'express';
import { validarToken } from '../middleware/auth';
import { productoController } from '../controllers/productoController';
class ProductoRoutes
{
public router: Router=Router();
    constructor()
    {
    this.config();
    }
    config() : void{
        this.router.get('/',(req,res) => res.send('probando productos'));
        this.router.post('/create', productoController.create);
        this.router.put('/update/:id',productoController.update);
        this.router.delete('/delete/:id', productoController.delete);
        this.router.get('/showAll/', productoController.list );
        this.router.get('/listOne/:id', productoController.listOne );
        this.router.get('/listAnimal/:nombre',productoController.listAnimal);
        this.router.post('/filtraPrecio/',productoController.filtraPrecio);        
        this.router.get('/getCantidad/:id',productoController.getCantidad);
        this.router.get('/getPrecio/:id',productoController.getPrecio);
        this.router.get('/getAnimal/',productoController.getAnimal);
        this.router.get('/getNombreProducto/',productoController.getNombresProducto);
        
        
    }
}
const productoRoutes= new ProductoRoutes();
export default productoRoutes.router;