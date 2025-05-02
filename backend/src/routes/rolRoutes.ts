import { Router } from 'express';
import { validarToken } from '../middleware/auth';
import { rolController } from '../controllers/rolController';
class RolRoutes
{
public router: Router=Router();
    constructor()
    {
    this.config();
    }
    config() : void{
        this.router.get('/',(req,res) => res.send('probando roles'));
        this.router.post('/create', rolController.create);
        this.router.put('/update/:id',validarToken,rolController.update);
        this.router.delete('/delete/:id',validarToken, rolController.delete);
        this.router.get('/showAll/', rolController.list );
        this.router.get('/listOne/:id',validarToken,rolController.listOne );
    }
}
const rolRoutes = new RolRoutes();
export default rolRoutes.router;