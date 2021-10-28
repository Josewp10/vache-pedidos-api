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
    let sql = `SELECT id_pedido, producto, precio, descripcion, id_cliente, fecha, direccion
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
    let sql = `SELECT producto, precio, descripcion, id_cliente, fecha, direccion
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
    let sql = `INSERT INTO public."Pedidos"( producto, precio, descripcion,id_cliente, fecha, direccion)
                VALUES ($1, $2, $3, $4, $5, $6);`;
    let valores = [ pedido.producto, pedido.precio, pedido.descripcion, pedido.id_cliente,
      pedido.fecha, pedido.direccion ];
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
        SET   producto=$1, precio=$2, descripcion=$3, id_cliente=$4, fecha=$5, direccion=$6
        WHERE id_pedido = $7;`;
    let valores = [ pedido.producto, pedido.precio, pedido.descripcion,  pedido.id_cliente,
      pedido.fecha, pedido.direccion, pedido.id_pedido ];
     await _servicio.executeSQL(sql, valores);
   
  };
}
module.exports={PedidosDAO}