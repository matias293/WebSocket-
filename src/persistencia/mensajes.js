import {sqliteDB} from '../db/connection'

class Mensajes {
    getAll = async() => {
        return  sqliteDB.from('mensajes').select();
    }

    add = async(data) =>{
        return sqliteDB('mensajes').insert(data);
    }
}
export const mensajesPersistencia = new Mensajes();