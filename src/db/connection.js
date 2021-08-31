import knex from 'knex';

export const sqliteDB = knex({
  client: 'sqlite3',
  connection: { filename: './midbligera.sqlite' }
});

export const mySQLDB = knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'myapp_test',
  },
  pool: { min: 0, max: 7 },
});

sqliteDB.schema.hasTable('mensajes').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA MENSAJE. VAMOS A CREARLA');
    sqliteDB.schema
      .createTable('mensajes', (mensajesTable) => {
        mensajesTable.string('email');
        mensajesTable.integer('fecha')
        mensajesTable.string('mensaje');
      })
      .then(() => {
        console.log('Se creo la tabla mensajes');
      });
  }
});

mySQLDB.schema.hasTable('productos').then((exists) => {
  if (!exists) {
    console.log('NO EXISTE LA TABLA productos. VAMOS A CREARLA');
    mySQLDB.schema
      .createTable('productos', (productosTable) => {
        productosTable.increments('id');
        productosTable.string('nombre')
        productosTable.string('thumbnail')
        productosTable.decimal('price', 4, 2);
      })
      .then(() => {
        console.log('Se creo la tabla productos');
      });
  }
});