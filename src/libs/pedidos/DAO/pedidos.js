const config = require('config');
const database = config.get('DB');
const ServicePg = require('../../../database/postgress');
const _servicio = new ServicePg(database);


class PedidosDAO {

/**
 * @description Consulta toda la información del pedidos en la base de datos.
 * @returns
 */
async consultarpedidos()  {    
    let sql = `SELECT id_pedido, producto, precio, descripcion
	FROM public."Pedidos";`;
    let respuesta = await _servicio.executeSQL(sql);
    return respuesta
};


/**
 * @description Consulta un pedido en específico en la base de datos.
 * @param {int} id_pedido
 * @returns
 */
async consultarpedido(id_pedido){   
    let sql = `SELECT producto, precio, descripcion
    FROM public."Pedidos" where id_pedido=$1;`;
      
    let respuesta = await _servicio.executeSQL(sql, [id_pedido]);
    return respuesta;
  };
  

/**
 * @description Almacena un nuevo pedido en la base de datos.
 * @param {Object} pedido
 * @returns 
 */
async guardarpedido(pedido) {
    let sql = `INSERT INTO public."Pedidos"(id_pedido, producto, precio, descripcion)
                VALUES ($1, $2, $3, $4);`;
    let valores = [pedido.id_pedido, pedido.producto,pedido.precio,pedido.descripcion];
    let respuesta = await _servicio.executeSQL(sql, valores);
    return respuesta
};

/**
 * @description Modifica la información de un pedido.
 * @param {Object} pedido 
 * @returns 
 */
 async editarpedido (pedido)  {
    let sql =
      `UPDATE public."Pedidos"
        SET   producto=$1, precio=$2, descripcion=$3
        WHERE id_pedido = $4;`;
    let valores = [ pedido.producto,pedido.precio,pedido.descripcion,pedido.id_pedido];
     await _servicio.executeSQL(sql, valores);
   
  };
}
module.exports={PedidosDAO}