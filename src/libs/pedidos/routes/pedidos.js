const express = require('express');
const { PedidosController } = require('../controllers/pedidos');
const {success, errorResponse} = require('../../../utils/responses');

const router = express.Router();
const _pedidosController = new PedidosController;

/**
 * Petición: Traer todos los pedidos
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: pedidos consultados o mensaje de error
 */
 router.get('/pedidos', async (req, res) => {
    try {
       let resp = await _pedidosController.consultarpedidos();
        success(req, res, 'pedidos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

 
/**
 * Petición: Traer un pedido específico
 * Parámetros: id_pedido
 * Cuerpo: Vacío
 * Respuesta: pedido consultado o mensaje de error
 */
 router.get('/pedidos/:id_pedido', async (req, res) => {
    let id_pedido = req.params.id_pedido;
    try {
       let resp = await _pedidosController.consultarpedido(id_pedido);
        success(req, res, 'pedidos', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});


/**
 * Petición: Crear pedido
 * Cuerpo: Vacío
 * Respuesta: pedido creado
 */
router.post('/pedidos', async (req, res) => {
    try {
      let pedidos = req.body;
  
      await _pedidosController.guardarpedido(pedidos);
      success(req, res, 'pedido creado', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  });

/**
 * Petición: Editar pedido
 * Cuerpo: Vacío
 * Respuesta: pedido modificado
 */
  router.put("/pedidos/:id_pedido", async (req, res) => {
    try {
      let id_pedido = req.params.id_pedido;
      let pedido = req.body;
  
      await _pedidosController.editarpedido( pedido, id_pedido);
      success(req, res, 'pedido modificado', null, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
  });

  module.exports = router;
