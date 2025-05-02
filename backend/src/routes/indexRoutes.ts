import { Router } from 'express';
class IndexRoutes
{
public router: Router=Router();
constructor()
{
this.config();
    
}
config() : void
{
    this.router.get('/',(req,res) => res.send('probando ruta'));
    this.router.get('/a',(req,res) => res.send('a chiquita'));    
    this.router.get('/aguacate/',(req,res) => res.send('aqui hay aguacates'));
    this.router.get('/omar/',(req,res) => res.send("Hola gay"));
    this.router.get('/eli/',(req,res) => res.send("Hola gay"));
    this.router.get('/moises/',(req,res) => res.send("Tu me saliste mas cabron"));
    this.router.get('/jose/',(req,res) => res.send("Hola gay"));
    this.router.get('/Carlos/',(req,res) => res.send("QUE SUPER HOMOSEXUAL"));
    
}
}
const indexRoutes= new IndexRoutes();
export default indexRoutes.router;