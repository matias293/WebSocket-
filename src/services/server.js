import express from 'express';
import path from 'path';
import * as http from 'http';
import moment from 'moment';
import io from 'socket.io';

import apiRouter from '../routes/index';

import { productsPersistencia } from '../persistencia/productos';
import { mensajesPersistencia } from '../persistencia/mensajes';

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use('/api', apiRouter);

const myServer = new http.Server(app);

const myWSServer = io(myServer);

//Productos
myWSServer.on('connect', async(socket) => {
  //Agregar Producto
    socket.on('new-product', (product) => {
       productsPersistencia.add(product) 
   })

   //Mostrar La Lista
   let listaProductos = await productsPersistencia.getAll()
   
   myWSServer.emit('products', listaProductos);
 
   //Cuando un usuario se conecta obtiene los productos anteriores
  socket.on('askProduct', async(productos) => {
      let listaProductos = await productsPersistencia.getAll()
        
        socket.emit('products', listaProductos);
  });
 

  //Mensajes
 
  socket.on('new-mensaje', async(mensaje) => {
   let fecha = moment().format('lll')
   let msj = {...mensaje,fecha}
 
   await mensajesPersistencia.add(msj)
  })
  
  //Mostar Mensajes
  let todosMensajes = await  mensajesPersistencia.getAll()
         myWSServer.emit('mensajes', todosMensajes);
 
  //Mostar mensajes anteriores
  socket.on('askMensajes', async(mensajes) => {
   let todosMensajes =  await mensajesPersistencia.getAll()
     socket.emit('mensajes', todosMensajes); 
 });
})



export default myServer