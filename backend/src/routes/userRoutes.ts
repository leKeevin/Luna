import { Router } from 'express';
import { validarToken } from '../middleware/auth';
import { userController } from '../controllers/userController';
class UserRoutes
{
public router: Router=Router();
    constructor()
    {
    this.config();
    }
    config() : void{
        this.router.get('/',(req,res) => res.send('probando usuarios'));
        this.router.post('/create', userController.create);
        this.router.post('/validarUsuario/', userController.validarUsuario);
        this.router.put('/update/:id',userController.update);
        this.router.delete('/delete/:id', userController.delete);
        this.router.get('/showAll/', userController.list );
        this.router.get('/listOne/:id', userController.listOne );
        this.router.get('/listUserRol/:id',userController.listUserRol);
        this.router.get('/historial/:id',userController.historial);
        
        
    }
}
const userRoutes= new UserRoutes();
export default userRoutes.router;