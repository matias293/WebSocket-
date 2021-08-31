import { productsPersistencia } from "../persistencia/productos"

class Producto {
    getProducts = async(req,res) => {
       let productos = await productsPersistencia.getAll()
       res.json({
           productos
       })
    }

    getProduct = async(req,res) => {
        const {id} = req.params 
            let product = await productsPersistencia.getProduct(id)
                res.json({
                    product
                })
            
    }

    postProduct = async(req,res) => {
        const body = req.body
         await productsPersistencia.add(body)
        res.json({
            msg : 'Producto fue agregado exitosamente'
        })

     }

     updateProduct = async(req,res) => {
        const {id} = req.params 
        const body = req.body
         let product = await productsPersistencia.update(id,body)
         if(product === 0){
            res.json({
                msg:'No existe un producto con ese id'
            })
        }
        else{
            res.json({
                msg:'Producto Actualizado correctamente',
                product
             })
        }
            
     }

     deleteProduct = async(req,res) =>  {
        const {id} = req.params 
        let product =  await productsPersistencia.delete(id)
        if(product === 0){
            res.json({
                msg:'No existe un producto con ese id'
            })
        }
        else{
                res.json({
                    msg: 'Producto Eliminado exitosamente',
                    
                })
            }
     }
}

export const productsController = new Producto();