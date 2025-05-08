import express, {Application} from 'express';
import indexRoutes from './routes/indexRoutes';
import userRoutes from './routes/userRoutes';
import morgan from 'morgan';
import cors from 'cors';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import rolRoutes from './routes/rolRoutes';
import productoRoutes from './routes/productoRoutes';
import carritoRoutes from './routes/carritoRoutes';
import ventaRoutes from './routes/ventaRoutes';

class Server
{
public app: Application;
constructor()
{
this.app= express();
this.config();
this.routes();
this.app.use('/documentacion',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));

}
config (): void
{
this.app.set('port',process.env.PORT|| 3000);
this.app.use(morgan('dev'));
this.app.use(cors());
this.app.use(express.json());
this.app.use(express.urlencoded({extended: false}));
}
routes (): void
{
    this.app.use(indexRoutes);
    this.app.use('/api/users',userRoutes);
    this.app.use('/api/roles',rolRoutes);
    this.app.use('/api/productos',productoRoutes);
    this.app.use('/api/carrito',carritoRoutes);
    this.app.use('/api/ventas',ventaRoutes);

        
}
start (): void
{
this.app.listen(this.app.get('port'), () =>
{
console.log('Server on port',this.app.get('port'));
});
}
}
const server = new Server();
server.start();