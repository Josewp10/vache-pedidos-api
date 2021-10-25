const {PedidosDAO} = require('../DAO/pedidos'); 
const _pedidosDAO = new PedidosDAO;


class PedidosController {

 /**
  * @description Se toma el parametro con la información del pedido y se valida:
  *  - Que no sea vacio.
  * @param {Object} pedido 
  */
   validarPedidos(pedido){
    if (!pedido){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del pedido'
        };
    }else if(!pedido.id_pedido){
        throw{
            ok: false,
            mensaje: 'Ingrese la información delpedido'
        };
    }else if(!pedido.producto){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del pedido'
        };
    }else if(!pedido.precio){
        throw{
            ok: false,
            mensaje: 'Ingrese la información delpedido'
        };
    }else if(!pedido.descripcion){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del pedido'
        };
    }
};

/**
  * @description Se consulta todas las pedidos que hayan 
  */

   async consultarpedidos(){
    let resp = await _pedidosDAO.consultarpedidos();
    return resp.rows;
      
    }

/**
  * @description Se consulta un pedido en especifico 
  * @param {Object} id_pedido 
  */

    async consultarpedido(id_pedido){
        let resp = await _pedidosDAO.consultarpedido(id_pedido);
        switch (resp.rowCount ) {      
            case 0:               
               throw 'Elemento no encontrado';
            case 1:
                return resp.rows;
        }
    }

/**
  * @description Se crea una pedido con su respectiva información
  * @param {Object} pedido 
 
  */

    async guardarpedido(pedido){
        await _pedidosDAO.guardarpedido(pedido);
    }

  /**
  * @description Se edita una pedido con su respectiva información por id_pedido
  * @param {Object} pedido 
  * @param {Object} id_pedido 
  */

    async editarpedido(pedido,id_pedido){
        if (pedido.id_pedido != id_pedido) {
            throw {
              ok: false,
              mensaje: "id del pedido no corresponde al enviado",
            };
          }
         await _pedidosDAO.editarpedido(pedido);
    }



  
}
module.exports={PedidosController}