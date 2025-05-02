import { Router } from 'express';
import { ingredientesController } from '../controllers/ingredientesController';
import { validarToken } from '../middleware/auth';
class IngredientesRoutes
{
public router: Router=Router();
    constructor()
    {
    this.config();
    }
    config() : void{
        this.router.get('/',(req,res) => res.send('probando ingredientes'));
        this.router.post('/create', ingredientesController.create);
        this.router.put('/update/:id_ingrediente',ingredientesController.update);
        this.router.delete('/delete/:id_ingrediente', ingredientesController.delete);
        this.router.get('/showAll/', ingredientesController.list );
        this.router.get('/listOne/:id', ingredientesController.listOne );        
    }
}
const ingredientesRoutes= new IngredientesRoutes();
export default ingredientesRoutes.router;