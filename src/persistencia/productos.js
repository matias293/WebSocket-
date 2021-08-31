
import {mySQLDB} from '../db/connection'


class Productos {
    getAll = async() =>{
        return mySQLDB.from('productos').select();
      }
    
      getProduct = async(id) =>{
        return mySQLDB.from('productos').where({ id }).select();
      
    }

      add = async(data) => {
        return mySQLDB('productos').insert(data);
      }

      update = async(id, data )=> {
        return mySQLDB.from('productos').where({ id }).update(data);
      }

      delete = async(id) => {
      
        return mySQLDB.from('productos').where({ id }).del();
      }
    
}

export const productsPersistencia = new Productos();